import { configureStore } from '@reduxjs/toolkit';
import fetchAndFilterJobsSliceReducer from './fetchAndFilterJobsSlice'; 


export const store: any = configureStore({
  reducer: {
    fetchAndFilterJobs: fetchAndFilterJobsSliceReducer,
  },
});

// För typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


