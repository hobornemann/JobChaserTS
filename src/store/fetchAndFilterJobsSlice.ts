
//TODO:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' // För att typa action.payload i reducer-funktioner
//import type FetchAndFilterJobsState from '../types/FetchAndFilterJobsState'

export type FetchAndFilterJobsState = {
  isLoading: boolean
  messageToUser: string
  error: string 
  currentLocationFilters: string[]
  allLocationFilters: string[]
  currentSkillsFilters: string[]
  allSkillsFilters: string[]
  skillsOperand: "AND" | "OR"
  currentJobs: []
  allJobs: []
}


// Initial state
const initialState: FetchAndFilterJobsState = {
  isLoading: false,
  messageToUser: 'Loading data...',
  error: "", 
  currentLocationFilters: [],
  allLocationFilters: [],
  currentSkillsFilters: [],
  allSkillsFilters: [],
  skillsOperand: "OR",
  currentJobs: [],
  allJobs: [],
}


//TODO:  Tips: använd filter-every, när samtliga ska vara uppfyllda, dvs att samtliga toggle-knappar är valda

// X-Slice med reducer-funktioner
export const fetchAndFilterJobsSlice = createSlice({
  name: 'fetchAndFilterJobs',
  initialState,  
  reducers: {

    addLocationFilter: (state, action: PayloadAction<string>) => {
      
    },
    removeLocationFilter: (state, action: PayloadAction<string>) => {
      
    },
    addSkillsFilter: (state, action: PayloadAction<string>) => {
      
    },
    removeSkillsFilter: (state, action: PayloadAction<string>) => {
      
    },
    updateSkillsOperand: (state, action: PayloadAction<FetchAndFilterJobsState['skillsOperand']>)  => {

    },
    clearAllFilters: (state, action: PayloadAction<string>) => {

    },
  },

  //  extraReducers är en reducer som kan hantera actions från andra slices eller från createAsyncThunk
  // builder är en objekt som innehåller metoder för att lägga till case reducers
  // med addCase kan vi fånga upp olika action från den asynkrona hämtningen (pending, fulfilled, rejected)
  // https://redux-toolkit.js.org/api/createAsyncThunk
  extraReducers: (builder) => {
    builder.addCase(searchJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchJobs.fulfilled, (state, action: PayloadAction<string>) => {
      /* state.balance += action.payload; */
      // action.
      state.isLoading = false; 
    });
    builder.addCase(searchJobs.rejected, (state) => {
      state.isLoading = false;
    });
  },
})

// createAsyncThunk tar två argument, ett namn och en funktion som returnerar en promise
export const searchJobs = createAsyncThunk(
  'fetchAndFilterJobs/searchJobs',
  async ({ currentLocationFilters, allLocationFilters, currentSkillsFilters, allSkillsFilters }: { currentLocationFilters: string[]; allLocationFilters: string[]; currentSkillsFilters: string[]; allSkillsFilters: string[] }) => {
    
    function doesMainArrayContainAllElementsOfSubArray(mainArray: string[], subArray: string[]) {
      return subArray.every(item => mainArray.includes(item));
    }
    
    let urlEndpoint = 'https://jobsearch.api.jobtechdev.se/search?q='
    const allSkillsFiltersContainCurrentSkillsFilters = doesMainArrayContainAllElementsOfSubArray(allSkillsFilters, currentSkillsFilters)
    const allLocationFiltersContainCurrentLocationFilters = doesMainArrayContainAllElementsOfSubArray(allLocationFilters, currentLocationFilters)
    
    if (allSkillsFiltersContainCurrentSkillsFilters && allLocationFiltersContainCurrentLocationFilters) {
      // filter allJobs object 
      const currentJobs = allJobs //.filter
      return currentJobs
      
      
    } else {
      // 

      urlEndpoint = `${urlEndpoint}`


      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      const data = await response.json();
      return data.rates.USD;
    }
  }
);




// Exporterar alla actionfunktioner 
export const { addLocationFilters, removeLocationFilters, addSkillsFilters, removeSkillsFilters, updateSkillsOperand, clearAllFilters } = fetchAndFilterJobsSlice.actions
// Exporterar reducern
export default fetchAndFilterJobsSlice.reducer

