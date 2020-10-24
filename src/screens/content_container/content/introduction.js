import React from 'react';

class Introduction extends React.Component{
    render(){
        return(
            <div className='content-introduction'>
                {this.props.intro_data.map( (row,i)  => {return(
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


Introduction.defaultProps = {
    intro_data: [
        {title:'Profile', desc:'Data driven and curious about all things mathematics and programming'},
        {title:'About me', desc:'I\'m a data analyst from Mexico City, 28 years old and currently living in Puerto Vallarta, Mexico'},
    ]
}

export default Introduction;