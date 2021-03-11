import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import {useContext_COMPARE_FULL} from "Context/COMPARE";
import {numberWithCommas, GroupArrayByOccurances} from "actions/HandleUX";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
  }));

const Title='Tier Breakdown';

const TableClusterBreakdown = ()=>{
    const classes = useStyles();
    const COMPARE = useContext_COMPARE_FULL();
    const MODELS = COMPARE.CompareData.FetchedModels;
    const extractResults=(data)=>{
        let CategoryInt=[]
        data.map((result,i)=>{ CategoryInt.push(result.scanCategory) })
        //console.log(GroupArrayByOccurances(CategoryInt))
            return GroupArrayByOccurances(CategoryInt)
    }


    useEffect(()=>{    
        //console.log(COMPARE)
    },[COMPARE])

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
                                let Breakdown = extractResults(model.STOREMARKERCENTERPOINTS);
                                return(
                                    <div key={i}>
                                        <DisplayBreakdown Breakdown={Breakdown}/>
                                    </div>
                                )
                                    
                            })
                        }
                </AccordionDetails>

            </Accordion>
            </div>

      
    )
}

export default TableClusterBreakdown;

const DisplayBreakdown = (props)=>{
    const {Breakdown} = props
    return(
        Breakdown[0].map((cat,i)=>{
            return(
                <div key={i} className="AccordionData">
                    <div>{cat}</div>
                    <div>{Breakdown[1][i]}</div>
                </div>
            )
        })
    )
}