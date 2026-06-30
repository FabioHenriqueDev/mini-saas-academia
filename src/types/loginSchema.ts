import z from 'zod';
import { UserErrors } from '../errors/userErrors';

export type UserInputLogin = z.infer<typeof loginInput>

const loginInput = z.object({
    email: z.email('Invalid E-mail'),
    password: z.string().min(5, 'The name must have at least 5 characters.'),
});


export const loginUserSchema = async (email: string, password: string): Promise<UserInputLogin> => {
    const userLoginSchema = { email, password };
    const shemaValidate = loginInput.safeParse(userLoginSchema);
    if (!shemaValidate.success) throw new UserErrors ('InvalidFieldsExeption', JSON.stringify(shemaValidate.error.format()), 400);

    return {
        email,
        password
    };
};