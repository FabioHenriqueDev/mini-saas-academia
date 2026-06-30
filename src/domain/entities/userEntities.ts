import z from 'zod';
import { cpf } from 'cpf-cnpj-validator';
import bcrypt from 'bcrypt';
import { UserErrors } from '../../errors/userErrors';

export type IUser = z.infer< typeof schemaUser>;

const schemaUser = z.object({
    name: z.string().min(4, 'The name must have at least 4 characters.'),
    email: z.email('Invalid E-mail.'),
    password: z.string().min(5, 'The name must have at least 5 characters.'),
    cpf: z.string().refine((value) => cpf.isValid(value.replace(/\D/g, '')), {message: "Invalid CPF"}),
    personal: z.boolean()
});

export const biuldUser = async (name: string, email: string, password: string, cpf: string, personal=true): Promise<IUser> => {
    const user = { name, email, password, cpf, personal };
    const validation = schemaUser.safeParse(user);
    const normalizedCpf = cpf.replace(/\D/g, '');

    if(!validation.success) throw new UserErrors ('InvalidFieldsExeption', JSON.stringify(validation.error.format()), 400);
    
    const hashedPassword = await bcrypt.hash(password, 10);

    return {
        name,
        email,
        password: hashedPassword,
        cpf: normalizedCpf,
        personal
    };
};



