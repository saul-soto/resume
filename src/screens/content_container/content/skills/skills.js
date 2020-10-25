import React from 'react';
import skills_data from './data.jsx';

class Skills extends React.Component{
    render(){
        return(
            <div className='content-skills' id='nav-skills_tools'>
                <h3 className='title'>Skills<span>+</span>Tools</h3>

                <div className='piles-container'>
                    {[...new Set(this.props.skills_data.map(r => r.type))].map((type,i) => {return(
                        <div key={i} className='pile'>
                            
                            <p className='pile-title'>{type}</p>
                            
                            {this.props.skills_data.filter(row => {return row.type === type}).map((row,i) => {return(
                                <div key={i} className='skill'>
                                    <p className='skill-title'>{row.tool}</p>
                                    {row.modules === null ? null: 
                                        <div className='subskills-set'>
                                            {row.modules.map((module,i) => {return(
                                                <p key={i} className='subskill'>{module.toLowerCase()}</p>
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

Skills.defaultProps = {skills_data}

export default Skills;