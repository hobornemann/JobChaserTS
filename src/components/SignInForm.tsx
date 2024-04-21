import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config"


type SignInFormData = {
  email: string;
  password: string;
};


function SignInForm(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>();

  const formSubmit: SubmitHandler<SignInFormData> = (data) => {

    console.log("Form Submitted: ", data);
    const {email, password} = data

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("User signed in: ", user);
        navigate("/favourites");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error when signing in: ", errorMessage, errorCode)
    });
  };


  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
              }
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
  
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password:</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              }
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>
  
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Log in
        </button>
      </form>
  
      <Link to="/signup" className="block mt-4 text-sm text-blue-500 hover:text-blue-700">Don't have an account? Sign Up</Link>
    </>
  );

}


export default SignInForm;

