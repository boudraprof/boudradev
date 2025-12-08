import mongoose, { Schema, Document, Model } from "mongoose";

export interface TContact extends Document {
    name: string;
    email: string;
    message: string;
    date: Date;
}

const ContactSchema = new Schema<TContact>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
        date: { type: Date, required: true },
    },
    { timestamps: true }
);

const Invoice: Model<TContact> =
    mongoose.models.Contact || mongoose.model<TContact>("Contact", ContactSchema);

export default Invoice;