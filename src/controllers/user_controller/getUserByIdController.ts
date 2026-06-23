import type { RequestHandler } from "express";
import { UserRepository } from "../../repository/userRepository";
import { UserErrors } from "../../errors/user_errors/errors";
import * as UserService from "../../services/user_service/getUserByIdService";


export const getUserById: RequestHandler = async (req, res) => {
    const { id } = req.params as { id: string};
    const  idNumber = Number(id)
    try{
        const user = await UserService.getUserById(idNumber, UserRepository);
        return res.status(200).json({sucess: true, user})
    } catch(error) {
        if(error instanceof UserErrors ){
            console.log(error)
            return res.status(error.statusCode).json({ error: error.message })
        } else {
            res.status(500).json({ error })
            console.log(error)
        }
        
    }
}