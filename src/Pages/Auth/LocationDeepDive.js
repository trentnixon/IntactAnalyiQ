import React from 'react';



// Type
import {H1, H2, H3,H4, P, S} from "Pages/Auth/Components/Type"
import Section from "Pages/Auth/Components/Layout/Section"


const Pipe=[
    {
        title:"Public",
        Description:"Description",
        line:[{
            item:"Item",
            brief:"Brief on Item",
            priority:"Low",
            eta:"NA",
        }],
        
    },{
        title:"User Account",
        Description:"Description",
        line:[{
            item:"Item",
            brief:"Brief on Item",
            priority:"Low",
            eta:"NA",
        }],
    },
    {
        title:"General",
        Description:"Description",
        line:[{
            item:"Item",
            brief:"Brief on Item",
            priority:"Low",
            eta:"NA",
        }],
    },
    {
        title:"Create Model",
        Description:"Description",
        line:[{
            item:"Item",
            brief:"Brief on Item",
            priority:"Low",
            eta:"NA",
        }],
    },
    {
        title:"View Model",
        Description:"Description",
        line:[{
            item:"Item",
            brief:"Brief on Item",
            priority:"Low",
            eta:"NA",
        }],
    },
    {
        title:"Compare Models",
        Description:"Description",
        line:[{
            item:"Item",
            brief:"Brief on Item",
            priority:"Low",
            eta:"NA",
        }],
    },
    {
        title:"Compare Models",
        Description:"Description",
        line:[{
            item:"Item",
            brief:"Brief on Item",
            priority:"Low",
            eta:"NA",
        }],
    }
]


const Pipeline = ()=>{
    return(
        <div className="OuterContainer">
            <div className="InnerFrame">
                    <H2 Copy={`Location Deep Dive`}/>
                    <Section>
                        <H3 Copy={`Building Soon`} />
                        
                    </Section>
                    
            </div>
        </div>
    )
}

export default Pipeline;