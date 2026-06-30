import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import z from 'zod';

type IJwtPayload = z.infer<typeof jwtPayloadSchema>

const jwtPayloadSchema = z.object({
    id: z.number('The id needed to be a number.'),
    personal: z.boolean('The personal needed to be a boolean.')
});


export const verifyJwtMiddleware: RequestHandler = (req, res, next) => {
    const tokenHeader  = req.headers.authorization as string;
    if(!tokenHeader) return res.status(401).json({error: "Authentication Needed"});
    
    const secret = process.env.JWT_SECRET;
    if(!secret) return res.status(500).json({error: "JWT secret not configured"});

    const token = tokenHeader.split(' ')[1];
    if(!token) return res.status(401).json({error: "Authentication Needed"});

    try{
        const decodedJwt = jwt.verify(token, secret) as IJwtPayload;

        req.user = {
            id: decodedJwt.id,
            personal: decodedJwt.personal
        };

        next();
    } catch(error) {
        return res.status(401).json({error: "Token expired"});
    }
}