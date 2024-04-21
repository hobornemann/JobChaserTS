import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' // För att typa action.payload i reducer-funktioner
import type SearchJobsState from '../types/SearchJobsState'
import Job from '../types/Job'


if (!localStorage.getItem("favouriteJobs")) {
  localStorage.setItem("favouriteJobs", JSON.stringify([]));
}
if (!localStorage.getItem("currentSkillsOperand")) {
  localStorage.setItem("currentSkillsOperand", JSON.stringify("OCH"));
}
if (!localStorage.getItem("currentWorkingHoursTypeLabel")) {
  localStorage.setItem("currentWorkingHoursTypeLabel", JSON.stringify("Heltid"));
}
if (!localStorage.getItem("currentSkillsFilters")) {
  localStorage.setItem("currentSkillsFilters", JSON.stringify([]));
}
if (!localStorage.getItem("currentLocationFilters")) {
  localStorage.setItem("currentLocationFilters", JSON.stringify([]));
}
if (!localStorage.getItem("maxSearchResultsChosen")) {
  localStorage.setItem("maxSearchResultsChosen", JSON.stringify(10));
}

const favouriteJobsFromLocalStorage = JSON.parse(localStorage.getItem("favouriteJobs")!);
const currentSkillsOperand = JSON.parse(localStorage.getItem("currentSkillsOperand")!);
const currentWorkingHoursTypeLabel = JSON.parse(localStorage.getItem("currentWorkingHoursTypeLabel")!);

const currentSkillsFilters = JSON.parse(localStorage.getItem("currentSkillsFilters")!);
const currentLocationFilters = JSON.parse(localStorage.getItem("currentLocationFilters")!);
const maxSearchResultsChosen = Number(JSON.parse(localStorage.getItem("maxSearchResultsChosen")!))

// Initial state
const initialState: SearchJobsState = {
  isLoading: false,
  messageToUser: 'Loading data...',
  error: "", 
  currentLocationFilters: currentLocationFilters,
  allLocationFilters: [],
  currentSkillsFilters: currentSkillsFilters,
  allSkillsFilters: [],
  currentSkillsOperand: currentSkillsOperand,
  currentWorkingHoursTypeLabel: currentWorkingHoursTypeLabel,
  currentJobs: [],
  favouriteJobs: favouriteJobsFromLocalStorage,  
  allJobs: [],
  maxSearchResultsChosen: maxSearchResultsChosen,
  numberOfHits: 0,
}




