import { Request, Response } from 'express';
import Thing, { IThing } from '../models/Thing';
import Space, { ISpace } from '../models/Space';

export const getThings = async (req: Request, res: Response) => {
    try {
        const { recursive, space_id } = req.query;
        
        if (!space_id) {
            const things = await Thing.find({ user_id: req.user!._id });
            res.json(things);
        } else if (space_id && !recursive) {
            const things = await Thing.find({ user_id: req.user!._id, space: space_id });
            res.json(things);
        } else if (space_id && recursive) {
            const space = await Space.findOne({ _id: space_id, user_id: req.user!._id });
            if (!space)
                return res.status(404).json({ message: 'Space not found' });

            const things: IThing[] = []
            const getThings = async (space: ISpace) => {
                if (space.thingList) things.push(...(await Thing.find({ _id: { $in: space.thingList } })));
                if (space.subSpaces) for (const subSpace of space.subSpaces) await getThings(subSpace);
            }

            await getThings(space);
            res.json(things);
        }
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
        
        const { space_id } = req.body;
        if (!space_id)
            return res.status(400).json({ message: 'Space ID is required' });
        const space = await Space.findOne({ _id: space_id, user_id: req.user!._id });
        if (!space)
            return res.status(404).json({ message: 'Space not found' });
        space.thingList?.push(newThing);

        await newThing.save();
        await space.save();
        res.status(201).json(newThing);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const modifyThing = async (req: Request, res: Response) => {
    try {
        const thing = await Thing.findOne({ _id: req.id, user_id: req.user!._id });
        if (!thing)
            return res.status(404).json({ message: 'Thing not found' });

        if (req.body.space && req.body.space !== thing.space.toString()) {
            const oldSpace = await Space.findOne({ _id: thing.space, user_id: req.user!._id });
            if (!oldSpace)
                return res.status(404).json({ message: 'Old space not found' });
            oldSpace.thingList = oldSpace.thingList?.filter(t => t._id.toString() !== thing._id.toString());

            const newSpace = await Space.findOne({ _id: req.body.space, user_id: req.user!._id });
            if (!newSpace)
                return res.status(404).json({ message: 'New space not found' });
            newSpace.thingList?.push(thing);

            await oldSpace.save();
            await newSpace.save();
        }

        const updatedThing = await Thing.findOneAndUpdate({ _id: req.id, user_id: req}, req.body, { new: true });
        res.json(updatedThing);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const deleteThing = async (req: Request, res: Response) => {
    try {
        const thing = await Thing.findOne({ _id: req.id, user_id: req.user!._id });
        if (!thing)
            return res.status(404).json({ message: 'Thing not found' });

        const space = await Space.findOne({ _id: thing.space, user_id: req.user!._id });
        if (!space)
            return res.status(404).json({ message: 'Space not found' });
        space.thingList = space.thingList?.filter(t => t._id.toString() !== thing._id.toString());
        await space.save();
        
        await thing.deleteOne();
        res.json({ message: 'Thing deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
