import { User } from "../models/User.js";

export async function createUser(user) {
  const { name, birthdate, cpf } = user;
  const newUser = new User({ name, birthdate, cpf });
  try {
    return await newUser.save();
  } catch (e) {
    throw e;
  }
}

export async function getUsers() {
  try{
    return await User.find();
  }catch(e){
    throw e;
  }
}

export async function getUserByCPF(cpf) {
  try{
    const user = await User.find({ cpf });
    if (user.length === 0) {
      return [{"msg": "User not found"}];
    }
    return user;
  }catch(e){
    throw e;
  }
}

export async function updateUserByCPF(user) {
  try{
    const userFind = await User.find({"cpf": user.cpf})
    if (userFind.length === 0) {
      return [{"msg": "User not found"}];
    }
    const userUpdate = await User.updateOne({"cpf": user.cpf}, user);
    const userUpdated = await User.find({"cpf": user.cpf})
    return [userUpdate, ...userUpdated];
  }catch(e){
    throw e;
  }  
}

export async function deleteUserByCPF(user) {
  try{
    const userFind = await User.find({"cpf": user.cpf})
    if (userFind.length === 0) {
      return [{"msg": "User not found"}];
    }
    const userDeleted = await User.deleteOne({ "cpf": user.cpf }); 
    return[userDeleted, ...userFind];
  }catch(e){
    throw e;
  }
  
}
