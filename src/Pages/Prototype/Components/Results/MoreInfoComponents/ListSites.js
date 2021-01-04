import React, { useEffect, useState } from 'react'

const ClusterSites = (props)=>{

    const {Data} = props;

    return(
        <div className="LocationList">
            <h3>Cluster Locations vs Work orders</h3>
                <ul className="SiteBreakdown">
                        {
                            Data.map((site,i)=>{
                                return(
                                    <li key={i}>
                                        <div>{site.name}</div>
                                        <div><strong>{site.count[0].WorkOrders}</strong></div>
                                    </li>
                                    )
                            })
                        }
                </ul> 
        </div>
    )
}
export default ClusterSites;