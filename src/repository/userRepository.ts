import { prisma } from "../database/prisma";
import { User } from "../domain/entities/userEntities";

type UserWithoutPassword = Omit<User, 'password'>;

export type IUserRepository = {
    findUserById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<UserWithoutPassword | null>;
    createUser(user: User): Promise<UserWithoutPassword>;
    editUserById(id: number, user: User): Promise<UserWithoutPassword | null>;
}

export const UserRepository: IUserRepository = {

    findUserById: async(id) => {
        return await prisma.user.findUnique({
            where: {
                id
            }
        });
    },


    findByEmail: async (email) => {
        return await prisma.user.findUnique({
            where: {email}
        });
    },

    findByCpf: async (cpf) => {
        return await prisma.user.findUnique({
            where: { cpf },
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
    },

    createUser: async (user) => {
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
    },

    editUserById: async (id, user) => {
        return await prisma.user.update({
            where: {
                id
            },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                cpf: user.cpf
            }, 
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
};