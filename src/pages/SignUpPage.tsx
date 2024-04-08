import SignUpForm from '../components/SignUpForm';
import Footer from '../components/Footer';

export default SignUpPage;


function SignUpPage() {
  
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
      <Footer/>
    </div>
  );
}



// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
/*   const auth = getAuth();
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    }); */