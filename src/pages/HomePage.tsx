import Main from '../components/Main'
import Footer from '../components/Footer'
import Job from '../components/JobsList'

type HomePageProps = {
  jobs: typeof Job[];
  feedback: string;
}


function HomePage({jobs, feedback}: HomePageProps) {

  return (
    <>
      <Main
        jobs={jobs}
        feedback={feedback}
      />
      <Footer/>
    </>
  );
}

export default HomePage;
