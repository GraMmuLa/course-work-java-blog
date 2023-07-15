import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Post} from "../../types/model/post"

const initialState: {items: Post[]} = {
    items: []
}

export const postSlice = createSlice({
    name: "postsReducer",
    initialState: initialState,
    reducers: {
        addMany: (state, action: PayloadAction<Post[]>) => {
            state.items = action.payload;
        },
        add: (state, action: PayloadAction<Post>) => {
            state.items.push(action.payload);
        }
    },
    extraReducers: {
    }
});

export default postSlice.reducer;
