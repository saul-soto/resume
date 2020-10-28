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

    _bind_elements_with_their_implicit_data(){
        d3.select('#react-component').append('svg').attr('id','canvas');
        const canvas = d3.select('#canvas');

        canvas.append('line').attr('id','x-axis');
        canvas.append('line').attr('id','density');

        const bins = this.data.bins;
        canvas.selectAll('g')
            .data(d3.range(bins.length))
            .enter().append('g')
                .attr('class', 'bin-group')
                .attr('id', (_,i) => {return 'bin-'+i})
        ;

        bins.map(( int,i) => {
            const bin_group = canvas.select('#bin-'+i);
            const interval = [ int['x0'],int['x1'] ];

            bin_group.selectAll('circle')
                .data( 
                    int.slice(0,int.length).map( (e,i) => {return {
                        order:i, 
                        data_point:e,
                        interval: {inf:interval[0], sup:interval[1]}
                    }}) 
                )
                .enter().append('circle').attr('id', 'data-points')
            ;

            bin_group.append('g').attr('id','x-tick-contianer-'+i);
            
            ['text','rect'].map(tag => {
                bin_group.select('#x-tick-contianer-'+i)
                    .selectAll(tag)
                        .data([ interval ])
                        .enter().append(tag).attr('id','x-tick-'+tag)
                ;return null
            });

            return null
        })



    }

    _update_sizes(){// LOOPING FOR EVERY BIN ELEMEN
        const node = d3.select('#react-component').node();
        this._update_binded_elements(node.offsetHeight, node.offsetWidth)
    }

    componentDidMount(){
        this._bind_elements_with_their_implicit_data();
        window.addEventListener('resize', this._update_sizes.bind(this));
        this._update_sizes();
    }

    _draw_axis(axis_height, datamin, datamax, x_scaler){
        // x_axis
        d3.select('#x-axis')
            .attr('x1', x_scaler(datamin)).attr('y1', axis_height)
            .attr('x2', x_scaler(datamax)).attr('y2', axis_height)
            .attr('stroke', 'grey')
        // x-ticks
        d3.selectAll('#x-tick-text')
            .text(d => '['+d+']')
            .attr('font-size', 13)
            .attr('y', axis_height + 20)
            .attr('x', d => x_scaler(d[0])-17)
    }

    _draw_data(axis_height,x_scaler){
        const radius = 5;
        d3.selectAll('#data-points')
            .attr('cx', d => x_scaler(d.interval.inf)  )
            .attr('cy', -20)
            .attr('fill', '#FC7753')
            .attr('r', radius)
            .transition().duration(1000)
            .attr('cy', d => {
                const y_position = (axis_height-radius)-(radius*2)*d.order;
                return y_position
            })

    }

    _update_binded_elements(height, width){
        const canvas = d3.select('#canvas');
            
        canvas
            .attr('height', height)
            .attr('width', width)
        ;

        const margin_horizontal = 20;
        const axis_height = height -30;

        const bins = this.data.bins;
        const datamin = bins[0]['x0'];
        const datamax = bins[bins.length-1]['x0'];

        const x_scaler = d3.scaleLinear()
            .domain([datamin, datamax])
            .range([0+margin_horizontal, width-margin_horizontal])

        this._draw_axis(axis_height, datamin, datamax, x_scaler);
        this._draw_data(axis_height,x_scaler);
    }
}

export default GoodnessOfFit;