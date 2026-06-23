import type { RequestHandler } from "express";
import * as UserService from '../../services/user_service/editUserByIdService'
import { UserRepository } from "../../repository/userRepository";
import { UserErrors } from "../../errors/user_errors/errors";


export const editUserByID: RequestHandler = async (req, res) => {
    let { name, email, password, cpf } = req.body;
    const id = req.user.id;

    try{
        let user = await UserService.editUserById(id, name, email, password, cpf, UserRepository);
        res.status(200).json({sucess: true, user});
    } catch(error) {
        if(error instanceof UserErrors ){
            res.status(error.statusCode).json({ error: error.message });
            console.log(error);
        } else {
            res.status(500).json({ error });
            console.log(error);
        }
        
    }
}