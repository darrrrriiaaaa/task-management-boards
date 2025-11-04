import { Schema, model, Types, Document } from "mongoose";

export interface IBoard extends Document {
    name: string;
    columns: Types.ObjectId[];
}

const boardSchema = new Schema<IBoard>({
    name: {type: String, required: true },
    columns: [{type: Schema.Types.ObjectId, ref: "Column"}]
});

export default model<IBoard>("Board", boardSchema);