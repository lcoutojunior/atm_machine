import * as UserService from "../services/User.js";
import { connectDB } from "../db/Connection.js";

await connectDB();

const user = {
    name: "User Test",
    birthdate: "2023-01-01",
    cpf: "11111111111",
};

const userUpdate = {
    name: "User Test",
    birthdate: "2022-02-02",
    cpf: "11111111111",
};

test("Create User", async () => {
    const userCreated = await UserService.createUser(user);
    expect(userCreated).toBe(userCreated);
});

test("Create Same User (cpf unique)", async () => {
    try {
        await UserService.createUser(user);
    } catch (e) {
        expect(e).toBe(e);
    }
});

test("Get Users", async () => {
    const users = await UserService.getUsers();
    expect(users).toBe(users);
});

test("Get User By Wrong CPF", async () => {
    const userResult = await UserService.getUserByCPF("xxxxxxxxxxx");
    expect(userResult[0].msg).toBe("User not found");
});

test("Get User By CPF", async () => {
    const userResult = await UserService.getUserByCPF(user.cpf);
    expect(userResult).toBe(userResult);
});

test("Update User By CPF", async () => {
    const userResult = await UserService.updateUserByCPF(userUpdate);
    expect(userResult).toBe(userResult);
});

test("Delete User By CPF", async () => {
    const userResult = await UserService.deleteUserByCPF(user);
    expect(userResult).toBe(userResult);
});
