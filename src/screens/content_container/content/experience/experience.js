import React from 'react';
import experience_data from './data.jsx';

class Experience extends React.Component{
    render(){
        console.log(this.props.experience_data);
        return(
            <p>Experience</p>
        )
    }
}

Experience.defaultProps = {experience_data}

export default Experience;