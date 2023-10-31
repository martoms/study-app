import { configureStore } from '@reduxjs/toolkit';
import studySetListReducer from '../features/studySet/studySetSlice';

const store = configureStore({
    reducer: {
        studySetList: studySetListReducer
    }
});

export default store;