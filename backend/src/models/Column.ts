import { Schema, model, Document, Types } from "mongoose";

export interface IColumn extends Document {
    title: string;
    boardId: Types.ObjectId;
    cards: Types.ObjectId[];
    position?: number;
}

const columnSchema = new Schema<IColumn>({
    title: {type: String, required: true},
    boardId: {type: Schema.Types.ObjectId, ref: "Board", required: true},
    cards: [{type: Schema.Types.ObjectId, ref: "Card"}],
    position: {type: Number},
});

export default model<IColumn>("Column", columnSchema);