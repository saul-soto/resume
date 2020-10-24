import React from 'react';
import Introduction from './content/introduction';
import Experience from './content/experience/experience';
import Skills from './content/skills/skills';
import Gallery from './content/gallery';

class ContentContainer extends React.Component{
    render(){
        return(
            <div className='content-container'>
                {[<Introduction />, <Experience />,<Skills />,<Gallery />].map((component,i) => {return(
                    <div key={i} className='content-box'>{component}</div>
                )})}
            </div>
            
        )
    }
}

export default ContentContainer;