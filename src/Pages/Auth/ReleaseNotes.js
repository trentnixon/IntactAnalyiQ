import React from 'react';



// Type
import {H1, H2, H3,H4, P, S} from "Pages/Auth/Components/Type"
import Section from "Pages/Auth/Components/Layout/Section"


const Notes = [{
    Title:"Notes",
    Release:"14",
    Description:"Description",
    Date:"1/1/21"
}]

const ReleaseNotes = ()=>{
    return(
        <div className="OuterContainer">
            <div className="InnerFrame">
                    <H2 Copy={`AnalytiQ Release Notes`}/>

                    {
                        Notes.map((note,i)=>{
                            return(
                                <Section key={i}>
                                        <H3 Copy={note.Title} />
                                        <P Copy={note.Description}/>
                                        <P Copy={note.Date}/>
                                </Section>
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default ReleaseNotes;