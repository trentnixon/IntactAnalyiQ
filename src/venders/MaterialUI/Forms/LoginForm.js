import React, { useEffect, useState } from 'react';
import {useContext_AUTH_FULL} from "../../../Context/AUTH";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {StrapiAuth} from "../../../actions/authUser";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
    const AUTH = useContext_AUTH_FULL();




    useEffect(()=>{},[AUTH])
  return (
        <>
            {
                AUTH.process ? <Processing />:<LoginForm />
            }
        </>
  );
}


const Processing = ()=>{
   
    return(
        <>
            processing
        </>
    )
}

const Error = ()=>{
    const AUTH = useContext_AUTH_FULL();
    const ErrorTrue='There was an Error in the Username or Password when processing your details'
    const ErrorFalse=''
    useEffect(()=>{},[AUTH])
    return(
        <>{
            AUTH.error ? <h3>{ErrorTrue}</h3>:<h3>{ErrorFalse}</h3>
            }
           
        </>
    )
}

const LoginForm = ()=>{
    const classes = useStyles();
    const [USERNAME, setUsername] = useState('')
    const [PASSWORD, setPassword] = useState('')

    const handleClick=()=>{

        StrapiAuth(USERNAME,PASSWORD)
    }

    const handleEmail=(e)=>{setUsername(e.target.value)}
    const handlePassword=(e)=>{setPassword(e.target.value)}

    return(
        <div className="LoginContainer">
            <Error />
            <TextField 
                id="outlined-basic" 
                label="e-mail" 
                variant="outlined" 
                onChange={handleEmail}
            />
            <TextField
                id="standard-password-input"
                label="password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={handlePassword}
            />
            <button onClick={()=>{handleClick()}}>Login</button>
                
        </div>
        )
}

/*

<TextField id="standard-basic" label="Standard" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
*/