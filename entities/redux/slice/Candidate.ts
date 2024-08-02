// src/slices/candidateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Candidate {
  last_name: string;
  first_name: string;
  id: number;
  bio: string;
  party: string;
  photo: string;
  votes_per_month: {};
  election: number;
  user: number;
}

interface CandidateState {
  data: Candidate[];
  loading: boolean;
  error: string | null;
}

const initialState: CandidateState = {
  data: [],
  loading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    fetchCandidatesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCandidatesSuccess(state, action: PayloadAction<Candidate[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchCandidatesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCandidatesStart,
  fetchCandidatesSuccess,
  fetchCandidatesFailure,
} = candidateSlice.actions;

export default candidateSlice.reducer;
