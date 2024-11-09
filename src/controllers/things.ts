import { Request, Response } from 'express';
import Thing from '../models/Thing';

export const getThings = async (req: Request, res: Response) => {
    try {
        const things = await Thing.find();
        res.json(things);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const getThing = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const thing = await Thing.findById(id);
        if (!thing) {
            return res.status(404).json({ message: 'Thing not found' });
        }
        res.json(thing);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const createThing = async (req: Request, res: Response) => {
    try {
        const newThing = new Thing(req.body);
        await newThing.save();
        res.status(201).json(newThing);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const modifyThing = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const thing = await Thing.findByIdAndUpdate(id, updates, { new: true });
        if (!thing) {
            return res.status(404).json({ message: 'Thing not found' });
        }
        res.json(thing);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const deleteThing = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const thing = await Thing.findByIdAndDelete(id);
        if (!thing) {
            return res.status(404).json({ message: 'Thing not found' });
        }
        res.json({ message: 'Thing deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