// X-Slice med reducer-funktioner
export const searchJobsSlice = createSlice({
  name: 'searchJobs',
  initialState,  
  reducers: {

    updateAllJobs: (state, action: PayloadAction<Job[]>) => {
      console.log("action.payload in updateAllJobs in slice",action.payload);
      state.allJobs = action.payload
    },
    updateCurrentJobs: (state, action: PayloadAction<Job[]>) =>{
      state.currentJobs = action.payload
    },
    updateFavouriteJobs: (state, action: PayloadAction<Job[]>) =>{
      state.favouriteJobs = action.payload
      localStorage.setItem("favouriteJobs", JSON.stringify(action.payload))
    },
    updateCurrentLocationFilters: (state, action: PayloadAction<string[]>) => {
      state.currentLocationFilters = action.payload
      localStorage.setItem("currentLocationFilters", JSON.stringify(action.payload))
      console.log("currentLocationFilters action.payload in searchJobsSlice reducer:", action.payload);
      console.log("currentLocationFilters in searchJobsSlice reducer:", state.currentLocationFilters);
    },
    updateCurrentSkillsFilters: (state, action: PayloadAction<string[]>) => {
      console.log("state.currentSkillsFilters in reducer before updating", state.currentSkillsFilters);
      state.currentSkillsFilters = action.payload
      localStorage.setItem("currentSkillsFilters", JSON.stringify(action.payload))
      console.log("currentSkillsFilters action.payload in searchJobsSlice reducer:", action.payload);
      console.log("currentSkillsFilters in searchJobsSlice reducer:", state.currentSkillsFilters);
    },
    updateCurrentSkillsOperand: (state, action: PayloadAction<SearchJobsState['currentSkillsOperand']>)  => {
      state.currentSkillsOperand = action.payload
      localStorage.setItem("currentSkillsOperand", JSON.stringify(action.payload))
      console.log("action.payload in updateCurrentSkillsOperand in searchJobsSlice:", action.payload);
      console.log("currentSkillsOperand in updateCurrentSkillsOperand in searchJobsSlice:", state.currentSkillsOperand);
    },
    updateCurrentWorkingHoursTypeLabel: (state, action: PayloadAction<string>)  => {
      state.currentWorkingHoursTypeLabel= action.payload
      localStorage.setItem("currentWorkingHoursTypeLabel", JSON.stringify(action.payload))
      console.log("action.payload in updateCurrentWorkingHoursTypeLabel in searchJobsSlice:", action.payload);
      console.log("currentWorkingHoursTypeLabel in updateCurrentWorkingHoursTypeLabel in searchJobsSlice:", state.currentWorkingHoursTypeLabel);
    },
    updateMessageToUser: (state, action: PayloadAction<string>) => {
      state.messageToUser = action.payload
    },
    clearAllCurrentFilters: (state) => {
      state.currentLocationFilters = []
      state.currentSkillsFilters = []
      state.currentSkillsOperand = "ELLER"
    },
    updateMaxSearchResultsChosen: (state, action: PayloadAction<number>) => {
      state.maxSearchResultsChosen = action.payload
    },
  },

  //  extraReducers är en reducer som kan hantera actions från andra slices eller från createAsyncThunk
  // builder är ett objekt som innehåller metoder för att lägga till case reducers
  // med addCase kan vi fånga upp olika action från den asynkrona hämtningen (pending, fulfilled, rejected)
  // https://redux-toolkit.js.org/api/createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.currentJobs = []
      state.isLoading = true;
      state.messageToUser = "Loading jobs data..."
    });
    builder.addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
      console.log("action.payload in fetchJobs.fulfilled:", action.payload);
      console.log("state.allJobs in fetchJobs.fulfilled ex ante... ",state.allJobs);
      
      state.allJobs = action.payload 
      state.isLoading = false; 
      if(state.allJobs.length === 0){
        state.messageToUser = "Sorry, there are no such jobs available."
      } else {
        state.messageToUser = ""
      }
      console.log("state.allJobs after update:", state.allJobs); 
      
      // If all filters are empty, set currentJobs to allJobs
      const stateCurrentSkillsFilters = [...state.currentSkillsFilters]  
      const stateCurrentLocationFilters = [...state.currentLocationFilters] 
      const stateCurrentSkillsOperand = state.currentSkillsOperand  // no shallow copy needed 
      console.log("stateCurrentSkillsFilters in fetchJobs reducer:",stateCurrentSkillsFilters);
      console.log("stateCurrentLocationFilters in fetchJobs reducer:",stateCurrentLocationFilters)
      console.log("stateCurrentSkillsOperand in fetchJobs-reducer: ",stateCurrentSkillsOperand);
      
      if((!stateCurrentSkillsFilters && !stateCurrentLocationFilters) || (stateCurrentSkillsOperand === "ELLER")){
        state.currentJobs = state.allJobs
        state.numberOfHits = state.allJobs.length
      } else if (stateCurrentSkillsOperand === "OCH"){

          console.log("state.currentSkillsFilters in OCH:",stateCurrentSkillsFilters);
          const newCurrentJobs: Job[] = state.allJobs.filter((job: Job) => {
            return stateCurrentSkillsFilters.every(filterValue => job.description.text?.toLowerCase()!.includes(filterValue.toLowerCase())); 
          });
          state.currentJobs = newCurrentJobs 
          state.numberOfHits = newCurrentJobs.length
      } else {
          console.log("Error: CurrentSkillsOperand is not working");
          throw new Error
      } 
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
export const { updateCurrentWorkingHoursTypeLabel, updateFavouriteJobs, updateMaxSearchResultsChosen, updateMessageToUser, updateAllJobs, updateCurrentJobs, updateCurrentLocationFilters, updateCurrentSkillsFilters, updateCurrentSkillsOperand } = searchJobsSlice.actions
// Exporterar reducern
export default searchJobsSlice.reducer



