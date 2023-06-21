import Statement from "../models/Statement.js";

export async function insertCredit(value, account_id) {
    const newCredit = new Statement({moviment_type: "credit", value, account: account_id});
    return await newCredit.save();
}

export async function insertDebit(value, account_id) {
    const newDebit = new Statement({moviment_type: "debit", value, account: account_id});
    return await newDebit.save();
}

export async function get(account_id) {
    return await Statement.find({account: account_id}).sort({createdAt: 'desc'}); 
}