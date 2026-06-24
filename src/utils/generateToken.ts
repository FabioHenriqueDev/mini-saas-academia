import jwt from 'jsonwebtoken';

type ITokenPayload = {
    id: number;
    personal: boolean;
};

export const generateToken = (payload: ITokenPayload): string => {
    const secret = process.env.JWT_SECRET;
    if(!secret) throw new Error('JWT not configured');

    const token = jwt.sign(
        payload,
        secret,
        { expiresIn: '1d' }
    );

    return token;
};

