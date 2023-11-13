import { createSlice } from "@reduxjs/toolkit";

const storedState = JSON.parse(localStorage.getItem("generalState"));

const initialState = storedState ? storedState : {
    addItems: false,
    itemType: '',
    whatToDelete: '',
    studyModes: []
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
        },
        studyMode: (state, action) => {
            const { timeStamp, mode } = action.payload;

            let updatedState;
            let updatedStudyModes;

            // checks whether or not there is already a studyMode object for the current study set
            const existingStudyMode = Boolean(state.studyModes.filter(set => set.timeStamp === timeStamp).length);

            if (!existingStudyMode) {
                // if there is none yet, the object is simply added to the studyModes array
                updatedState = {...state, studyModes: [...state.studyModes, action.payload]}
            } else {
                // if there is already an existing object, the current one shall be updated
                updatedStudyModes = state.studyModes.map(set => {
                    if (set.timeStamp === timeStamp) {
                        return {...set, mode }
                    }
                    return set
                })

                updatedState = { ...state, studyModes: updatedStudyModes }
            }

            localStorage.setItem("generalState", JSON.stringify(updatedState));

            return updatedState
            
        }
    }
});

export const { addItems, itemType, whatToDelete, studyMode } = generalStateSlice.actions;
export default generalStateSlice.reducer;