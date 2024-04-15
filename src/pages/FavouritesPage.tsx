import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthContext'

import { useContext } from 'react';


const authContext = useContext(AuthContext);
const isAuthenticated = authContext && authContext.user !== null;
console.log(isAuthenticated);


function FavouritesPage() {

    return (
        <div>
            <h1>Favourites</h1>
            
            <Footer/>
        </div>
    )
}
    
export default FavouritesPage