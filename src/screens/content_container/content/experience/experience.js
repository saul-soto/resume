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
                                <p className='exp-cat-detail-title'>{row.University}</p>
                                <p className='exp-cat-detail-subtitle'>{row.Degree}</p>
                                <p className='exp-cat-detail-desc'>{row.Description}</p>
                            </div>
                        )})}
                    </div>


                </div>
                <div className='category'>

                    <h3 className='exp-subtitle'>Places I've worked in</h3>
                    <div className='exp-cat-detail-container'>
                        {this.props.experience_data.jobs.map( (row,i) => {return(
                            <div key={i} className='exp-cat-detail'>
                                <p className='exp-cat-detail-title'>{row.PositionName}</p>
                                <p className='exp-cat-detail-subtitle'>{row.Company}/{row.DateBegin}-{row.DateEnd}</p>
                                {row.Responsibilities.map( (resp,i) => {return(
                                    <p key={i} className='exp-cat-detail-desc'>{resp}</p>
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