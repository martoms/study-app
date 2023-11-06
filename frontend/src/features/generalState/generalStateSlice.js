import { createSlice } from "@reduxjs/toolkit";

const storedState = JSON.parse(localStorage.getItem("generalState"));

const initialState = storedState ? storedState : {
    addItems: false,
    currentSet: '',
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
        currentSet: (state, action) => {
            const currentSet = action.payload;

            const updatedState = {...state, currentSet};

            localStorage.setItem("generalState", JSON.stringify(updatedState));

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

export const { addItems, currentSet, itemType, whatToDelete } = generalStateSlice.actions;
export default generalStateSlice.reducer;