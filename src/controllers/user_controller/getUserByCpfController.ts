import type { RequestHandler } from "express";
import { UserRepository } from "../../repository/userRepository";
import { UserErrors } from "../../errors/user_errors/errors";
import * as UserService from "../../services/user_service/getUserByCpfService";
import { validateCPF } from "../../validators/validateCpf";


export const getUserByCpf: RequestHandler = async (req, res) => {
    const { cpf } = req.params as { cpf: string };
    const validate = validateCPF(cpf)
    if (!validate) return res.status(400).json({'Error': "Invalid CPF"})

    try{
        const user = await UserService.getUserByCpf(cpf, UserRepository);
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