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

            localStorage.setItem("studySet", JSON.stringify(updatedState));

            return updatedState;
        },
        deleteSet: (state, action) => {
            
            const setsToDelete = action.payload.map(setName => setName.toString());

            const updatedState = state.filter(set => !setsToDelete.includes(set.setName));

            localStorage.setItem("studySet", JSON.stringify(updatedState));

            return updatedState;
        },
        deleteItems: (state, action) => {

            const { selection, timeStamp } = action.payload;

            const updatedState = state.map(set => {
                if (set.createdOn === Number(timeStamp)) {

                    const updatedSet = set.items.filter(item =>
                        !selection.includes(String(item.createdOn))
                    );
        
                    return { ...set, items: updatedSet };
                }
                return set;
            });


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
                if (set.createdOn === Number(currentSet)) {
                    return {
                        ...set,
                        items: [...set.items, ...newItems]
                    }
                }
                return set;
            });

            localStorage.setItem("studySet", JSON.stringify(updatedState));

            return updatedState;
        },
        addStudyData: (state, action) => {
            const studyData = action.payload;
            const timeStamp = studyData.timeStamp;

            const updatedState = state.map(set => {
                if (set.createdOn === Number(timeStamp)) {
                    if (!set.studyData) {
                        return {
                            ...set,
                            studyData: [studyData]
                        }
                    } else {
                        return {
                            ...set,
                            studyData: [...set.studyData, studyData]
                        }
                    }
                }
                return set;
            })

            localStorage.setItem("studySet", JSON.stringify(updatedState));

            return updatedState;
        },
        editSingleIdentificationItem: (state, action) => {
            const { item, editedItemObj, currentSet } = action.payload;

            const updatedState = state.map(set => {
                if (set.createdOn === Number(currentSet)) {
                    const updatedItems = set.items.map(i => {
                        if (i.createdOn === Number(item)) {
                            return editedItemObj; 
                        }
                        return i;
                    });

                    return { ...set, items: updatedItems };
                }

                return set;
            });

            localStorage.setItem("studySet", JSON.stringify(updatedState));

            return updatedState;
        },
        editMultipleIdentificationItem: (state, action) => {
            const {
                selection,
                updatedItems,
                currentSet
            } = action.payload;

            const updatedState = state.map(set => {
                if (set.createdOn === Number(currentSet)) {
                    const updatedItemsData = set.items.map(i => {
                        for (let j = 0; j < selection.length; j++) {
                            if (i.createdOn === selection[j]) {
                                return updatedItems[j];
                            }
                        }
                        return i;
                    });
                    return {...set, items: updatedItemsData}
                }
                return set;
            });

            localStorage.setItem("studySet", JSON.stringify(updatedState));

            return updatedState;

        }
    }
});

export const {
    createSet,
    deleteSet,
    deleteItems,
    renameSet,
    sortSet,
    addIdentificationItems,
    addStudyData,
    editSingleIdentificationItem,
    editMultipleIdentificationItem
} = studySetSlice.actions;
export default studySetSlice.reducer;
