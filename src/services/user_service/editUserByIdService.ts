import * as UserEntities from "../../domain/entities/userEntities";
import { UserErrors } from "../../errors/user_errors/errors";
import { IUserRepository } from "../../repository/userRepository";


export const editUserById = async (id: number, name: string, email: string, password: string, cpf: string, repository: IUserRepository) => {
    const user = await UserEntities.biuldUser(name, email, password, cpf);
    
    console.log( await repository.findByEmail(email))

    const exists = repository.findUserById(id);
    if (!exists) throw new UserErrors ('UserNotFoundExeption', 'User not found', 404);

    const userEdited = await repository.editUserById(id, user);
    
    return userEdited;
}