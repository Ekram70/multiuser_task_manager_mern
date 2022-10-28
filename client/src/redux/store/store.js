import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../state-slice/settingsSlice';
import tasksReducer from '../state-slice/taskSlice';

export default configureStore({
  reducer: {
    settings: settingsReducer,
    task: tasksReducer,
  },
});
