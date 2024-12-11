1. Open Mongo DB Create DB 
   Create DB - Medicare_App
   
3. Import all db.json follow below step
Example > Medicare_App> Create "User" Collection and import JSON File 

4. Open backend and client folder in two terminal VS code 

Medicare_App_src\backend> npm start
Medicare_App_src\client>  npm run dev

Open Application 
http://localhost:5173/

Admin
admin@gmail.com
test

Hospital
hospital@gmail.com
Test@100

Patient
patient@gmail.com
Test@100
patient1@gmail.com
Test@100

Lab
lab@gmail.com
Test@100



MERN React JS
Front End : React JS, CSS, Bootstrap
Back End  : Express JS, Node JS,
Data Base: Mongo DB
	
Tools:
VS Studio 
Mongo DB


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to database");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};