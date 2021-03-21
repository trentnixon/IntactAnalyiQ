import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Context
import {useContext_COMPARE_FULL} from "Context/COMPARE";
import {useContext_UX_FULL} from "Context/UX";
import {useContext_SCAN_FULL} from "Context/SCAN";
import{FetchSingleScanResult} from "actions/authUser"
import {SetFilterModel, ChartIcon} from "actions/HandleUX";

import DiagramContainer from "Pages/Auth/Components/Layout/DiagramContainer"

import Tooltip from '@material-ui/core/Tooltip';

// Select Inpout
import ModelSelect from 'Pages/Auth/Components/selects/SelectCompareModel'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const SectionCharts = (props)=>{
    const {Charts} = props
    const SCAN = useContext_SCAN_FULL()
    const MODEL = useContext_COMPARE_FULL()
    
    const [Selected, setSelected] = useState(0)


    const handleClick=(i)=>{
        setSelected(i)
    }
    useEffect(()=>{
        
        if(SCAN.SelectedModel === null){
            FetchSingleScanResult(MODEL.CompareData.UserSelected[0].id, MODEL.CompareData.UserSelected[0])
            SetFilterModel(MODEL.CompareData.UserSelected[0].id)
        }
    },[])

    return( 
        <>
        <DiagramContainer>
           <div className="SectionChart"> 

                <div className="Options">
                     
                    <ul className="SelectAChart">
                        {
                            Charts.map((chart,i)=>{
                                
                                return(
                                    <li onClick={()=>{handleClick(i)}} className={Selected===i ?'selected':'notselected'} key={i}>
                                            <Tooltip title={chart.tip}>
                                                {ChartIcon(chart.icon)} 
                                            </Tooltip>
                                            <h3>{chart.label}</h3>
                                    </li>
                                )
                            }) 
                        }
                    </ul>
                  
                </div>

                <div>
                        {
                            SCAN.SelectedModel !== null ?  Charts[Selected].chart : false
                        }
                </div>
            </div>

            

        </DiagramContainer>
        <ViewSites />
        </>
    )
}

export default SectionCharts;
//  <ModelSelect />

const ViewSites = ()=>{
    const SITES = useContext_UX_FULL().ClusterParameters.SelectedCluster.StripedSites
    useEffect(()=>{
        console.log(SITES)
    },[])
    return(
        <DiagramContainer>
           
            <ul className="clusterList">
            <li className="Header">
                <div>Address</div>
                <div>Scope Status</div>
                <div>Work Orders</div>
               <div></div>
              
                
                
                
            </li>
                {
                    SITES.map((site,i)=>{
                        return(
                            <li>
                                <div>{site.name}</div>
                                <div>{site.ScopeStatus}</div>
                                <div>{site.SumWorkOrder}</div>
                                <div>View Site</div>
                                
                            </li>
                        )
                    })
                }
            </ul>
        </DiagramContainer>
    )
}