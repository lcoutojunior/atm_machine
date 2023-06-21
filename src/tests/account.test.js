import * as AccountService from "../services/Account.js";
import {connectDB} from "../db/Connection.js";

await connectDB();

const accountWrongBalance = {
    "account_type": "bank_account",
    "balance": 0.01,
    "users": [{
        "_id": ""
    }]
}

const accountWrongType = {
    "account_type": "super_account",
    "balance": 1,
    "users": [{
        "_id": ""
    }]
}

const bodyWrongValue = {
    "account_id": "",
    "value": 0.02
}

const anyId = "7490c0b0284b4152221044d5";

const bodyWrongId = {
    "account_id": anyId,
    "value": 20
}

test('Create Account with less than 1', async ()=>{
    const accountCreated = await AccountService.createAccount(accountWrongBalance)
    expect(accountCreated[0].msg).toBe("Deposits cannot be less than 1");
});

test('Create Account with wrong Type', async ()=>{
    const accountCreated = await AccountService.createAccount(accountWrongType)
    expect(accountCreated[0].msg).toBe("account_type can only be poupance or bank_account");
});

test('Get Account By Wrong Id', async ()=>{
    const accountCreated = await AccountService.getAccountById(anyId);
    expect(accountCreated.msg).toBe("Account not found");
});

test('Deposit less than 1', async ()=>{
    const accountCreated = await AccountService.deposit(bodyWrongValue);
    expect(accountCreated[0].msg).toBe("Deposits cannot be less than 1");
});

test('Deposit wrong Account Id', async ()=>{
    const accountCreated = await AccountService.deposit(bodyWrongId);
    expect(accountCreated.msg).toBe("Account not found");
});

test('Withdraw less than 20', async ()=>{
    const accountCreated = await AccountService.withdraw(bodyWrongValue);
    expect(accountCreated[0].msg).toBe("Withdraws cannot be less than 20. Only have cells of 20, 50, 100");
});

test('Withdraw wrong Account Id', async ()=>{
    const accountCreated = await AccountService.withdraw(bodyWrongId);
    expect(accountCreated.msg).toBe("Account not found");
});

test('Get cell of 15', async()=>{
    const cells = await AccountService.getCells(anyId, 15);
    expect(cells[0].msg).toBe("There aren't cells for 15. Cells available of 20, 50, 100");
})