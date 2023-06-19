import express from "express";
import * as UserService from "../services/User.js";
const router = express.Router();

router.post("/user/create", async function (req, res) {
  try {
    console.log("RECEBEU: ", req.body)
    const createUser = await UserService.createUser(req.body);
    console.log("DENTRO DO CONTROLLER CREATE USER: ", createUser);
    res.status(200).send(createUser);
  } catch (e) {
    console.error(e.cause);
    res.status(200).send(e.cause);
  }
});

const UserController = router;

export default UserController;
