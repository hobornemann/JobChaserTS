import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
//import {User} from 'firebase/auth'
import { AuthContext } from './contexts/AuthContext';

import HomePage from './pages/HomePage'; 
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import FavouritesPage from './pages/FavouritesPage'

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
          <Route path="/favourites" element={<ProtectedRoute/>}>
              <Route path="/favourites" element={<FavouritesPage/>}/> 
          </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App


