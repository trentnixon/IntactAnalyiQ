import React, { useEffect } from 'react'
import './App.scss';
import {useContext_UX_FULL} from "./Context/UX";
import DashBoard from "./Template/Dashboard"
// Components
import Loading from "../src/Pages/Loading/Loading"
import MainRoutes from "./Navigation/index"


const App =() => {
  const UX = useContext_UX_FULL();
  useEffect(()=>{ },[UX]);

  if(UX.STRAPIRECEIVED === false){ return( <Loading /> )}
  else
  return( <EntryPoint />)
   
}

export default App;


const EntryPoint = ()=>{
  return (
      <div className="App">
         <MainRoutes />
      </div>
  );
}