import {configureStore} from "@reduxjs/toolkit";
import boardReducer from "../features/boardSlice.ts";
import columnReducer from "../features/columnSlice.ts";
import cardReducer from "../features/cardSlice.ts";

export const store = configureStore({
    reducer: {
        boards: boardReducer,
        columns: columnReducer,
        cards: cardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;