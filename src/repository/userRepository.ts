import { prisma } from "../database/prisma";
import { User } from "../domain/entities/userEntities";

export type UserWithoutPassword = Omit<User, 'password'>;

export type IUserRepository = {
    findByEmail(email: string): Promise<User | null>;
    findByCPF(cpf: string): Promise<User | null>;
    save(user: User): Promise<UserWithoutPassword>;
}

export const UserRepository: IUserRepository = {
    findByEmail: async (email) => {
        return await prisma.user.findUnique({
            where: {email}
        });
    },

    findByCPF: async (cpf) => {
        return await prisma.user.findUnique({
            where: {cpf}
        });
    },

    save: async (user) => {
        return await prisma.user.create({
            data: user,
            select: {
                id: true,
                name: true, 
                email: true,
                cpf: true,
                personal: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }
}