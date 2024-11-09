import { Request, Response } from 'express';
import Space from '../models/Space';


export const getSpaces = async (req: Request, res: Response) => {
    try {
        const spaces = await Space.find({ user_id: req.user!._id });
        res.json(spaces);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const getSpace = async (req: Request, res: Response) => {
    try {
        const space = await Space.findOne({ _id: req.id, user_id: req.user!._id });
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
        const newSpace = new Space({ ...req.body, user_id: req.user!._id });
        await newSpace.save();
        res.status(201).json(newSpace);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const modifySpace = async (req: Request, res: Response) => {
    try {
        const space = await Space.findOneAndUpdate({ _id: req.id, user_id: req.user!._id }, req.body, { new: true });
        if (!space)
            return res.status(404).json({ message: 'Space not found' });
        
        res.json(space);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const deleteSpace = async (req: Request, res: Response) => {
    try {
        const space = await Space.findOneAndDelete({ _id: req.id, user_id: req.user!._id });
        if (!space)
            return res.status(404).json({ message: 'Space not found' });
        
        res.json({ message: 'Space deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}