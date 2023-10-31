import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: []
};

const studySetSlice = createSlice({
    name: 'set',
    initialState,
    reducers: {
        created: (state, action) => {
            return {
                ...state,
                list: [...state.list, action.payload]
            };
        }
    }
});

export const { created } = studySetSlice.actions;
export default studySetSlice.reducer;
