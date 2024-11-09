import { Request, Response } from 'express';

export const getSpaces = async (req: Request, res: Response) => {
    res.sendStatus(501);
}

export const getSpace = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.sendStatus(501);
}

export const createSpace = async (req: Request, res: Response) => {
    res.sendStatus(501);
}

export const modifySpace = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.sendStatus(501);
}

export const deleteSpace = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.sendStatus(501);
}