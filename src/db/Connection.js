import mongoose from "mongoose";

export async function connectDB() {
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  //await mongoose.connect('mongodb://atm_machine:7H7ooEDuA7081AXi@sa-east-1.aws.data.mongodb-api.com/app/data-xhcff/endpoint/data/v1/test');
  //mongodb+srv://atm_machine:<password>@atmmachine.xktogaf.mongodb.net/
  await mongoose.connect('mongodb+srv://atmMachineUser:ZuKBk5rnq0Q2Q636@atmmachine.xktogaf.mongodb.net/atmMachineDB');
  console.log("Mongo Dabase Connected.");
}


