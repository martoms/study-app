import { createSlice } from "@reduxjs/toolkit";

// Load initial state from local storage or use an empty array if there's no data in the local storage
const storedState = JSON.parse(localStorage.getItem("studySet"));
const initialState = storedState ? storedState : { list: [] };

const studySetSlice = createSlice({
    name: 'set',
    initialState,
    reducers: {
        created: (state, action) => {
            const updatedState = {
                ...state,
                list: [...state.list, action.payload]
            };
            // Save the updated state to local storage
            localStorage.setItem("studySet", JSON.stringify(updatedState));
            return updatedState;
        }
    }
});

export const { created } = studySetSlice.actions;
export default studySetSlice.reducer;
