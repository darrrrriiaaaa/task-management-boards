import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Column {
    _id: string;
    title: string;
    boardId: string;
    cards: string[];
    position?: number;
};

export interface ColumnSlice {
    columns: Column[];
}

const initialState: ColumnSlice = {
    columns: []
};

export const fetchColumnsFromBoard = createAsyncThunk("columns/fetchFromBoard", async (boardId: string) => {
    const response = await fetch(`http://localhost:5000/api/columns/board/${boardId}`);
    const data = await response.json();
    return data;
});

export const createColumn = createAsyncThunk("columns/create",
    async ({title, boardId}: {title: string; boardId: string}) => {
        const response = await axios.post("http://localhost:5000/api/columns", {title, boardId});
        return response.data;
});

export const updateColumn = createAsyncThunk("columns/update",
    async({id, data}: {id: string, data: Partial<Column>}) => {
    const response = await axios.patch(`http://localhost:5000/api/columns/${id}`, data);
    return response.data;
})

export const deleteColumn = createAsyncThunk("columns/delete",
    async(id: string) => {
        await axios.delete(`http://localhost:5000/api/columns/${id}`);
        return id;
    }
);

const columnSlice = createSlice({
    name: "columns",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchColumnsFromBoard.fulfilled, (state, action: PayloadAction<Column[]>) => {
            state.columns = action.payload;
        })
        .addCase(createColumn.fulfilled, (state, action: PayloadAction<Column>) => {
            state.columns.push(action.payload);
        })
        .addCase(updateColumn.fulfilled, (state, action: PayloadAction<Column>) => {
            const index = state.columns.findIndex((col) => col._id === action.payload._id);
            if (index !== -1) state.columns[index] = action.payload;
        })
        .addCase(deleteColumn.fulfilled, (state, action: PayloadAction<string>) => {
            state.columns = state.columns.filter((col) => col._id !== action.payload);
        })
    }
})

export default columnSlice.reducer;