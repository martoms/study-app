import { configureStore } from '@reduxjs/toolkit';
import studySetListReducer from '../features/studySet/studySetSlice';
import generalStateReducer from '../features/generalState/generalStateSlice';

const store = configureStore({
    reducer: {
        studySetList: studySetListReducer,
        generalState: generalStateReducer
    }
});

export default store;