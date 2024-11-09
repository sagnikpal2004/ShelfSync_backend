import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends mongoose.Document{
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    checkPass: (p: string) => Promise<boolean>;
}


const userSchema = new mongoose.Schema<IUser>({
    name: { 
        type: String, 
        required: true, 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
    },
    password: { 
        type: String, 
        required: true 
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.checkPass = async function (password: string) {
    return bcrypt.compare(password, this.password);
}


const User = mongoose.model<IUser>("User", userSchema);
export default User;