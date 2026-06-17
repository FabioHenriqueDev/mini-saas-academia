import * as UserEntities from "../../domain/entities/userEntities";
import { UserErrors } from "../../errors/user_errors/errors";
import { IUserRepository } from "../../repository/userRepository";


export const createUser = async (name: string, email: string, password: string, cpf: string, repository: IUserRepository) => {
    const existsEmail = await repository.findByEmail(email);
    if (existsEmail) throw new UserErrors ('EmailAlreadyExistsException', 'E-mail already exists in database', 409);

    const existsCPF = await repository.findByCPF(cpf);
    if (existsCPF) throw new UserErrors ('CpfAlreadyExistsException', 'CPF already exists in database', 409);

    const user = await UserEntities.newUser(name, email, password, cpf)
    const userCreated = repository.save(user)
    
    return userCreated
}