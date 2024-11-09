import { Request, Response } from 'express';
import Thing from '../models/Thing';

export const getThings = async (req: Request, res: Response) => {
    try {
        const things = await Thing.find({ user_id: req.user!._id });
        res.json(things);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const getThing = async (req: Request, res: Response) => {
    try {
        const thing = await Thing.findOne({  _id: req.id, user_id: req.user!._id });
        if (!thing)
            return res.status(404).json({ message: 'Thing not found' });
        
        res.json(thing);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const createThing = async (req: Request, res: Response) => {
    try {
        const newThing = new Thing({ ...req.body, user_id: req.user!._id });
        await newThing.save();
        res.status(201).json(newThing);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const modifyThing = async (req: Request, res: Response) => {
    try {
        const thing = await Thing.findOneAndUpdate({ _id: req.id, user_id: req.user!._id }, req.body, { new: true });
        if (!thing)
            return res.status(404).json({ message: 'Thing not found' });
        
        res.json(thing);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const deleteThing = async (req: Request, res: Response) => {
    try {
        const thing = await Thing.findOneAndDelete({ _id: req.id, user_id: req.user!._id });
        if (!thing)
            return res.status(404).json({ message: 'Thing not found' });
        
        res.json({ message: 'Thing deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
