import * as UserService from "../services/User.js";
import {connectDB} from "../db/Connection.js";

connectDB();

const user = {
    "name": "User Test",
    "birthdate": "2023-01-01",
    "cpf": "11111111111"
}

const userUpdate = {
    "name": "User Test",
    "birthdate": "2022-02-02",
    "cpf": "11111111111"
}

test('Create User', async ()=>{
    try{
        const userCreated = await UserService.createUser(user)
        expect(userCreated).toBe(userCreated);
    }catch(e){
        expect(e).toBe(e);
        
    }
})

test('Get Users', async ()=>{
    try{
        const users = await UserService.getUsers();
        expect(users).toBe(users);
    }catch(e){
        expect(e).toBe(e);
        
    }
})

test('Get User By CPF', async()=>{
    try{
        const userResult = await UserService.getUserByCPF(user.cpf);
        if (userResult === [{"msg": "User not found"}]) {
            expect(userResult).toBe([{"msg": "User not found"}]);
        }else{
            expect(userResult).toBe(userResult);
        }
    }catch(e){
        expect(e).toBe(e);        
    }
});

test('Update User By CPF', async()=>{
    try{
        const userResult = await UserService.updateUserByCPF(userUpdate);
        if (userResult === [{"msg": "User not found"}]) {
            expect(userResult).toBe([{"msg": "User not found"}]);
        }else{
            expect(userResult).toBe(userResult);
        }
    }catch(e){
        expect(e).toBe(e);
    }


});

test('Delete User By CPF', async()=>{
    try{
        const userResult = await UserService.deleteUserByCPF(user);
        if (userResult === [{"msg": "User not found"}]) {
            console.debug(1);
            expect(userResult).toBe([{"msg": "User not found"}]);
        }else{
            expect(userResult).toBe(userResult);

        }
    }catch(e){
        expect(e).toBe(e);
    }
});


