import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (id)
        if (!Types.ObjectId.isValid(id))
            res.status(400).json({ message: "Invalid ID" });
        else
            req.id = new Types.ObjectId(id);

    next();
}

export default validateObjectId;