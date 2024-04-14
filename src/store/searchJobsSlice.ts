
//TODO:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' // För att typa action.payload i reducer-funktioner
import type SearchJobsState from '../types/SearchJobsState'
import Job from '../types/Job'


/* export type SearchJobsState = {
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
 */

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


//TODO:  Tips: använd filter-every, när samtliga ska vara uppfyllda, dvs att samtliga toggle-knappar är valda

// X-Slice med reducer-funktioner
export const searchJobsSlice = createSlice({
  name: 'searchJobs',
  initialState,  
  reducers: {

    updateAllJobs: (state, action: PayloadAction<Job[]>) => {
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
    },
    updateCurrentSkillsOperand: (state, action: PayloadAction<SearchJobsState['currentSkillsOperand']>)  => {
      state.currentSkillsOperand = action.payload
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
    });
    builder.addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
      state.allJobs = action.payload 
      state.isLoading = false; 
    });
    builder.addCase(fetchJobs.rejected, (state) => {
      state.isLoading = false;
    });
   /*  builder.addCase(filterJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(filterJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
      state.allJobs = action.payload 
      state.isLoading = false; 
    });
    builder.addCase(filterJobs.rejected, (state) => {
      state.isLoading = false;
    }); */
  },
})

// createAsyncThunk tar två argument, ett namn och en funktion som returnerar en promise
export const fetchJobs = createAsyncThunk(
  'searchJobs/filterJobs',
  async ({urlEndpoint}:{urlEndpoint: string}) => {
    const response: Response = await fetch(urlEndpoint);
    const data = await response.json();
    const newAllJobs : Job[] = data.hits
    return newAllJobs        
  }
)

/* export const filterJobs = createAsyncThunk(
  'searchJobs/filterJobs',
  async ({}:{}) => {

    const newCurrentJobs : Job[] = 
    return newCurrentJobs
  }
) */
    /* } */

    //if (allSkillsFiltersContainCurrentSkillsFilters && allLocationFiltersContainCurrentLocationFilters) {
      // Case 1:  No need to fetch new data from server => search in the current allJobs object
      
      // filter the allJobs object directly
          

      // https://jobsearch.api.jobtechdev.se/search?q=React%20JavaScript%20Vue%20Stockholm%20Uppsala
      // => sökningen verkar ge "OR"-logik mellan söktermerna inom respektive kategori (Skill respektive Location) och "AND"-logik mellan kategorierna. Toppen!
      
 







// Exporterar alla actionfunktioner 
export const { updateAllJobs, updateCurrentJobs, updateCurrentLocationFilters, updateCurrentSkillsFilters, updateCurrentSkillsOperand } = searchJobsSlice.actions
// Exporterar reducern
export default searchJobsSlice.reducer




  //  async ({ currentLocationFilters, allLocationFilters, currentSkillsFilters, allSkillsFilters, currentSkillsOperand, currentJobs, allJobs }: { currentLocationFilters: string[]; allLocationFilters: string[]; currentSkillsFilters: string[]; allSkillsFilters: string[]; currentSkillsOperand: string; currentJobs: Job[]; allJobs: Job[] }) => {
    
    /* function doesMainArrayContainAllElementsOfSubArray(mainArray: string[], subArray: string[]) {
      return subArray.every(item => mainArray.includes(item));
    }
    
    const allSkillsFiltersContainCurrentSkillsFilters = doesMainArrayContainAllElementsOfSubArray(allSkillsFilters, currentSkillsFilters)
    const allLocationFiltersContainCurrentLocationFilters = doesMainArrayContainAllElementsOfSubArray(allLocationFilters, currentLocationFilters)
    
    if (allSkillsFiltersContainCurrentSkillsFilters && allLocationFiltersContainCurrentLocationFilters) {
      return allJobs  // Case 1:  No need to fetch new data 
    } else {
      // Case 2:  Need to fetch new data (and update the allJobs object) 
      let urlEndpoint = 'https://jobsearch.api.jobtechdev.se/search?q='
      
      if(currentSkillsOperand === "OR"){
        currentSkillsFilters.map(skillsFilter => {
          urlEndpoint += `${skillsFilter}%20`
        })
        currentLocationFilters.map(locationFilter => {
          urlEndpoint += `${locationFilter}%20`
        })
        urlEndpoint  = urlEndpoint.slice(0, -3);  // excluding the last '%20' from the urlEndpoint
        // fetch data */
