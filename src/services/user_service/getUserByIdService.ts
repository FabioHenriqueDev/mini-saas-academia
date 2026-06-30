import { UserErrors } from "../../errors/userErrors";
import { IUserRepository } from "../../repository/userRepository";

export const getUserById = async (id: number, repository: IUserRepository) => {
    let userExists = await repository.findUserById(id);
    if (!userExists) throw new UserErrors('UserNotFoundExeption', 'User not found', 404);
    
    return userExists;
    
}