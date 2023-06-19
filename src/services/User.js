import { User } from "../models/User.js";

export async function createUser(user) {
  const { name, birthdate, cpf } = user;
  console.log("DENTRO DO MODEL name: ", name, " birthdate: ", " cpf: ", cpf);
  const newUser = new User({ name, birthdate, cpf });
  try {
    return await newUser.save();
  } catch (e) {
    return e;
  }
}

export async function getUsers() {
  User.find()
    .then((users) => users)
    .catch((err) => err);
}

export async function getUserByCPF(cpf) {
  User.find({ cpf })
    .then((user) => {
      if (!user) {
        return "User not found";
      }
      return user;
    })
    .catch((err) => err);
}

export async function updateUser(cpf) {
  User.find({ cpf }, { new: true })
    .then((user) => {
      if (!user) {
        return "User not found";
      }
      return user;
    })
    .catch((err) => err);
}

export async function deleteUser(cpf) {
  User.deleteOne({ cpf })
    .then((user) => {
      if (!user) {
        return "User not found";
      }
      return user;
    })
    .catch((err) => err);
}
