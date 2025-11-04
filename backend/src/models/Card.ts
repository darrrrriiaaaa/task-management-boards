import { Schema, model, Types, Document } from "mongoose";

export interface ICard extends Document {
    columnId: Types.ObjectId;
    title: string;
    description?: string;
}

const cardSchema = new Schema<ICard>({
    columnId: { type: Schema.Types.ObjectId, ref: "Column", required: true },
    title: { type: String, required: true },
    description: String
});

export default model<ICard>("Card", cardSchema);