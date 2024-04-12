// TODO:  var kommer denna ifrån? 
// import { fetchAndFilterJobsSlice } from "../store/fetchAndFilterSlice"

 type FetchAndFilterJobsState = {
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

  export default fetchAndFilterJobsState

