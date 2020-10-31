import React from 'react';
import content from './languages.jsx';
import * as d3 from 'd3';

class Experience extends React.Component{
    render(){
        const parse_date = (integer_date) => {
            let date = new Date(integer_date);
            date.setDate(date.getDate() + 1);
            return d3.timeFormat('%b%Y')(date)
        };

        const lang = this.props.lang;

        return(
            <div className='content-experience' id='nav-experience'>
                <h3 className='title'>{content.language_labels[lang].title}</h3>

                <div className='category'>

                    <h3 className='exp-subtitle'>{content.language_labels[lang].eduaction_title}</h3>
                    <div className='exp-cat-detail-container'>
                        {content.education.map( (row,i) => {return(
                            <div key={i} className='exp-cat-detail'>
                                <p className='exp-cat-detail-title'>{row.University[lang]}</p>
                                <p className='exp-cat-detail-subtitle'>{row.Degree[lang]}</p>
                                <p className='exp-cat-detail-desc'>{row.Description[lang]}</p>
                            </div>
                        )})}
                    </div>


                </div>
                <div className='category'>

                    <h3 className='exp-subtitle'>{content.language_labels[lang].job_title}</h3>
                    <div className='exp-cat-detail-container'>
                        {content.jobs.map( (row,i) => {return(
                            <div key={i} className='exp-cat-detail'>
                                <p className='exp-cat-detail-title'>{row.PositionName[lang]}</p>
                                <p className='exp-cat-detail-subtitle'>{row.Company} | {parse_date(row.DateBegin)}-{row.DateEnd===null?null:parse_date(row.DateEnd)}</p>
                                {row.Responsibilities[lang].map( (resp,i) => {return(
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

export default Experience;