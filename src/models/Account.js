import mongoose from "mongoose";
const { Schema } = mongoose;


const accountSchema = new Schema(
  {
    account_type: { type: String, required: true, enum: ['poupance','bank_account'] },
    balance: { type: Number, required: true },
    users: {
      type: [mongoose.ObjectId],
      ref: 'User',
      required: true
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

exports.module = Account;