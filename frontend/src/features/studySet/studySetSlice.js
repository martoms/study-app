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
        },
        deleteSet: (state, action) => {
            
            const setsToDelete = action.payload.map(setName => setName.toString());

            const newSetList = state.filter(set => !setsToDelete.includes(set.setName));

            localStorage.setItem("studySet", JSON.stringify(newSetList));

            return newSetList;
        }
    }
});

export const { createSet, deleteSet } = studySetSlice.actions;
export default studySetSlice.reducer;
