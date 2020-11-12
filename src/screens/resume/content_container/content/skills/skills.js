import React from 'react';
import content from './data.jsx';

class Skills extends React.Component{
    render(){
        const lang = this.props.lang;

        return(
            <div className='content-skills' id='nav-skills_tools'>
                <h3 className='title'>{content.labels[lang].skill_label}<span>+</span>{content.labels[lang].tool_label}</h3>

                <div className='piles-container'>
                    {[...new Set(content.skills[lang].map(r => r.type))].map((type,i) => {return(
                        <div key={i} className='pile'>
                            
                            <p className='pile-title'>{type}</p>
                            
                            {content.skills[lang].filter(row => {return row.type === type}).map((row,i) => {return(
                                <div key={i} className='skill'>
                                    <p className='skill-title'>{row.tool}</p>
                                    {row.modules === null ? null: 
                                        <div className='subskills-set'>
                                            {row.modules.map((module,i) => {return(
                                                <p key={i} className='subskill'>{module.name.toLowerCase()}</p>
                                            )})}
                                        </div>
                                    }
                                </div>
                            )})}

                        </div>
                    )})}

                </div>

            </div>
        )
    }
}

export default Skills;