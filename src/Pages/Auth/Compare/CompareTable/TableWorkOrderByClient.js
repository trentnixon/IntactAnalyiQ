import React, {useEffect} from 'react'
import {useContext_COMPARE_FULL} from "Context/COMPARE";

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {numberWithCommas} from "actions/HandleUX";
import {findClientName} from "actions/ClusterAnalysis";
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
  }));

const Title='Work Orders by Client';

const WorkordersByClient = ()=>{
    const classes = useStyles();
    const COMPARE = useContext_COMPARE_FULL();
    const MODELS = COMPARE.CompareData.FetchedModels;

    useEffect(()=>{ },[COMPARE])

    return(
        <div className={classes.root}>
        <Accordion className="ComparisonAccordion">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                {Title}
            </AccordionSummary>

            <AccordionDetails className="ComparisonRow">
                <div>&nbsp;</div>
                   

                    {
                        MODELS.map((model,i)=>{
                           
                            return(
                                <div key={i}>
                                    <DisplayBreakdown Breakdown={model.CLUSTERSTATS.ByClient}/>
                                </div>
                            )
                                
                        })
                    }
            </AccordionDetails>

        </Accordion>
        </div>
    )
} 
export default WorkordersByClient;


const DisplayBreakdown = (props)=>{
    const {Breakdown} = props
    return(
        <>
        {
            Object.keys(Breakdown).map(function(key, i) {
                return(
                    <div key={i} className="AccordionData">
                            <div>{findClientName(key)}</div>
                            <div>{numberWithCommas(Breakdown[key])} </div>
                    </div>
                    )
              })        
        }
        </>       
    )
}