import React  from 'react'

import ChartHeader from "Pages/Auth/Components/Layout/ChartHeader";
import NivoNetwork from "venders/Nivo/NivoNetwork"

const Chart1={
    Icon:'radial',
    Header:"Location Network",
    Tip:"Use the Filters",
    filters:[''],
    Copy:"The Node Network shows the relationships clusters have to there parent item. This diagram should provide a visual clue to cluster concentration"
}

const LocationsNetwork = ()=>{

    return( 
        <>
            <ChartHeader Icon={Chart1.Icon} Header={Chart1.Header}  Copy={Chart1.Copy} Tip={Chart1.Tip} />
            <div style={{height: 400, width:'100%'}}><NivoNetwork /></div>
        </>
    )

}

export default LocationsNetwork; 