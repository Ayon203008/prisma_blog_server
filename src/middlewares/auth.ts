import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth"
export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}


declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
                emailVerfied: boolean
            }
        }
    }
}


const auth = (...roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers as any
            })

            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized"
                })
            }

            if (!session.user.emailVerified) {
                return res.status(401).json({
                    success: false,
                    message: "Email verfication required. Please verify email"
                })
            }

            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role as string,
                emailVerfied: session.user.emailVerified
            }

            if (roles.length && !roles.includes(req.user.role as UserRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden"
                })
            }
            next()
        } catch (err) {
            next(err)
        }
    }
}

export default auth