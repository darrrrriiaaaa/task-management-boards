import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Card {
    _id: string;
    columnId: string;
    title: string;
    description?: string;
}

export interface CardSlice {
    cards: Card[];
}

const initialState: CardSlice = {
    cards: []
};

export const fetchCardsFromColumn = createAsyncThunk("cards/fetchFromColumn", async (columnId: string) => {
    const response = await axios.get(`http://localhost:5000/api/cards/column/${columnId}`);
    return {columnId, cards: response.data};
});

export const createCard = createAsyncThunk("cards/createCard",
    async ({title, description, columnId}: {title: string; description?: string; columnId: string}) => {
        const response = await axios.post("http://localhost:5000/api/cards", {title, description, columnId});
        return response.data;
    });

export const updateCard = createAsyncThunk("cards/updateCard",
    async ({ id, data}: {id: string, data: Partial<Card>}) => {
        const response = await axios.patch(`http://localhost:5000/api/cards/${id}`, data);
        return response.data;
    }
);

export const deleteCard = createAsyncThunk("cards/deleteCard",
    async (id: string) => {
        await axios.delete(`http://localhost:5000/api/cards/${id}`);
        return id;
    }
)

const cardSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        clearCards: (state) => {
            state.cards = [];
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchCardsFromColumn.fulfilled, 
            (state, action: PayloadAction<{columnId: string; cards: Card[]}>) => {
                state.cards = state.cards.filter((card) => card.columnId !== action.payload.columnId);
                state.cards.push(...action.payload.cards);
            }
        )
        .addCase(createCard.fulfilled, (state, action: PayloadAction<Card>) => {
            state.cards.push(action.payload);
        })
        .addCase(updateCard.fulfilled, (state, action: PayloadAction<Card>) => {
            const index = state.cards.findIndex((c) => c._id === action.payload._id);
            if (index !== -1) state.cards[index] = action.payload;
        })
        .addCase(deleteCard.fulfilled, (state, action: PayloadAction<string>) => {
            state.cards = state.cards.filter((c) => c._id !== action.payload);
        })
    }
});

export default cardSlice.reducer;
export const {clearCards} = cardSlice.actions;