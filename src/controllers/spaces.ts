import { Request, Response } from 'express';
import Space from '../models/Space';

export const getSpaces = async (req: Request, res: Response) => {
    try {
        const spaces = await Space.find();
        res.json(spaces);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const getSpace = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const space = await Space.findById(id);
        if (!space) {
            return res.status(404).json({ message: 'Space not found' });
        }
        res.json(space);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const createSpace = async (req: Request, res: Response) => {
    try {
        const newSpace = new Space(req.body);
        await newSpace.save();
        res.status(201).json(newSpace);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const modifySpace = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const space = await Space.findByIdAndUpdate(id, updates, { new: true });
        if (!space) {
            return res.status(404).json({ message: 'Space not found' });
        }
        res.json(space);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const deleteSpace = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const space = await Space.findByIdAndDelete(id);
        if (!space) {
            return res.status(404).json({ message: 'Space not found' });
        }
        res.json({ message: 'Space deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}