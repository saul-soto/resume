import React from 'react';
import Introduction from './content/introduction';
import Experience from './content/experience/experience';
import Skills from './content/skills';
import Gallery from './content/gallery';

class ContentContainer extends React.Component{
    render(){
        return(
            <div className='content-container'>
                {[<Introduction />, <Experience />,<Skills />,<Gallery />].map((comp,i) => {return(
                    <div key={i} className='content-box'>{comp}</div>
                )})}
            </div>
            
        )
    }
}

export default ContentContainer;