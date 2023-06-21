import Account from "../models/Account.js";
import * as StatementService from "../services/Statement.js";
import * as Redis from "../db/Redis.js";

const redisClient = await Redis.redisClient();

export async function createAccount(account) {
    const { account_type, balance, users: users_id } = account;

    try {
        if (balance < 1) {
            return [{ msg: "Deposits cannot be less than 1" }];
        }
        if (account_type === "poupance" || account_type === "bank_account") {
            const newAccount = new Account({ account_type, balance, users_id });
            return await newAccount.save();
        } else {
            return [
                { msg: "account_type can only be poupance or bank_account" },
            ];
        }
    } catch (e) {
        throw e;
    }
}

export async function getAccounts() {
    try {
        return await Account.find();
    } catch (e) {
        throw e;
    }
}

export async function getAccountById(account_id) {
    try {
        const account = await Account.find({ _id: account_id });
        if (account.length === 0) {
            return { msg: "Account not found" };
        }
        return account[0];
    } catch (e) {
        throw e;
    }
}

export async function getStatements(account_id) {
    const account = await getAccountById(account_id);
    const statements = await StatementService.get(account_id);
    const statementsRedis = await redisClient.get("statements");
    if (statementsRedis === null) {
        await redisClient.set(
            "statements",
            JSON.stringify([account, statements]),
            { EX: 7, NX: true }
        );
        return [account, statements]
    } else {
        return JSON.parse(statementsRedis);
    }
}

export async function deposit(body) {
    const { account_id, value } = body;
    try {
        if (value < 1) {
            return [{ msg: "Deposits cannot be less than 1" }];
        }
        const account = await getAccountById(account_id);
        if (account.msg === "Account not found") {
            return account;
        }
        const newBalance = account.balance + value;
        await Account.updateOne({ _id: account_id }, { balance: newBalance });
        await StatementService.insertCredit(value, account_id);
        return await Account.find({ _id: account_id });
    } catch (e) {
        throw e;
    }
}

export async function withdraw(body) {
    const { account_id, value } = body;
    try {
        if (value < 20) {
            return [
                {
                    msg: "Withdraws cannot be less than 20. Only have cells of 20, 50, 100",
                },
            ];
        }

        const account = await getAccountById(account_id);

        if (account.msg === "Account not found") {
            return account;
        }

        if (value > account.balance) {
            return [{ msg: "Insufficient funds" }];
        }

        return getCells(account, value);
    } catch (e) {
        throw e;
    }
}

export async function debit(account, value) {
    try {
        account.balance -= value;
        await Account.updateOne({ _id: account._id }, account);
        await StatementService.insertDebit(value, account._id);
        return await Account.find({ _id: account._id });
    } catch (e) {
        throw e;
    }
}

export async function getCells(account, value) {
    let newBalance;

    if (value % 100 === 0) {
        newBalance = await debit(account, value);
        return [{ cell: 100, qty: value / 100 }, { newBalance: newBalance }];
    } else if ((value - 90) % 100 === 0) {
        newBalance = await debit(account, value);
        return [
            { cell: 100, qty: (value - 90) / 100 },
            { cell: 50, qty: 1 },
            { cell: 20, qty: 2 },
            { newBalance: newBalance },
        ];
    } else if ((value - 80) % 100 === 0) {
        newBalance = await debit(account, value);
        return [
            { cell: 100, qty: (value - 80) / 100 },
            { cell: 20, qty: 4 },
            { newBalance: newBalance },
        ];
    } else if ((value - 70) % 100 === 0) {
        newBalance = await debit(account, value);
        return [
            { cell: 100, qty: (value - 70) / 100 },
            { cell: 50, qty: 1 },
            { cell: 20, qty: 1 },
            { newBalance: newBalance },
        ];
    } else if ((value - 50) % 100 === 0) {
        newBalance = await debit(account, value);
        return [
            { cell: 100, qty: (value - 50) / 100 },
            { cell: 50, qty: 1 },
            { newBalance: newBalance },
        ];
    } else if ((value - 40) % 100 === 0) {
        newBalance = await debit(account, value);
        return [
            { cell: 100, qty: (value - 40) / 100 },
            { cell: 20, qty: 2 },
            { newBalance: newBalance },
        ];
    } else if ((value - 20) % 100 === 0) {
        newBalance = await debit(account, value);
        return [
            { cell: 100, qty: (value - 20) / 100 },
            { cell: 20, qty: 1 },
            { newBalance: newBalance },
        ];
    } else {
        return [
            {
                msg: `There aren't cells for ${value}. Cells available of 20, 50, 100`,
            },
        ];
    }
}
