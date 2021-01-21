import React, { useEffect } from 'react';

import Footer from "./Components/Layout/Footer";

const Profile = ()=>{    
    return(
        <div className="AuthLayout">
        <div className="Header">
            <h1>Profile</h1>
            <h2>User</h2>
        </div>

        <div className="Content">
            <div>
               
               <h2>What is a Model</h2>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            <div>
                <h2>Viewing saved Models</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            <div>
                <h2>Comparing Models</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            </div>

            <Footer />
    </div>
    )
}

export default Profile;



