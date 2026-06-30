import { UserErrors } from "../../errors/userErrors";
import { IUserRepository } from "../../repository/userRepository";

export const getUserByCpf = async (cpf: string, repository: IUserRepository) => {
    let userExists = await repository.findByCpf(cpf);
    if (!userExists) throw new UserErrors('UserNotFoundExeption', 'User not found', 404);
    
    return userExists;
    
}