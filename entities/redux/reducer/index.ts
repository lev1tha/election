// src/reducers/index.ts
import { combineReducers } from "@reduxjs/toolkit";
import candidateReducer from "../slice/Candidate";
import selectedCandidateReducer from "../slice/SelectCandidate";

const rootReducer = combineReducers({
  candidate: candidateReducer,
  selectedCandidate: selectedCandidateReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
