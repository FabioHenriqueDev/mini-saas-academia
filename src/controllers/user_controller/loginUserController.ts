import { RequestHandler } from "express";
import { UserErrors } from "../../errors/userErrors";
import * as LoginService from '../../services/user_service/loginUserService'
import { UserRepository } from "../../repository/userRepository";


export const loginUser: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        const loginInfo = await LoginService.loginUser(email, password, UserRepository);
        return res.status(200).json(loginInfo);

    } catch(error) {
        if(error instanceof UserErrors){
            console.log(error);
            return res.status(error.statusCode).json({ error: error.message });
        } else {
            console.log(error);
            return res.status(500).json({erro: error});
        }
    }
}