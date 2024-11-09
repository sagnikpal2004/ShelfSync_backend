import { Request, Response } from 'express';
import Space, { ISpace } from '../models/Space';
import Thing from '../models/Thing';


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
        
        if (!req.body.superSpace)
            return res.status(400).json({ message: 'Super space is required' });
        const superSpace = await Space.findOne({ _id: req.body.superSpace, user_id: req.user!._id });
        if (!superSpace)
            return res.status(404).json({ message: 'Super space not found' });
        superSpace.subSpaces?.push(newSpace);

        await newSpace.save();
        await superSpace.save();
        res.status(201).json(newSpace);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const modifySpace = async (req: Request, res: Response) => {
    try {
        const space = await Space.findOne({ _id: req.id, user_id: req.user!._id });
        if (!space)
            return res.status(404).json({ message: 'Space not found' });
        
        if (req.body.superSpace && req.body.superSpace !== space.superSpace!._id.toString()) {
            const oldSuperSpace = await Space.findOne({ _id: space.superSpace, user_id: req.user!._id });
            if (!oldSuperSpace)
                return res.status(404).json({ message: 'Old super space not found' });
            oldSuperSpace.subSpaces = oldSuperSpace.subSpaces?.filter(subSpace => subSpace._id.toString() !== req.id?.toString());

            const newSuperSpace = await Space.findOne({ _id: req.body.superSpace, user_id: req.user!._id });
            if (!newSuperSpace)
                return res.status(404).json({ message: 'New super space not found' });
            newSuperSpace.subSpaces?.push(space);

            await oldSuperSpace.save();
            await newSuperSpace.save();
        }
        
        const updatedSpace = await Space.findOneAndUpdate({ _id: req.id, user_id: req.user!._id }, req.body, { new: true });
        res.json(updatedSpace);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const deleteSpace = async (req: Request, res: Response) => {
    try {
        const space = await Space.findOne({ _id: req.id, user_id: req.user!._id });
        if (!space)
            return res.status(404).json({ message: 'Space not found' });

        const superSpace = await Space.findOne({ _id: space.superSpace, user_id: req.user!._id });
        if (!superSpace)
            return res.status(404).json({ message: 'Super space not found' });
        superSpace.subSpaces = superSpace.subSpaces?.filter(subSpace => subSpace._id.toString() !== req.id!.toString());
        await superSpace.save();

        const deleteSubSpaces = async (subSpaces: ISpace[]) => {
            if (!subSpaces) return;
            for (const subSpace of subSpaces) {
                await deleteSubSpaces(subSpace.subSpaces!);
                await Thing.deleteMany({ space_id: subSpace._id });
                await Space.deleteOne({ _id: subSpace });
            }
        }
        await deleteSubSpaces(space.subSpaces!);
        await Thing.deleteMany({ space_id: req.id });
        await space.deleteOne();
        
        res.json({ message: 'Space deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
}