import React, { useEffect, useState } from 'react'
import Piechart from "../../../../../venders/apexCharts/SimplePie"
const ClusterTradeTypes = (props)=>{

    const {Data} = props;

    useEffect(()=>{ },[Data])
    return(
        <div className="LocationList">
            <h3>Work orders by Trade Type</h3>
            <ul className="SiteBreakdown">
                {
                    Data.SplitTradeTypeCount.map((trade,i)=>{
                        return(
                            <li key={i}>
                                <div>{trade.name}</div>
                                <div><strong>{ trade.count}</strong></div>
                            </li>
                            )
                    })
                }
            </ul> 
            
    </div>
    )
}
export default ClusterTradeTypes;