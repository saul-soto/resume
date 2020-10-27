import React from 'react';
import data from './data'

class GoodnessOfFit extends React.Component{
    render(){
        console.log(data);
        return(
            <svg>
                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            </svg>
        )
    }
}

export default GoodnessOfFit;