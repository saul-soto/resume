import React from 'react';
import create_data from './data'
import * as d3 from 'd3';

class GoodnessOfFit extends React.Component{
    render(){
        return(
            <svg id='canvas-container'>
            </svg>
        )
    }

    _create_graph(){
        const data = create_data(100, 1, .5);
        console.log(data);
        d3.select('#canvas').selectAll('circle').data(data.vector).enter()
            .append('circle')
            
                .transition().duration(1000)

                .attr('cx', (e) => {return e*100})
                .attr('cy', (e) => {return e*50})
                .attr('r', 4)


    }

    componentDidMount(){
        this._create_graph();
    }
}

export default GoodnessOfFit;