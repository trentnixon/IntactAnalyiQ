import React from 'react'
import {useContext_COMMS_FULL} from 'Context/COMMS'

// Icons
import PieChartIcon from '@material-ui/icons/PieChart';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import MapIcon from '@material-ui/icons/Map';
import FilterListIcon from '@material-ui/icons/FilterList';
import {ChartIcon} from 'actions/HandleUX';


import FaceIcon from '@material-ui/icons/Face';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import LayersIcon from '@material-ui/icons/Layers';


import {H4, P} from "Pages/Auth/Components/Type";
import Tooltip from '@material-ui/core/Tooltip';
const ChartHeader=(props)=>{
    const{ Section, Chart, Meta} = props

    const CHARTSETUP = useContext_COMMS_FULL().ChartSetup
    const CHARTMETA = useContext_COMMS_FULL().ChartMeta

    let DisplayIcon = ChartIcon(CHARTSETUP[Chart].icon);
    
    return(
        <div className="ChartHeader">
            <div className="InfoIcons">
                <Tooltip title={CHARTSETUP[Chart].tip}>
                    <LiveHelpIcon  className="help"/> 
                </Tooltip>

                <Filters filters={CHARTMETA[Section][Meta].Filters}/>

                <Tooltip title="Chart is Interactive">
                    <TouchAppIcon className="interactive" />
                </Tooltip>
            </div>
            <div className="Content">
                {DisplayIcon}
                <div>
                    <H4 Copy={CHARTMETA[Section][Meta].title} />
                    <P Copy={CHARTMETA[Section][Meta].Description}/> 
                </div>
                
            </div>
        </div>
    )
}

export default ChartHeader;

const Filters = (props)=>{
    const {filters} = props
    const Chips={
        cluster:<Tooltip title="Chart can be affected by Cluster  Filter"><LocationCityIcon className="warning"/></Tooltip>,
        resource:<Tooltip title="Chart can be affected by Resource Filter"><FaceIcon className="warning"/></Tooltip>,
        client:<Tooltip title="Chart can be affected by Client Filter"><PeopleAltIcon className="warning"/></Tooltip>
    }

    return(
        <>
            {
                filters.map((filter,i)=>{
                    return(
                        <> { Chips[filter]} </>
                    )
                })
            }
        </>      
    )
}

