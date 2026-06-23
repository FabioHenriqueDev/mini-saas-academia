import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import z from 'zod';

type IJwtPayload = z.infer<typeof jwtPayloadSchema>

const jwtPayloadSchema = z.object({
    id: z.number(),
    personal: z.boolean()
});


export const verifyJwtMiddlewarePersonal: RequestHandler = (req, res, next) => {
    const tokenHeader  = req.headers.authorization as string;
    if(!tokenHeader) return res.status(401).json({error: "Authentication Needed"});
    
    const secret = process.env.JWT_SECRET;
    if(!secret) return res.status(500).json({error: "JWT secret not configured"});

    const token = tokenHeader.split(' ')[1];
    if(!token) return res.status(401).json({error: "Authentication Needed"});

    try{
        const decodedJwt = jwt.verify(token, secret) as IJwtPayload;
        if (!decodedJwt.personal) return res.status(401).json({error: "You need to be a personal trainer to access this route"})

        req.user = {
            id: decodedJwt.id,
            personal: decodedJwt.personal
        };

        next();
    } catch(error) {
        return res.status(401).json({error: "Token expired"});
    }
}