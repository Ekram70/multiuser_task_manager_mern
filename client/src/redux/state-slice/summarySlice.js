import { createSlice } from '@reduxjs/toolkit';

const summarySlice = createSlice({
  name: 'summary',
  initialState: {
    value: [],
  },
  reducers: {
    setSummary: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSummary } = summarySlice.actions;
export default summarySlice.reducer;
