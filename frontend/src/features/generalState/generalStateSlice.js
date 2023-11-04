import { createSlice } from "@reduxjs/toolkit";

const storedState = JSON.parse(localStorage.getItem("generalState"));

const initialState = storedState ? storedState : {
    addItems: false,
    currentSet: '',
    category: ''
};

const generalStateSlice = createSlice({
    name: 'generalState',
    initialState,
    reducers: {
        addItems: (state, action) => {
            const addItems = action.payload;

            const updatedState = {...state, addItems};

            return updatedState
        },
        currentSet: (state, action) => {
            const currentSet = action.payload;

            const updatedState = {...state, currentSet};

            localStorage.setItem("generalState", JSON.stringify(updatedState));

            return updatedState
        },
        category: (state, action) => {
            const category = action.payload;

            const updatedState = {...state, category};

            localStorage.setItem("generalState", JSON.stringify(updatedState));

            return updatedState
        }
    }
});

export const { addItems, currentSet, category } = generalStateSlice.actions;
export default generalStateSlice.reducer;