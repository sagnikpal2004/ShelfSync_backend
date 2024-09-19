import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User";


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET)
    throw new Error("JWT_SECRET is not defined");

const generateToken = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "30d",
    });
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
        return res.sendStatus(401);
    if (!user.checkPass(password))
        return res.sendStatus(401);

    const token = generateToken(user._id.toString());
    res.status(200).json({
        token: token
    })
}

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
        return res.sendStatus(409);

    const user = await User.create({ name, email, password });
    if (!user)
        return res.sendStatus(500);

    const token = generateToken(user._id.toString());
    res.status(201).json({
        token: token
    })
}