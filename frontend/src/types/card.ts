export interface ICard {
    _id: string;
    boardId: string;
    title: string;
    description?: string;
    column: string;
}