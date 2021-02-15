import React from 'react';
import {numberWithCommas} from "actions/HandleUX";

const Stats_Bar=(props)=>{
    const { data,name,value} = props

    return(
            <ul className="Stat_Bar">
                {
                    data.map((row,i)=>{
                        return(<li key={i}> {row[name]} : {numberWithCommas(parseInt(row[value]))}</li> ) 
                    })
                }
            </ul>
    )
}
export default Stats_Bar;
