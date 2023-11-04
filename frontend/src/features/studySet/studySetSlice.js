import { createSlice } from "@reduxjs/toolkit";

const storedState = JSON.parse(localStorage.getItem("studySet"));
const initialState = storedState ? storedState : [];

const studySetSlice = createSlice({
    name: 'studySetList',
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

            const updatedState = state.filter(set => !setsToDelete.includes(set.setName));

            localStorage.setItem("studySet", JSON.stringify(updatedState));

            return updatedState;
        },
        renameSet: (state, action) => {
            const { targetItem, newName } = action.payload;

            const updatedState = state.map(set => {
                if (set.setName === targetItem) {
                    return { ...set, setName: newName };
                }
                return set;
            });

            localStorage.setItem("studySet", JSON.stringify(updatedState));

            return updatedState;
        },
        sortSet: (state, action) => {
            const order = action.payload
            let sortedStudySet;

            if (order === 'latest') {
                sortedStudySet = state.slice().sort((a, b) => b.createdOn - a.createdOn);
            } else if (order === 'oldest') {
                sortedStudySet = state.slice().sort((a, b) => a.createdOn - b.createdOn);
            } else if (order === 'a-z') {
                sortedStudySet = state.slice().sort((a, b) => a.setName.localeCompare(b.setName));
            } else if (order === 'z-a') {
                sortedStudySet = state.slice().sort((a, b) => b.setName.localeCompare(a.setName));
            } else if (order === 'moreItems') {
                sortedStudySet = state.slice().sort((a, b) => a.items.length - b.items.length);
            } else if (order === 'lessItems') {
                sortedStudySet = state.slice().sort((a, b) => b.items.length - a.items.length);
            }

            localStorage.setItem("studySet", JSON.stringify(sortedStudySet));

            return sortedStudySet;
        },
        addIdentificationItems: (state, action) => {
            const {newItems, currentSet} = action.payload;
            
            const updatedState = state.map(set => {
                if (set.setName === currentSet) {
                    return {
                        ...set,
                        items: [...set.items, ...newItems]
                    }
                }
                return set;
            });

            localStorage.setItem("studySet", JSON.stringify(updatedState));

            return updatedState;
        }
    }
});

export const { createSet, deleteSet, renameSet, sortSet, addIdentificationItems } = studySetSlice.actions;
export default studySetSlice.reducer;
