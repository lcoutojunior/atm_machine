import mongoose from "mongoose";
const { Schema } = mongoose;


const statementSchema = new Schema(
  {
    moviment_type: { type: String, required: true, enum: ['withdraw, deposit'] },
    value: { type: Number, required: true },
    account: {
      type: mongoose.ObjectId,
      ref: 'Account',
      required: true
    },
  },
  { timestamps: true }
);

const Statement = mongoose.model("Statement", statementSchema);

export default Statement;