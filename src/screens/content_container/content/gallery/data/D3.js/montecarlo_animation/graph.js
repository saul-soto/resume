import React from 'react';
import * as d3 from 'd3';


class MonteCarloGraph extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: null,
            height: null,
            line_coords: [],
            data: [0],
            cumsum: [],
            simulations: 5,
            probability: .5
        }
    }

    render(){
        return(
            <div id='react-component'>
                <svg 
                    className='canvas' 
                    width={this.state.width}
                    height={this.state.height}
                    style={{ borderStyle:'solid'}} 
                />
            </div>
        )
    }

    async _update_sizes(){
        const  div_container = await d3.select('#react-component').node();
        const width = div_container.offsetWidth;
        const height = div_container.offsetHeight;
        const margin_horizontal = 10;
        const margin_vertical = 10;

        this.setState({
            width,
            height,
            line_coords: [
                {
                    x_1:margin_horizontal,y_1:margin_vertical,
                    x_2:margin_horizontal,y_2:height - margin_vertical
                },
                {
                    x_1:margin_horizontal,y_1:height - margin_vertical,
                    x_2:width - margin_horizontal,y_2:height - margin_vertical
                },
            ]
        });

        this.render_graph('update');
    };

    _bind_implicit_data(){
        const canvas = d3.select('.canvas');

        const input_group_selection = canvas.append('g').attr('class','input-group');

        input_group_selection
            .selectAll('line').data([null])
                .enter().append('line')
                    .attr('class','slicer')
        ;

        input_group_selection
            .selectAll('circle').data([this.state.probability])
                .enter().append('circle')
                    .attr('class','slicer-selector')
        ;

        const axis_group = canvas.append('g').attr('class', 'axis-group');

        axis_group
            .selectAll('line').data([null,null])
                .enter().append('line')
                    .attr('class', 'axis')
        ;
        
        canvas
            .selectAll('path').data([null])
                .enter().append('path')
                    .attr('class','time-series')
        ;



    }

    patterns(pattern){
        const resize_svgs = () =>{
            const line_coords = this.state.line_coords;

            d3.selectAll('.axis')
                .attr('x1', (_,i) =>{return line_coords[i].x_1}  ).attr('y1', (_,i) =>{return line_coords[i].y_1} )
                .attr('x2', (_,i) =>{return line_coords[i].x_2}  ).attr('y2', (_,i) =>{return line_coords[i].y_2} )
                .attr('stroke', 'black')
            ;
        }


        if(pattern==='enter'){
            this._bind_implicit_data();
            resize_svgs();
        }

        else if(pattern==='update'){
            resize_svgs();
        }

        else if(pattern==='exit'){

        }
    }

    render_graph(pattern){
        this.patterns(pattern);

    }

    async componentDidMount(){
        await this._update_sizes();
        window.addEventListener('resize', this._update_sizes.bind(this));
        this.render_graph('enter');


        d3.range(this.state.simulations).map( i => {
            setTimeout(() => {
                let data = this.state.data;
                data.push(d3.randomBernoulli(this.state.probability)() ===1?1:-1 )

                console.log(data);
                console.log(this.state.cumsum);
                this.setState({ 
                    data,
                    cumsum: data.map( (_,i) => {return d3.sum(data.slice(0,i))} )
                })
            }, 1000*i);

        })
    }


}

export default MonteCarloGraph;
