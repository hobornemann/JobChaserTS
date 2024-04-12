import { configureStore } from '@reduxjs/toolkit';
import searchJobsSliceReducer from './searchJobsSlice'; 


export const store: any = configureStore({
  reducer: {
    searchJobs: searchJobsSliceReducer,
  },
});

// För typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


