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
        canvas.append('line').attr('id','y-axis');
        canvas.append('line').attr('id','density');

        const bins = this.data.bins;
        canvas.selectAll('g')
            .data(bins.map(int => {return [ int['x0'],int['x1'] ]  }))
            .enter().append('g')
                .attr('class', 'bin-group')
                .attr('id', (_,i) => {return 'bin-'+i})
        ;

        bins.map(( int,i) => {
            canvas.select('#bin-'+i).selectAll('circle')
                .data( 
                    int.slice(0,int.length).map( (e,i) => {return {
                        order:i, 
                        data_point:e,
                        interval: {inf:int['x0'], sup:int['x1']}
                    }}) 
                )
                .enter().append('circle').attr('id', 'data-points')
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

        // y_axis
        // d3.select('#y-axis')
        //     .attr('x1', x_scaler(datamin)).attr('y1', 40)
        //     .attr('x2', x_scaler(datamin)).attr('y2', axis_height)
        //     .attr('stroke', 'grey')

        // x-ticks
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

        const radius = 5;
        canvas.selectAll('#data-points')
            .attr('r', radius)
            .attr('cy', d => (axis_height-radius)-(radius*2)*d.order)
            .attr('cx', d => x_scaler(d.interval.inf)  )
        
    }
}

export default GoodnessOfFit;