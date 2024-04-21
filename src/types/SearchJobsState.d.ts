

import LogicOperand from "./LogicOperand"

 type SearchJobsState = {
    isLoading: boolean
    messageToUser: string
    error: string 
    currentLocationFilters: string[]
    allLocationFilters: string[]
    currentSkillsFilters: string[]
    allSkillsFilters: string[]
    currentSkillsOperand: LogicOperand
    currentJobs: Job[]
    favouriteJobs: Job[]
    allJobs: Job[]
    maxSearchResultsChosen: number
    numberOfHits: number
  }

  export default SearchJobsState

