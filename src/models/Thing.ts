import mongoose from "mongoose";
import { ISpace } from "./Space";

export interface IThing extends mongoose.Document {
    name: string;
    description?: string;
    space: ISpace;
    image?: string;
}

const thingSchema = new mongoose.Schema<IThing>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    space: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
        required: true,
    },
    image: {
        type: String,
    },
});