import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    New: [],
    completed: [],
    Progress: [],
    Cancelled: [],
  },
  reducers: {
    setNewTask: (state, action) => {
      state.New = action.payload;
    },
    setCompletedTask: (state, action) => {
      state.Completed = action.payload;
    },
    setProgressTask: (state, action) => {
      state.Progress = action.payload;
    },
    setCancelledtask: (state, action) => {
      state.Cancelled = action.payload;
    },
  },
});

export const {
  setNewTask,
  setCompletedTask,
  setProgressTask,
  setCancelledtask,
} = taskSlice.actions;

export default taskSlice.reducer;
