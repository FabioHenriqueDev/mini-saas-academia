import { prisma } from "../database/prisma";
import { IUser } from "../domain/entities/userEntities";
import { User } from '@prisma/client';

type UserInterfaceWithoutPassword = Omit<IUser, 'password'>;
type UserWithoutPasswordDatabase = Omit<User, 'password'>;

export type IUserRepository = {
    findUserById(id: number): Promise<UserWithoutPasswordDatabase | null>;
    findByEmail(email: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<UserWithoutPasswordDatabase | null>;
    createUser(user: IUser): Promise<UserInterfaceWithoutPassword>;
    editUserById(id: number, user: IUser): Promise<UserInterfaceWithoutPassword | null>;
}

export const UserRepository: IUserRepository = {

    findUserById: async(id) => {
        return await prisma.user.findUnique({
            where: {
                id
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