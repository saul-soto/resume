import React from 'react';
import experience_data from './data.jsx';

class Experience extends React.Component{
    render(){
        return(
            <div className='content-experience'>
                <h3 className='title'>Experience</h3>

                <div className='category'>
                    
                </div>
                <div className='category'>

                </div>
            </div>
        )
    }
}

Experience.defaultProps = {experience_data}

export default Experience;