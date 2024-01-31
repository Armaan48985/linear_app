// reducers.js
import { combineReducers } from "redux";
import issuesReducer from "./IssueReducer";

const rootReducer = combineReducers({
  issues: issuesReducer,
  // Add other reducers here
});

export default rootReducer;
