import 'date-fns';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useContext_SCAN_FULL} from "../../../Context/SCAN";


import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import {FetchSelectedItems} from "../../../actions/HandleScanProcess";
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



/* Handle Scna Form*/
export default function CreateNewScanForm() {
  return (<ScanForm />);
}








const Processing = ()=>{
   
    return(
        <>
            processing
        </>
    )
}

/*
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
*/




const ScanForm = ()=>{
    
    const SCAN = useContext_SCAN_FULL();
    const USERSCAN = SCAN.UserScanState;


    const classes = useStyles();
    const [TITLE, setTITLE] = useState('')
    const [DESCRIPTION, setDESCRIPTION] = useState('')
    const[Start, setStart] = useState()
    const[End, setEnd] = useState()

    const handleClick=()=>{
        FetchSelectedItems(USERSCAN.UserScanSingleDataSets, TITLE, DESCRIPTION, Start, End)
    }

    const handleTitle=(e)=>{setTITLE(e.target.value)}
    const handleDescription=(e)=>{setDESCRIPTION(e.target.value)}
    const SetStartDate=(START)=>{
        setStart(new Date(`${START}`).getTime() / 1000)
    }
    const SetEndDate=(END)=>{
        setEnd(new Date(`${END}`).getTime() / 1000)
    }
    
    return(
        <div className="LoginContainer">
            {Start}{End}
            <MaterialUIPickers  SetEndDate={SetEndDate} SetStartDate={SetStartDate}/>

            <TextField 
                id="outlined-basic" 
                label="Model Name" 
                variant="outlined" 
                onChange={handleTitle}
            />
            
            <TextField
                id="outlined-multiline-static"
                label="Model Description"
                multiline
                rows={6}
                onChange={handleDescription}
                variant="outlined"
                />

            
            <Button variant="contained" onClick={()=>{handleClick()} } className="CreateModel">
                Create Model
            </Button>
                
        </div>
        )
}



function MaterialUIPickers(props) {
    const{SetStartDate, SetEndDate} = props
    // The first commit of Material-UI
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  
    const handleDateChange = (date) => {
        setSelectedStartDate(date);
      SetStartDate(date)
     
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    
        SetEndDate(date)
      };
  
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Start Date"
            format="MM/dd/yyyy"
            value={selectedStartDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="End Date"
            format="MM/dd/yyyy"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
      </MuiPickersUtilsProvider>
    );
  }
  