import React, { useEffect, useState } from 'react'

import {useContext_SCAN_FULL} from "Context/SCAN";
import { HandleTZDate, workingDaysBetweenDates, getDate,monthDiff} from "actions/HandleUX";

// Filter
import GlobalFilter from "Pages/Auth/Components/Layout/ReviewGlobalFilter";


const HeaderTitle = ()=>{
    const SCAN = useContext_SCAN_FULL();
    const SCANMODELMETA = SCAN.SelectedModelMeta
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [WorkingDays, setWorkingDays] = useState(0) 
                 
    useEffect(()=>{
        
        monthDiff(new Date(SCAN.SelectedModelMeta.DateStart * 1000),new Date(SCAN.SelectedModelMeta.DateEnd * 1000))

        setStartDate(getDate(SCAN.SelectedModelMeta.DateStart))
        setEndDate(getDate(SCAN.SelectedModelMeta.DateEnd))
        setWorkingDays(workingDaysBetweenDates(SCAN.SelectedModelMeta.DateStart,SCAN.SelectedModelMeta.DateEnd))

    },[SCAN])
    return(
        <>
            <div className="ModelSingleHeader">
            <h2>{SCANMODELMETA.Name}</h2>
               
            </div> 
          
        </>
    )
}
//   <p>{SCANMODELMETA.Description}</p>
export default HeaderTitle;

/*
 <h4>Date Range : {startDate}  - {endDate }</h4>
                <h4>Working Days Counted : {WorkingDays}</h4>
                <h4>Months in Model : {monthDiff(new Date(SCAN.SelectedModelMeta.DateStart * 1000),new Date(SCAN.SelectedModelMeta.DateEnd * 1000))}</h4>
               
                <div className="created"><p>Created : {HandleTZDate(SCANMODELMETA.createdAt)}</p></div>
*/