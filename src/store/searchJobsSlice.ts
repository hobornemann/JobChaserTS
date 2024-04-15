
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' // För att typa action.payload i reducer-funktioner
import type SearchJobsState from '../types/SearchJobsState'
import Job from '../types/Job'
import type { RootState, AppDispatch } from "../store/store"; // Importera types från store.ts
import { useSelector, useDispatch } from "react-redux"; // Redux hooks för att använda globala state och dispatcha actions

  // Redux - dispatch för att dispatcha actions
  //const dispatch = useDispatch<AppDispatch>();

// Initial state
const initialState: SearchJobsState = {
  isLoading: false,
  messageToUser: 'Loading data...',
  error: "", 
  currentLocationFilters: [],
  allLocationFilters: [],
  currentSkillsFilters: [],
  allSkillsFilters: [],
  currentSkillsOperand: "OR",
  currentJobs: [],
  allJobs: [],
}



// X-Slice med reducer-funktioner
export const searchJobsSlice = createSlice({
  name: 'searchJobs',
  initialState,  
  reducers: {

    updateAllJobs: (state, action: PayloadAction<Job[]>) => {
      //console.log("action.payload in updateAllJobs in slice",action.payload);
      state.allJobs = action.payload
    },
    updateCurrentJobs: (state, action: PayloadAction<Job[]>) =>{
      state.currentJobs = action.payload
    },
    updateCurrentLocationFilters: (state, action: PayloadAction<string[]>) => {
      state.currentLocationFilters = action.payload
    },
    updateCurrentSkillsFilters: (state, action: PayloadAction<string[]>) => {
      state.currentSkillsFilters = action.payload
      console.log("currentSkillsFilters in searchJobsSlice:", state.currentSkillsFilters);
    },
    updateCurrentSkillsOperand: (state, action: PayloadAction<SearchJobsState['currentSkillsOperand']>)  => {
      state.currentSkillsOperand = action.payload
      console.log("currentSkillsOperand in searchJobsSlice:", state.currentSkillsOperand);
    },
    updateMessageToUser: (state, action: PayloadAction<string>) => {
      state.messageToUser = action.payload
    },
    clearAllCurrentFilters: (state) => {
      state.currentLocationFilters = []
      state.currentSkillsFilters = []
      state.currentSkillsOperand = "OR"
    },
  },

  //  extraReducers är en reducer som kan hantera actions från andra slices eller från createAsyncThunk
  // builder är ett objekt som innehåller metoder för att lägga till case reducers
  // med addCase kan vi fånga upp olika action från den asynkrona hämtningen (pending, fulfilled, rejected)
  // https://redux-toolkit.js.org/api/createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.isLoading = true;
      state.messageToUser = "Loading jobs data..."
    });
    builder.addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
      console.log("action.payload in fetchJobs.fulfilled:", action.payload);
      
      console.log("state.allJobs in fetchJobs.fulfilled ex ante... ",state.allJobs);
      console.log("typeof state.allJobs:",typeof state.allJobs)
      console.log("typeof action.payload:",typeof action.payload);
      
      state.allJobs = action.payload 
      state.isLoading = false; 
      if(state.allJobs.length === 0){
        state.messageToUser = "Sorry, there are no such jobs available."
      } else {
        state.messageToUser = ""
      }
      console.log("state.allJobs after update:", state.allJobs); 
      state.currentJobs = state.allJobs
      console.log("state.currentJobs after update:", state.currentJobs);
      
    });
    builder.addCase(fetchJobs.rejected, (state) => {
      state.isLoading = false;
      state.messageToUser = "The jobs list cannot be loaded. Please try again later."
      console.error('Error fetching jobs');
    });
  },
})


// createAsyncThunk tar två argument, ett namn och en funktion som returnerar en promise
export const fetchJobs = createAsyncThunk(
  'searchJobs/fetchJobs',
  async (urlEndpoint: string) => {
    // async ({urlEndpoint}:{urlEndpoint: string}) => {
    const response: Response = await fetch(urlEndpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    } else {
      const data = await response.json();
      console.log("data.hits in fetchJobs function:",data.hits);
      const fetchedJobs: Job[] = data.hits
      return fetchedJobs
    }
  }
)



// Exporterar alla actionfunktioner 
export const { updateMessageToUser, updateAllJobs, updateCurrentJobs, updateCurrentLocationFilters, updateCurrentSkillsFilters, updateCurrentSkillsOperand } = searchJobsSlice.actions
// Exporterar reducern
export default searchJobsSlice.reducer



