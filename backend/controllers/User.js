import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const userList = await User.find().select("-passwordHash");
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      city,
      question1,
      question2,
      status,
    } = req.body;
    const user = new User({
      name,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
      phone,
      role,
      city,
      question1,
      question2,
      status,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create user" });
  }
};

// Create a new lab user
const createLabUser = async (req, res) => {
  try {
    const { name, email, password, phone, role, city, hospitalemail } =
      req.body;
    const user = new User({
      name,
      email,
      passwordHash: bcrypt.hashSync(password, 10),
      phone,
      role,
      city,
      hospitalemail,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create user" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "The user is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).send("Incorrect password");
    }

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        status: user.status,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
        algorithm: "HS256",
      }
    );

    res.status(200).json({
      token,
      role: user.role,
      status: user.status,
      hospitalemail: user.hospitalemail,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send("Server error");
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!user) return res.status(400).send("The user cannot be updated!");

    res.send(user);
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
};

const updateUserById = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      city,
      role,
      question1,
      question2,
      status,
    } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let passwordHash = user.passwordHash;
    if (password) {
      passwordHash = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        passwordHash,
        phone,
        city,
        role,
        question1,
        question2,
        status,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

const updateAdminById = async (req, res) => {
  try {
    const adminExist = await User.findById(req.params.id);

    if (!adminExist) {
      return res.status(404).send("Admin not found");
    }

    let newPasswordHash = adminExist.passwordHash;
    if (req.body.password) {
      newPasswordHash = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedAdmin = await User.findByIdAndUpdate(
      req.params.id,
      {
        email: req.body.email || adminExist.email,
        passwordHash: newPasswordHash,
        phone: req.body.phone || adminExist.phone,
      },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(400).send("Failed to update admin");
    }

    res.send(updatedAdmin);
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
};

const resetUserPassword = async (req, res) => {
  try {
    const { email, question1, question2, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.question1 !== question1 || user.question2 !== question2) {
      return res.status(400).json({ error: "Security questions do not match" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.passwordHash = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getAllUsers,
  getUserById,
  createUser,
  createLabUser,
  deleteUserById,
  loginUser,
  updateUserStatus,
  updateUserById,
  updateAdminById,
  resetUserPassword,
};
