import React, { useEffect } from 'react';
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import {useContext_AUTH_FULL} from "Context/AUTH";
import Footer from "./Components/Layout/Footer";
import Auth from 'Pages/Auth';

const Profile = ()=>{    
    const UX = useContext_UX_FULL();
    const SCAN = useContext_SCAN_FULL();
    const AUTH = useContext_AUTH_FULL()
    useEffect(()=>{
        console.log(AUTH)
    },[AUTH])

    return(
    <>
        <div className="OuterContainer">
            <div className="InnerFrame">
            
                <div className="Content">
                    <ArticleContainer title={`Disclaimer!!`}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </ArticleContainer>
                    <ArticleContainer title={`About AnalytiQ`}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </ArticleContainer>
                    <ArticleContainer title={`What is a Model`}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </ArticleContainer>
                    <ArticleContainer title={`Viewing saved Models`}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </ArticleContainer>
                    <ArticleContainer title={`Comparing Models`}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </ArticleContainer>
                   
                </div>
                
               
            </div>
            <div className="SideBarRight">
                <h2>User : {AUTH.user.username}</h2>
             
            </div>
           
        </div>
        <Footer />
        </>
    )
}

export default Profile;

const ArticleContainer = (props)=>{
    const{title} = props
    return(
        <div className="ArticleContainer">
            <h2>{title}</h2>
        <div>
            {props.children}
        </div>
        </div>
    )
}



