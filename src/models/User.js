import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  cpf: { type: String, required: true , unique: true},

},
{timestamps: true},
);

const User = mongoose.model("User", userSchema);

export {
  User,
  userSchema
}