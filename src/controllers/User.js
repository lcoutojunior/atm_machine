import express from "express";
import * as UserService from "../services/User.js";
const router = express.Router();

router.post("/user/create", async function (req, res) {
  try {
    const createUser = await UserService.createUser(req.body);
    res.status(200).send(createUser);
  } catch (e) {
    console.error(e);
    res.status(200).send('Oops... Something get wrong.');
  }
});

router.get("/user/get", async function (req, res) {
  try {
    const users = await UserService.getUsers();
    res.status(200).send(users);
  } catch (e) {
    console.error(e);
    res.status(200).send('Oops... Something get wrong.');
  }
});

router.get("/user/get/cpf/:cpf", async function (req, res) {
  try {
    const user = await UserService.getUserByCPF(req.params.cpf);
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(200).send('Oops... Something get wrong.');
  }
});

router.put("/user/update", async function (req, res) {
  try {
    const user = await UserService.updateUserByCPF(req.body);
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(200).send('Oops... Something get wrong.');
  }
});

router.delete("/user/delete", async function (req, res) {
  try {
    const user = await UserService.deleteUserByCPF(req.body);
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(200).send('Oops... Something get wrong.');
  }
});

const UserController = router;

export default UserController;
