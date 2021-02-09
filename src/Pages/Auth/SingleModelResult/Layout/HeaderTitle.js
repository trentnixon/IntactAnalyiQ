import React, { useEffect, useState } from 'react'

import {useContext_SCAN_FULL} from "Context/SCAN";
import { HandleTZDate, workingDaysBetweenDates, getDate} from "actions/HandleUX";

// Filter
import GlobalFilter from "Pages/Auth/Components/Layout/ReviewGlobalFilter";


const HeaderTitle = ()=>{
    const SCAN = useContext_SCAN_FULL();
    const SCANMODELMETA = SCAN.SelectedModelMeta
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [WorkingDays, setWorkingDays] = useState(0)
                 

    useEffect(()=>{
        
        setStartDate(getDate(SCAN.SelectedModelMeta.DateStart))
        setEndDate(getDate(SCAN.SelectedModelMeta.DateEnd))
        setWorkingDays(workingDaysBetweenDates(SCAN.SelectedModelMeta.DateStart,SCAN.SelectedModelMeta.DateEnd))

    },[SCAN])
    return(
        <>
          
        <div className="ModelSingleHeader">
                
                <h2>Model : {SCANMODELMETA.Name}</h2>
                <h4>Date Range : {startDate}  - {endDate }</h4>
                <h4>Working Days Counted : {WorkingDays}</h4>
                <p>{SCANMODELMETA.Description}</p>
                <div className="created"><p>Created : {HandleTZDate(SCANMODELMETA.createdAt)}</p></div>
               
        </div> 
        <GlobalFilter />
        </>
    )
}

export default HeaderTitle;

