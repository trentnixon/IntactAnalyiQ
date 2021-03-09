// Private Functions
import store from "../store/index"
import { workingDaysBetweenDates,numberWithCommas} from "actions/HandleUX";
import {WorkorderTotals, OBJ_SITE_GLOBAL,OBJ_RESOURCES_GLOBAL} from "actions/CreateSingleViewModel"
import { findIndex,sumBy} from 'lodash'; 


/* ********************************************************************************* */
// Costs and Pricings
/* ********************************************************************************* */

export function SingleRecourseCostOverModel(){
  
    const MODEL = store.getState().SCANSTATE
    const WorkingDays = workingDaysBetweenDates(MODEL.SelectedModelMeta.DateStart,MODEL.SelectedModelMeta.DateEnd)
  
    const CostPerHour = 50;
    const HourPerDay = 8;
    console.log((WorkingDays*HourPerDay)*CostPerHour)
    return (WorkingDays*HourPerDay)*CostPerHour;
  
  }
  

  export function CostPerWorkOrder(){
    const TotalResources = parseFloat(sumBy(OBJ_SITE_GLOBAL(), function(o) { return o['Resources']; }).toFixed(2));
    const TotalWorkorders = parseFloat(WorkorderTotals()[0].toFixed(2));
    const SingleRecourseCost = SingleRecourseCostOverModel()
    console.log(TotalResources, TotalWorkorders,SingleRecourseCost )

        return (( TotalResources*SingleRecourseCost ) / TotalWorkorders).toFixed(2)
  }




  