import * as UserEntities from "../../domain/entities/userEntities";
import { UserErrors } from "../../errors/user_errors/errors";
import { IUserRepository } from "../../repository/userRepository";


export const editUserById = async (id: number, name: string, email: string, password: string, cpf: string, repository: IUserRepository) => {
    const user = await UserEntities.biuldUser(name, email, password, cpf);

    const emailExists = await repository.findByEmail(email);
    if (emailExists && emailExists.id !== id) throw new UserErrors('EmailALreadyExistsExeption', 'E-mail already exists in database', 409);

    const existsCpf = await repository.findByCpf(cpf);
    if (existsCpf && existsCpf.id !== id) throw new UserErrors ('CpfAlreadyExistsException', 'CPF already exists in database', 409);

    const exists = await repository.findUserById(id);
    if (!exists) throw new UserErrors ('UserNotFoundExeption', 'User not found', 404);

    const userEdited = await repository.editUserById(id, user);
    
    return userEdited;
}