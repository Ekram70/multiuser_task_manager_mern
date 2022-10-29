import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../state-slice/profileSlice';
import settingsReducer from '../state-slice/settingsSlice';
import summaryReducer from '../state-slice/summarySlice';
import tasksReducer from '../state-slice/taskSlice';

export default configureStore({
  reducer: {
    settings: settingsReducer,
    task: tasksReducer,
    summary: summaryReducer,
    profile: profileReducer,
  },
});
