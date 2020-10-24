import React from 'react';
import experience_data from './data.jsx';

class Experience extends React.Component{
    render(){
        return(
            <div className='content-experience'>
                <h3 className='title'>Experience</h3>

                <div className='category'>

                    <h3 className='exp-subtitle'>Education</h3>
                    <div className='exp-cat-detail-container'>
                        {this.props.experience_data.education.map( (row,i) => {return(
                            <div key={i} className='exp-cat-detail'>
                                <p>{row.University}</p>
                                <p>{row.Degree}</p>
                                <p>{row.Description}</p>
                            </div>
                        )})}
                    </div>


                </div>
                <div className='category'>

                    <h3 className='exp-subtitle'>Places I've worked in</h3>
                    <div className='exp-cat-detail-container'>
                        {this.props.experience_data.jobs.map( (row,i) => {return(
                            <div key={i} className='exp-cat-detail'>
                                <p>{row.PositionName}</p>
                                <p>{row.Company}/{row.DateBegin}-{row.DateEnd}</p>
                                {row.Responsibilities.map( resp => {return(
                                    <p>{resp}</p>
                                )})}
                                
                                
                            </div>
                        )})}
                    </div>

                </div>
            </div>
        )
    }
}

Experience.defaultProps = {experience_data}

export default Experience;