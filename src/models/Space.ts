import mongoose from "mongoose";


export interface ISpace extends mongoose.Document {
    name: string;
    coords: number[];
    superSpace?: ISpace;
    subSpaces?: ISpace[];
}

const spaceSchema = new mongoose.Schema<ISpace>({
    name: {
        type: String,
        required: true,
    },
    coords: {
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
    }]
});

const Space = mongoose.model<ISpace>("Space", spaceSchema);
export default Space;