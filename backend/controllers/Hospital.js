import { Hospital } from "../models/hospital.js";
import { fetchCoordinatesFromAddress } from "../libs/fetchCoordinatesFromAddress.js";

const getAllHospitals = async (req, res) => {
  try {
    const hospitalList = await Hospital.find();
    if (!hospitalList) {
      return res.status(500).json({ success: false });
    }
    res.status(200).send(hospitalList);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found!" });
    }
    res.send(hospital);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createHospital = async (req, res) => {
  try {
    let hospital = new Hospital({
      hospitalemail: req.body.hospitalemail,
      name: req.body.name,
      doctor_name: req.body.doctor_name,
      specialty: req.body.specialty,
      timing: req.body.timing,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
    });

    hospital = await hospital.save();
    if (!hospital) {
      return res.status(400).send("The hospital cannot be created!");
    }
    res.send(hospital);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndRemove(req.params.id);
    if (hospital) {
      return res
        .status(200)
        .json({ success: true, message: "The hospital is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      {
        hospitalemail: req.body.hospitalemail,
        name: req.body.name,
        doctor_name: req.body.doctor_name,
        specialty: req.body.specialty,
        timing: req.body.timing,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
      },
      { new: true }
    );

    if (!hospital) {
      return res.status(400).send("The hospital cannot be updated!");
    }
    res.send(hospital);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateHospitalMap = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(400).send("The hospital location cannot be updated!");
    }

    const address = hospital.address + " - " + hospital.city;

    const coordinates = await fetchCoordinatesFromAddress(address);
    if (!coordinates) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to retrieve coordinates" });
    }

    const newHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      {
        lat: coordinates.latitude,
        long: coordinates.longitude,
      },
      { new: true }
    );

    res.send(newHospital);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateHospitalStatus = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (!hospital) {
      return res.status(400).send("The hospital status cannot be updated!");
    }
    res.send(hospital);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  getAllHospitals,
  getHospitalById,
  createHospital,
  deleteHospital,
  updateHospital,
  updateHospitalMap,
  updateHospitalStatus,
};
