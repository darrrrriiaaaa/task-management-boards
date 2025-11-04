import { createAsyncThunk, createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

interface Board {
    _id: string;
    name: string;
    columns: string[];
};

export interface BoardSlice {
    boards: Board[];
    currentBoard: Board | null;
};

const initialState: BoardSlice = {
    boards: [],
    currentBoard: null,
};

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
    const response = await fetch("http://localhost:5000/api/boards");
    const data = await response.json();
    return data;
});

export const createBoard = createAsyncThunk("boards/createBoard", async (data: {name: string}) => {
    const response = await axios.post("http://localhost:5000/api/boards", data);
    return response.data;
})

const boardSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        addBoard: {
            reducer: (state, action: PayloadAction<Board>) => {
                state.boards.push(action.payload);
            },
            prepare: (data: {name: string}) => {
                return {payload: {_id: nanoid(), name: data.name, columns: []}};
            }
        },
        setCurrentBoard: (state, action: PayloadAction<string>) => {
            state.currentBoard = state.boards.find((b) => b._id === action.payload) || null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchBoards.fulfilled, (state, action) => {
            state.boards = action.payload;
        })
        .addCase(createBoard.fulfilled, (state, action: PayloadAction<Board>) => {
            state.boards.push(action.payload);
        })
    }
});

export const { addBoard, setCurrentBoard} = boardSlice.actions;
export default boardSlice.reducer;