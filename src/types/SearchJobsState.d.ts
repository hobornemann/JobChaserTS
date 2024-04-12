// TODO:  var kommer denna ifrån? 
// import { searchJobsSlice } from "../store/searchJobsSlice"

 type searchJobsState = {
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

  export default searchJobsState

