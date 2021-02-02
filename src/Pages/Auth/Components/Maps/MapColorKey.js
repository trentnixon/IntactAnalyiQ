import React from 'react'

import {RegionColor} from "actions/HandleUX"

const ColorKey = ()=>{
    return (

        <div className="MapColorKey">
              <div >
                  <span style={{backgroundColor:RegionColor('SameBuilding')}}></span>
                  <h2>SameBuilding</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('CBD')}}></span>
                  <h2>CBD</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('InnerCity')}}></span>
                  <h2>InnerCity</h2>
              </div>
              <div>
                  <span  style={{backgroundColor:RegionColor('Metro')}}></span>
                  <h2>Metro</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('OuterMetro')}}></span>
                  <h2>OuterMetro</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('Regional')}}></span>
                  <h2>Regional</h2>
              </div>
              <div >
                  <span style={{backgroundColor:RegionColor('Remote')}}></span>
                  <h2>Remote</h2>
              </div>
              
              <div >
                  <span style={{backgroundColor:RegionColor('ExtremeRemote')}}></span>
                  <h2>ExtremeRemote</h2>
              </div>
        </div>

    )
}

export default ColorKey;