import mongoose from "mongoose";
import { IThing } from "./Thing";

export interface ISpace extends mongoose.Document {
    name: string;
    description?: string;
    coords1: number[];
    coords2: number[];
    superSpace?: ISpace;
    subSpaces?: ISpace[];
    image?: string;
    thingList?: IThing[];
}

const spaceSchema = new mongoose.Schema<ISpace>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    coords1: {
        type: [Number],
        required: true,
    },
    coords2: {
        type: [Number],
        required: true,
    },
    superSpace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
    },
    subSpaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
    }],
    image: {
        type: String,
    },
    thingList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thing",
    }],
});

const Space = mongoose.model<ISpace>("Space", spaceSchema);
export default Space;