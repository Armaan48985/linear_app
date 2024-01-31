"use client";
import {configureStore} from '@reduxjs/toolkit'
import issuesReducer from './IssueReducer';


export const store = configureStore({
    reducer: {
        issue: issuesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;