import MainContainer from '../components/MainContainer'
import Footer from '../components/Footer'
/* import Job from '../types/Job' */

/* import { useSelector } from "react-redux"; 
import type { RootState } from "../store/store"; // Importera types från store.ts
const {currentJobs, feedbackToUser } = useSelector((state: RootState) => state.searchJobs.value)  // TODO: counter ? 
 */
/* type HomePageProps = {
  jobs: Job[];
  feedback: string;
} */


function HomePage() {

  return (
    <>
      <MainContainer
/*         currentJobs={currentJobs}
        feedbackToUserv={feedbackToUser} */
      />
      <Footer/>
    </>
  );
}

export default HomePage;
