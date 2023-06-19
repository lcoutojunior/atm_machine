import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export async function connectDB() {
  const user = process.env.DB_USER;
  const pass = process.env.PASS;
  const db = process.env.DB;
  
  await mongoose.connect(`mongodb+srv://${user}:${pass}@atmmachine.xktogaf.mongodb.net/${db}`);
  console.log("Mongo Dabase Connected.");
}


