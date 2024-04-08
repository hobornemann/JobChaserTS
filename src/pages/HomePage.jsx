import Main from '../components/Main'
import Footer from '../components/Footer'

export default HomePage;


function HomePage({jobs, feedback}) {

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

