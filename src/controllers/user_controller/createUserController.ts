import type { RequestHandler } from "express";
import * as UserService from '../../services/user_service/createUserService'
import { UserRepository } from "../../repository/userRepository";
import { UserErrors } from "../../errors/user_errors/errors";


export const createUser: RequestHandler = async (req, res) => {
    let { name, email, password, cpf } = req.body;

    try{
        let user = await UserService.createUser(name, email, password, cpf, UserRepository);
        res.status(201).json({sucess: true, user})
    } catch(error) {
        if(error instanceof UserErrors ){
            res.status(error.statusCode).json({ error: error.message })
            console.log(error)
        } else {
            res.status(500).json({ error })
            console.log(error)
        }
        
    }
}