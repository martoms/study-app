import { createSlice } from "@reduxjs/toolkit";

const storedState = JSON.parse(localStorage.getItem("studySet"));
const initialState = storedState ? storedState : [];

const studySetSlice = createSlice({
    name: 'set',
    initialState,
    reducers: {
        createSet: (state, action) => {
            const newSet = {
                setName: action.payload.setName,
                items: action.payload.items, 
                createdOn: Date.now()
            };

            const updatedState = [...state, newSet];

            // Save the updated state to local storage
            localStorage.setItem("studySet", JSON.stringify(updatedState));

            return updatedState;
        }
    }
});

export const { createSet } = studySetSlice.actions;
export default studySetSlice.reducer;
