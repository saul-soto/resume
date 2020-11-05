import React from 'react';
import content from './data.jsx';

class Skills extends React.Component{
    render(){
        const lang = this.props.lang;

        return(
            <div className='content-skills' id='nav-skills_tools'>
                <h3 className='title'>{content.labels[lang].skill_label}<span>+</span>{content.labels[lang].tool_label}</h3>

                <div id='skills-canvas-container'>
                    <svg id='skills-canvas'/>
                    
                </div>

            </div>
        )
    }
}

export default Skills;