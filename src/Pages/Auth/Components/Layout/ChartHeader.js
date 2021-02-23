import React from 'react'
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
    const{ Header,Copy, Icon,filters=[]} = props
    let DisplayIcon = ChartIcon(Icon);

    return(
        <div className="ChartHeader">
            <div className="InfoIcons">
                <Tooltip title="Small Helpful tip">
                    <LiveHelpIcon  className="help"/> 
                </Tooltip>

                <Filters filters={filters}/>

                <Tooltip title="Chart is Interactive">
                    <TouchAppIcon className="interactive" />
                </Tooltip>
            </div>
            <div className="Content">
                {DisplayIcon}
                <div>
                    <H4 Copy={Header} />
                    <P Copy={Copy}/> 
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

