import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Request, Response } from "express";
import config from '../config';

//format like bearer 21321n2bmbbj
export interface MyContext {
    req: Request;
    res: Response;
    payload?: {
        id: string,
        name: string,
        password: string,
    };
}

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
        throw new Error("Not authenticated");
    }

    try {

        const token = authorization.split(" ")[1];

        const payload = verify(token, config.jwtSecret);

        context.payload = payload as any;

    } catch (err) {

        throw new Error("Not authenticated");
    }
    return next();
};