import React from 'react';
import content from './languages.jsx';

class Introduction extends React.Component{
    render(){
        return(
            <div className='content-introduction' id='nav-about'>
                {content[this.props.lang].map( (row,i)  => {return(
                    <div key={i} className='intro-row'>
                        <h3 className='intro-title'>{row.title}</h3>
                        <div className='svg-line'></div>
                        <p className='intro-description'>{row.desc}</p>
                    </div>
                )})}
            </div>
            
        )
    }
}

export default Introduction;