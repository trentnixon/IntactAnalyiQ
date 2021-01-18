import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// COmponents
import ClusterSites from "./MoreInfoComponents/ListSites"
import ClusterTradeTypes from "./MoreInfoComponents/ListTradeTypes";


import Piechart from "../../../../../venders/apexCharts/SimplePie"
import BarChart from "../../../../../venders/apexCharts/BarChart"



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const MoreInfo = (props)=>{

    const {result} = props
    const classes = useStyles();

    useEffect(()=>{
        //console.log(result)
    },[result])


    return (
        <div className={classes.root}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="MoreInfoCTA"
            >
              <h3>Additional Cluster Information</h3>
            </AccordionSummary>
            

            <AccordionDetails>
                <div className="ListtheData">
                     <ClusterSites Data={result.Sites}/>
                     <ClusterTradeTypes Data={result}/>
                </div>
              
                <div className="ResultCharts">
                    <div>
                        <h3>Occurances of Job type in cluster</h3>
                        <Piechart Data={result.Charts.JobTypeName}/>
                    </div>
                    <div>
                        <h3>Work orders by Trade Type</h3>
                        <Piechart Data={result.Charts.TradeType}/>
                    </div>
                    <div>
                        <h3>Job type totals over the year</h3>
                        <BarChart Data={result.Charts.JobTypeWorkOrderCount}/>
                    </div>
                </div>
            </AccordionDetails>
          </Accordion>
        </div>
      );
}
export default MoreInfo;