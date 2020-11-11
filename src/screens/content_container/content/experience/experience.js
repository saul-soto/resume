import React from 'react';
import content from './languages.jsx';
import * as d3 from 'd3';

class Experience extends React.Component{
    render(){
        const parse_date = (integer_date, format) => {
            let date = new Date(integer_date);
            date.setDate(date.getDate() + 1);
            return d3.timeFormat(format)(date)
        };

        const lang = this.props.lang;

        const data = content;
        const data_jobs = content.jobs.sort( (x,y) => {return d3.descending(x.DateBegin, y.DateBegin)} );


        return(
            <div className='content-experience' id='nav-experience'>
                <h3 className='title'>{data.language_labels[lang].title}</h3>

                <div className='category'>

                    <h3 className='exp-subtitle'>{data.language_labels[lang].eduaction_title}</h3>
                    <div className='exp-cat-detail-container'>
                        {data.education.map( (row,i) => {return(
                            <div key={i} className='exp-cat-detail'>
                                <p className='exp-cat-detail-title'>{row.University[lang]}</p>
                                <p className='exp-cat-detail-subtitle'><span>{row.Degree[lang]}</span> ({parse_date(row.DateBegin,'%Y')}-{row.DateEnd===null?null:parse_date(row.DateEnd,'%Y')})</p>
                                <p className='exp-cat-detail-desc'>{row.Description[lang]}</p>
                            </div>
                        )})}
                    </div>


                </div>
                <div className='category'>

                    <h3 className='exp-subtitle'>{data.language_labels[lang].job_title}</h3>
                    <div className='exp-cat-detail-container'>
                        {data_jobs.map( (row,i) => {return(
                            <div key={i} className='exp-cat-detail'>
                                <p className='exp-cat-detail-title'>{row.PositionName[lang]}</p>
                                <p className='exp-cat-detail-subtitle'><span>{row.Company}</span>  ({parse_date(row.DateBegin,'%b%Y')}-{row.DateEnd===null?null:parse_date(row.DateEnd,'%b%Y')})</p>
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