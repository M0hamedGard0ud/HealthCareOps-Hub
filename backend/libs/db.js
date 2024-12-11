import mongoose from "mongoose";
mongoose.set("strictQuery", true);
mongoose.pluralize(null);

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database Connection is ready 🚀...");

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to database");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export { connectToDB };
