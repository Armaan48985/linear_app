// Assuming this is in issuesSlice.ts
'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Issue {
  id: string;
  name: string;
  type: string;
  time: Date;
}

interface IssuesState {
  issues: Issue[];
}

const initialState: IssuesState = {
  issues: [],
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      state.issues = action.payload;
    },
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload);
    },
    // Add other reducer functions if needed
  },
});

// Export the generated reducer and action creators
export const { setIssues, addIssue } = issuesSlice.actions;
export default issuesSlice.reducer;
