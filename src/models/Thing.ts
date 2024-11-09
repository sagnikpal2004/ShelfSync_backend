import mongoose from "mongoose";
import { ISpace } from "./Space";

export interface IThing extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    space: ISpace;
    image?: string;
}

const thingSchema = new mongoose.Schema<IThing>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
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

const Thing = mongoose.model<IThing>("Thing", thingSchema);
export default Thing;