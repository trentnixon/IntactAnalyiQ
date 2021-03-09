import React from 'react';
import Button from '@material-ui/core/Button';


// Type
import {H1, H2, H3,H4, P, S} from "../Components/Type";
import Section from "../Components/Layout/Section"
const UIComponentList = ()=>{
    return(
        <div className="OuterContainer">
            <div className="InnerFrame">
            <H1 Copy={`UI COMPONENTS`}/>
            <Section><BasicTypeOptions /></Section>            
            <Section><ColorPallete /></Section>
            <Section><Cards /></Section>
            <Section><Pods /></Section>
            <Section><StatBar /></Section>
            <Section><Buttons /></Section>
            <Section><ControlBar /></Section>
            <Section>
                Controls
                charts
            </Section>
            </div>
        </div> 
    )
}

export default UIComponentList; 


const ControlBar=()=>{
    return(
        <div className="ControlBar">
            Icon
        </div>
    )
}

const Buttons=()=>{
    return(
        <>
             <H2 Copy={`Buttons`}/>
             <Button variant="contained" className="btn-Back"> Back </Button>
             <Button variant="contained" className="btn-Select"> Select </Button>
             <Button variant="contained" className="btn-Next"> Next </Button>
             <Button variant="contained" className="btn-Confirm"> Confirm </Button>
             <Button variant="contained" className="btn-Create"> Create </Button>
        </>
    )
}


const StatBar=()=>{

        return(
            <>
             <H2 Copy={`Stat/Data Bar`}/>
                <ul className="Stat_Bar">
                    <li>Title : Number</li>
                    <li>Title : Number</li>
                    <li>Title : Number</li>
                    <li>Title : Number</li>
                    <li>Title : Number</li>
                    <li>Title : Number</li>
                </ul>
            </>
        )
}

const Pods =()=>{
    return(
        <>
            <H2 Copy={`Data Pods`}/>

            <ul className="Pod_List">
                <li className="Pod">
                    
                    <div className="Data"><P Copy={`Pod Data`}/></div>
                    <div className="Title"> <H4 Copy={`Pod Title`}/></div>
                    <div className="Data Strong"><P Copy={`Secondary  Data`}/></div>
                </li>
                <li className="Pod">
                    <div className="Data"><P Copy={`Pod Data`}/></div>
                    <div className="Title"> <H4 Copy={`Pod Title`}/></div>
                    
                </li>
                <li className="Pod">
                    
                    <div className="Data"><P Copy={`Pod Data`}/></div>
                    <div className="Title"> <H4 Copy={`Pod Title`}/></div>
                    <div className="Data Strong"><P Copy={`Secondary  Data`}/></div>
                </li>
                <li className="Pod">
                    <div className="Data"><P Copy={`Pod Data`}/></div>
                    <div className="Title"> <H4 Copy={`Pod Title`}/></div>
                    
                </li>
            </ul>
        </>
    )



}



const Cards = ()=>{
    return(
        <>
        <H2 Copy={`Cards`}/>

        <ul className="Card_List">
            <li className="Card">
                    <div className="Card_Header">
                            <H2 Copy={`Card Header`}/>
                    </div>
                    <div className="Card_Body">
                            <P Copy={`Card Body`}/>
                    </div>
                    <div className="Card_Footer">
                            <H4 Copy={`Card Footer`}/>
                    </div>
            </li>

            <li className="Card">
                    <div className="Card_Header">
                            <H2 Copy={`Card Header`}/>
                    </div>
                    <div className="Card_Body">
                            <P Copy={`Card Body`}/>
                    </div>
                    <div className="Card_Footer">
                            <H4 Copy={`Card Footer`}/>
                    </div>
            </li>
        </ul>

        
        </>
    )
}


const ColorPallete=()=>{
    return(
        <>
        <H2 Copy={`Color palettes`}/>
        <H3 Copy={`Baseline Colors`}/>
            <ul className="ColorPalette">
                <li>
                    <span className="color1"></span>
                    <H4 Copy={`Color 1`}/>
                </li>
                <li>
                    <span className="color2"></span>
                    <H4 Copy={`Color 2`}/>
                </li>
                <li>
                    <span className="color3"></span>
                    <H4 Copy={`Color 3`}/>
                </li>
                <li>
                    <span className="color4"></span>
                    <H4 Copy={`Color 4`}/>
                </li>
                <li>
                    <span className="color5"></span>
                    <H4 Copy={`Color 5`}/>
                </li>
            </ul>
        <H3 Copy={`Accent Colors`}/>
            <ul className="ColorPalette">
                <li>
                    <span className="true"></span>
                    <H4 Copy={`Accent True`}/>
                </li>
                <li>
                    <span className="false"></span>
                    <H4 Copy={`Accent False`}/>
                </li>
                <li>
                    <span className="Link"></span>
                    <H4 Copy={`Link`}/>
                </li>
               
            </ul>
        </>
    )
}


const ULList = ()=>{
    return(
        <ul>
            <li>List Item</li>
            <li>List Item</li>
            <li>List Item</li>
            <li>List Item</li>
            <li>List Item</li>
            <li>List Item</li>

        </ul>
    )
}

const BasicTypeOptions=()=>{
    return(
        <>
            
            
            <H1 Copy={`Header H1. Font : Roboto`}/>
            <H2 Copy={`Header H2. Font : Roboto`}/>
            <H3 Copy={`Header H3. Font : Roboto`}/>
            <H4 Copy={`Header H4. Font : Roboto`}/>
            
            <P Copy={`Paragraph Font : Montserrat`}/>
            <S Copy={`Small Copy Font : Montserrat`}/>
        </>
    )
}
