// src/slices/selectedCandidateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedCandidateState {
  id: number | null;
}

const initialState: SelectedCandidateState = {
  id: null,
};

const selectedCandidateSlice = createSlice({
  name: "selectedCandidate",
  initialState,
  reducers: {
    setSelectedCandidate(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
  },
});

export const { setSelectedCandidate } = selectedCandidateSlice.actions;
export default selectedCandidateSlice.reducer;