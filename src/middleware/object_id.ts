import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ message: "ID is required" });

    if (!Types.ObjectId.isValid(id))
        return res.status(400).json({ message: "Invalid ID" });
    
    req.id = new Types.ObjectId(id);
    next();
}

export default validateObjectId;