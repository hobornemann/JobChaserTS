import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
//import {User} from 'firebase/auth'
import { AuthContext } from './contexts/AuthContext';

import HomePage from './pages/HomePage'; 
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard'

import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import './App.css'

import Header from './components/Header';



function ProtectedRoute() {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext && authContext.user !== null;
  console.log("isAuthenticated", isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}


function App(): JSX.Element {

  const authContext = useContext(AuthContext);
  console.log("authContext: ", authContext);
  const isAuthenticated = authContext && authContext.user !== null;
  console.log("isAuthenticated", isAuthenticated)


  function handleSignOut():void {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        // Additional actions after sign out, such as redirecting to another page  TODO:
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

    /* const dispatch = useDispatch(); */

    /* useEffect(() => {
      const fetchData = () => {
        try {
          dispatch(fetchJobs('https://jobsearch.api.jobtechdev.se/search?q=?limit=20'));
          
          // Handle the dispatched action
          if (fetchJobs.fulfilled.match(action)) {
            // The fetchJobs async thunk has been fulfilled
            const newAllJobs = action.payload; // Extract the payload
            dispatch(updateAllJobs(newAllJobs));
          } else if (fetchJobs.rejected.match(action)) {
            // The fetchJobs async thunk has been rejected
            const error = action.error; // Extract the error
            console.error('Error fetching data:', error);
          }
        } catch (error) {
          console.error('Error dispatching action:', error);
        }
      };
  
      // Call the fetchData function when the component mounts
      fetchData();
    // Specify an empty dependency array to ensure the effect only runs once when the component mounts
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
 */

  return (
    <BrowserRouter>
      <Header
        onSignOut={handleSignOut}
      /> 
      <Routes>
          <Route path="/" element={<HomePage />}/>  
          <Route path="/*" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/signin" element={<SignInPage/>}/>
          <Route path="/dashboard" element={<ProtectedRoute/>}>
              <Route path="/dashboard" element={<Dashboard/>}/> 
          </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App


