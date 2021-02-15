import React from 'react';

const Section = (props)=>{

    return(
        <div className={`Section ${props.className}`}>
            {props.children}
        </div>
    )

}

export default Section;