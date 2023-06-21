import express from "express";
import * as AccountService from "../services/Account.js";
const router = express.Router();

router.post("/account/create", async function (req, res) {
    try {
        const createAccount = await AccountService.createAccount(req.body);
        res.status(200).send(createAccount);
    } catch (e) {
        console.error(e);
        res.status(200).send("Oops... Something get wrong.");
    }
});

router.get("/account/", async function (req, res) {
    try {
        const accounts = await AccountService.getAccounts();
        res.status(200).send(accounts);
    } catch (e) {
        console.error(e);
        res.status(200).send("Oops... Something get wrong.");
    }
});

router.get("/account/:id", async function (req, res) {
    try {
        const account = await AccountService.getAccountById(req.params.id);
        res.status(200).send(account);
    } catch (e) {
        console.error(e);
        res.status(200).send("Oops... Something get wrong.");
    }
});

router.patch("/account/deposit/", async function (req, res) {
    try {
        const user = await AccountService.deposit(req.body);
        res.status(200).send(user);
    } catch (e) {
        console.error(e);
        res.status(200).send("Oops... Something get wrong.");
    }
});

router.patch("/account/withdraw/", async function (req, res) {
    try {
        const user = await AccountService.withdraw(req.body);
        res.status(200).send(user);
    } catch (e) {
        console.error(e);
        res.status(200).send("Oops... Something get wrong.");
    }
});

router.get("/account/statements/:id", async function (req, res) {
    try {
        const accounts = await AccountService.getStatements(req.params.id);
        res.status(200).send(accounts);
    } catch (e) {
        console.error(e);
        res.status(200).send("Oops... Something get wrong.");
    }
});

const AccountController = router;

export default AccountController;
