import { createSlice } from "@reduxjs/toolkit";

const storedState = JSON.parse(localStorage.getItem("generalState"));

const initialState = storedState ? storedState : {
    addItems: false,
    itemType: '',
    whatToDelete: ''
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
        itemType: (state, action) => {
            const itemType = action.payload;

            const updatedState = {...state, itemType};

            localStorage.setItem("generalState", JSON.stringify(updatedState));

            return updatedState
        },
        whatToDelete: (state, action) => {
            const whatToDelete = action.payload;

            const updatedState = {...state, whatToDelete};

            localStorage.setItem("generalState", JSON.stringify(updatedState));

            return updatedState
        }
    }
});

export const { addItems, itemType, whatToDelete } = generalStateSlice.actions;
export default generalStateSlice.reducer;