import React from 'react';
import skills_data from './data.jsx';

class Skills extends React.Component{
    render(){
        return(
            <div className='content-skills'>
                <h3 className='title'>Skills<span>+</span>Tools</h3>

                <div className='piles-container'>
                    {[...new Set(this.props.skills_data.map(r => r.type))].map((type,i) => {return(
                        <div key={i} className='pile'>
                            
                            <h3 className='pile-title'>{type}</h3>
                            
                            {this.props.skills_data.filter(row => {return row.type === type}).map((row,i) => {return(
                                <div key={i} className='skill'>
                                    <h3 className='skill-title'>{row.tool}</h3>
                                    {row.modules === null ? null: 
                                        <div className='susbskills-set'>
                                            {row.modules.map((module,i) => {return(
                                                <h3 key={i} className='subskill'>{module}</h3>
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