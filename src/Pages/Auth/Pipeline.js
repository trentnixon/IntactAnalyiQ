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
                    <H2 Copy={`Front End Pipeline`}/>
                    <Section>
                        <H3 Copy={`Build : Dolores`} />
                        <H3 Copy={`Phase : One`} />
                        <H3 Copy={`Current Build : Alpha 14`} />
                        <ul>
                            {
                                Pipe.map((item,i)=>{
                                    return(
                                        <li key={i}>
                                            <H4 Copy={item.title} />
                                            <P Copy={item.Description} />
                                            <ul>
                                            {
                                                item.line.map((line,i)=>{
                                                    return(
                                                        <li key={i}>
                                                              <H4 Copy={ line.item } />
                                                              <P Copy={line.brief} />
                                                              <P Copy={`priority : ${line.priority}`} />
                                                              <P Copy={`eta : ${line.eta}`} />
                                                        </li>
                                                    )
                                                })
                                            }
                                            </ul>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Section>
                    
                    <H2 Copy={`Back End Pipeline`}/>
            </div>
        </div>
    )
}

export default Pipeline;