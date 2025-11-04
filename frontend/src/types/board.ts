import { ICard } from "./card.ts";

export interface IBoard {
    _id: string;
    name: string;
    columns: Record<string, ICard[]>;
}