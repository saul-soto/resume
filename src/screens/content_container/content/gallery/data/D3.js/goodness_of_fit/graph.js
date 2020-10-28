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
        canvas.selectAll('rect').data(this.data.bins).enter().append('rect').attr('id','x-ticks-guide-lines')

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

        const bins = this.data.bins;
        const datamin = bins[0]['x0'];
        const datamax = bins[bins.length-1]['x0'];

        const x_scaler = d3.scaleLinear()
            .domain([datamin, datamax])
            .range([0+margin_horizontal, width-margin_horizontal])

        // x_axis
        const axis_height = height -30;
        d3.select('#x-axis')
            .attr('x1', x_scaler(datamin)).attr('y1', axis_height)
            .attr('x2', x_scaler(datamax)).attr('y2', axis_height)
            .attr('stroke', 'grey')

        //y_axis
        d3.select('#y-axis')
            .attr('x1', x_scaler(datamin)).attr('y1', 40)
            .attr('x2', x_scaler(datamin)).attr('y2', axis_height)
            .attr('stroke', 'grey')

        // x_ticks
        d3.selectAll('#x-ticks')
            // .text(d => '['+d['x0']+' , '+d['x1'] +']')
            .text(d => d['x1'] )
            .attr('font-size', 13)
            .attr('fill', 'grey')
            .attr('y', axis_height+25)
            .attr('x', d =>  {
                const min = d3.max(d.slice(0, d.length));
                return x_scaler(min)-1.5;
            })

        // x_ticks-guide-lines
        d3.selectAll('#x-ticks-guide-lines')
            .attr('x', d =>  {
                const min = d3.max(d.slice(0, d.length));
                return x_scaler(min)-1;
            })
            .attr('y', axis_height-10)
            .attr('width', 2)
            .attr('height', 20)
            .attr('fill','lightgrey')

    }
}

export default GoodnessOfFit;