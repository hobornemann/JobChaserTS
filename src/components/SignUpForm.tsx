import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import  {createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from '../../firebase.config'


export default SignUpForm;

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
}


function SignUpForm(): JSX.Element {

  const navigate = useNavigate()

  // destructure useForm() into single props
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignUpFormData>();


  const formSubmit: SubmitHandler<SignUpFormData>  = (data) => {
    console.log("Form Submitted: ", data);
    const {email, password} = data
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Signed up 
      // .then((userCredential) => {
      //const user = userCredential.user;
      // Redirect to a new page after successful form submission
      navigate("/signin")
    })
    .catch((error) => {
  /*     const errorCode = error.code;
      const errorMessage = error.message; */
      console.error("Error creating user:", error);
    });
  };

  const formError: SubmitErrorHandler<SignUpFormData> = (errors, e) => {
    console.error('Form Error:', errors, e);
  };

  return (
    <form onSubmit={handleSubmit(formSubmit, formError)} className="max-w-sm mx-auto">
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
  
      <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2">Confirm Password:</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match"
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
      </div>
  
      <button type="submit" className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Register
      </button>
      <div>
        <Link to="/signin" className="block mt-4 text-sm text-blue-500 hover:text-blue-700">Already have an account? Sign In</Link>
      </div>
    </form>
  );

  

  /* 

  return (
    <form onSubmit={handleSubmit(formSubmit)} >
      <div>
        <label htmlFor="email">Email:</label>
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
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
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
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match"
          })}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>
      <button type="submit">Register</button>
      <Link to="/signin">Already have an account? Sign In</Link>
    </form>
  ); */
}

