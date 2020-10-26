import React from 'react';
import Introduction from './content/introduction';
import Experience from './content/experience/experience';
import Skills from './content/skills/skills';
import Gallery from './content/gallery/gallery';

class ContentContainer extends React.Component{
    render(){
        const ls_components = [<Introduction />, <Experience />,<Skills />,<Gallery />];
        return(
            <div className='content-container'>
                {ls_components.map((component,i) => {return(
                    <div 
                        key={i} 
                        className='content-box' 
                        id={ls_components.length===i+1?'relative-box':null}
                    >
                            {component}
                    </div>
                )})}
            </div>
            
        )
    }
}

export default ContentContainer;