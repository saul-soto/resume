import React from 'react';
import create_data from './data'
import * as d3 from 'd3';


class GoodnessOfFit extends React.Component{
    constructor(props){
        super(props);
        this.data = create_data(30, 1,.5,3)
    }

    render(){
        return(
            <div id='react-component'></div>
        )
    }

    _bind_invisibe_elements(){
        d3.select('#react-component').append('svg').attr('id','canvas');
        const canvas = d3.select('#canvas');
        canvas.append('line').attr('id','x-axis');
        canvas.append('line').attr('id','y-axis');
        canvas.append('line').attr('id','density');
        canvas.selectAll('circle').data(this.data.vector).enter().append('circle').attr('id','observations');
        canvas.selectAll('text').data(this.data.bins).enter().append('text').attr('id','x-ticks')

    }

    _update_sizes(){
        const node = d3.select('#react-component').node();
        this._update_binded_elements(node.offsetHeight, node.offsetWidth)
    }

    componentDidMount(){
        this._bind_invisibe_elements();
        window.addEventListener('resize', this._update_sizes.bind(this));
        this._update_sizes();
    }

    _update_binded_elements(height, width){
        // PRELIMINARIES
        d3.select('#canvas')
            .attr('height', height)
            .attr('width', width)
        ;

        const margin_horizontal = 20;
        const datamin = d3.min(this.data.vector);
        const datamax = d3.max(this.data.vector);

        const x_scaler = d3.scaleLinear()
            .domain([datamin, datamax])
            .range([0+margin_horizontal, width-margin_horizontal])

        // x_axis
        const axis_height = height -30;
        d3.select('#x-axis')
            .attr('x1', x_scaler(datamin)).attr('y1', axis_height)
            .attr('x2', x_scaler(datamax)).attr('y2', axis_height)
            .attr('stroke', 'black')

        //y_axis
        d3.select('#y-axis')
            .attr('x1', x_scaler(datamin)).attr('y1', 40)
            .attr('x2', x_scaler(datamin)).attr('y2', axis_height)
            .attr('stroke', 'black')

    }
}

export default GoodnessOfFit;