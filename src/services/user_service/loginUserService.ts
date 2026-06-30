import { UserErrors } from "../../errors/userErrors";
import { IUserRepository } from "../../repository/userRepository";
import { loginUserSchema } from "../../types/loginSchema";
import bcrypt from 'bcrypt';
import { generateToken } from "../../utils/generateToken";

type LoginServiceResponse = {
    token: string
    expiresIn: string
    user: {
        id: number
        name: string
        email: string
        personal: boolean
    }
}

export const loginUser = async (email: string, password: string, repository: IUserRepository): Promise<LoginServiceResponse> => {
    loginUserSchema(email, password);

    const user = await repository.findByEmail(email);
    if (!user) throw new UserErrors('IncorretCredentialsExeption', 'Incorret credentials', 401);

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if(!passwordIsValid) throw new UserErrors('IncorretCredentialsExeption', 'Incorret credentials', 401);
    
    const token = generateToken({id: user.id, personal: user.personal});

    return {
        token,
        expiresIn: "1d",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            personal: user.personal
        }
    };
};