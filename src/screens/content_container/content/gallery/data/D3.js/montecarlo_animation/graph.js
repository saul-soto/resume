import React from 'react';
import * as d3 from 'd3';


class MonteCarloGraph extends React.Component{
    constructor(props){
        super(props);
        this._is_mounted = false;
        this.state = {
            width: null,
            height: null,
            y_scaler:null,
            line_coords: [],
            data: [],
            cumsum: [],
            simulations: 500,
            probability: .5,
            slicer_position:null
        }
    }

    render(){
        return(
            <div id='react-component'>
                <svg 
                    className='canvas' 
                    width={this.state.width}
                    height={this.state.height}
                    // style={{ borderStyle:'solid'}} 
                />
            </div>
        )
    }

    _get_margins(){
        return {margin_horizontal:10, margin_vertical: 10}   
    }

    _get_updated_y_scaler(new_height, new_min, new_max){
        const { margin_vertical} = this._get_margins();
        const scaler = 
            d3.scaleLinear()
                .domain([  new_min, new_max ])
                .range([ 0 + margin_vertical, new_height - margin_vertical])
        ;
        return scaler
    }

    _get_slicer_scaler(){
        const scaler = 
            d3.scaleLinear()
                .domain([1, 2])
                .range([this.state.width/3, (this.state.width/3)*2 ])
            ;
        return scaler;
    }

    _bind_implicit_data(){
        const canvas = d3.select('.canvas');

        const input_group_selection = canvas.append('g').attr('class','input-group');

        input_group_selection
            .selectAll('text').data([null])
                .enter().append('text')
                    .attr('class','slicer-title')
        ;
        
        input_group_selection
            .selectAll('line').data([null])
                .enter().append('line')
                    .attr('class','slicer')
        ;

        input_group_selection
            .selectAll('circle').data([this.state.probability])
                .enter().append('circle')
                    .attr('class','slicer-selector')
                    .call(d3.drag()
                        .on("drag", (e) => {
                            const unit_to_add = e.dx < 0 ? -1:e.dx > 1 ?1:0;
                            let probability = this.state.probability + unit_to_add/80;

                            if (0 <= probability && probability <= 1){
                                probability = Math.round(probability*100,4)/100;
                                this.setState({ probability, slicer_position: e.x });
                                this._run_pattern('update');
                            }

                        })
                    )                    
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

    _run_pattern(pattern){
        const { simulations, width, y_scaler, cumsum, probability} = this.state;
        const { margin_horizontal, margin_vertical } = this._get_margins();
        
        const x_local_scaler = this._get_slicer_scaler();

        const merge_enter_update = () =>{
            const line_coords = this.state.line_coords;

            // AXIS

            d3.selectAll('.axis')
                .attr('x1', (_,i) =>{return line_coords[i].x_1}  ).attr('y1', (_,i) =>{return line_coords[i].y_1} )
                .attr('x2', (_,i) =>{return line_coords[i].x_2}  ).attr('y2', (_,i) =>{return line_coords[i].y_2} )
                .attr('stroke', (_,i) => {return i === 0 ? 'white': 'black'})
            ;

            // SLICER GROUP
            d3.selectAll('.input-group')
                .attr('transform', `translate(${width/3},${margin_vertical+10})`)
            ;


            d3.selectAll('.slicer-title')
                .text('Probability: ' + probability*100+'%')
                .attr('font-size', 14)
                .attr('x', x_local_scaler(.5))
                .attr('text-anchor', 'middle')
            ;
                
            
            d3.selectAll('.slicer')
                .attr('x1', x_local_scaler(0)).attr('y1', margin_vertical)
                .attr('x2', x_local_scaler(1) ).attr('y2', margin_vertical)
                .attr('stroke','lightgrey')
                .attr('stroke-width', 3.5)
            ;

            d3.selectAll('.slicer-selector')
                .attr('r', 5)
                .attr('fill', 'gray')
                .attr('cx', this.state.slicer_position)
                .attr('cy', margin_vertical)                
            ;

            
        }


        if(pattern==='enter'){
            this._bind_implicit_data();
            merge_enter_update();

            d3.selectAll('.time-series')
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
            ;
        }

        else if(pattern==='update'){
            merge_enter_update();

            const x_scaler = 
                d3.scaleLinear()
                    .domain([ 0, simulations - 1])
                    .range([ 0 + margin_horizontal, width - margin_horizontal])
                ;

            d3.selectAll('.time-series')
                .transition().duration(100)
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function(_,i) { return x_scaler(i) })
                    .y(function(d) { return y_scaler(d) })
                    (cumsum)
                )
                
        }

        else if(pattern==='exit'){

        }
    }

    _run_animation(speed){
        d3.range(this.state.simulations).map( i => {
            setTimeout(
                async () => {
                    const update_state = () => {
                        const data = this.state.data;
                        data.push(d3.randomBernoulli(this.state.probability)() ===1?-1:1 );
                        const cumsum = data.map( (_,i) => {return d3.sum(data.slice(0,i))} );
                        const height = this.state.height;
                
                        this.setState({ 
                            data,
                            cumsum,
                            y_scaler: this._get_updated_y_scaler(height, d3.min(cumsum), d3.max(cumsum))
                        });
                    }

                    //TO AVOID MEMORY LEAKAGE VERIFY IF COMPONENT IS MOUNTED
                    if(this._is_mounted){
                        update_state();
                        this._run_pattern('update');
                    }

            }, speed*i);

            return null
        })
    }

    _update_responsive_sizes(){
        const  div_container = d3.select('#react-component').node();
        const width = div_container.offsetWidth;
        const height = div_container.offsetHeight;
        const { margin_horizontal, margin_vertical } = this._get_margins();
        const cumsum = this.state.cumsum;

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
            ],
            y_scaler: this._get_updated_y_scaler(height, d3.min(cumsum), d3.max(cumsum))
        });

        this._run_pattern('update');
    }
    
    async componentDidMount(){
        await this._update_responsive_sizes();
        window.addEventListener('resize', this._update_responsive_sizes.bind(this));
        this._run_pattern('enter');
        this._run_animation(150);
        this._is_mounted = true;
    }

    componentWillUnmount(){
        this._is_mounted = false;
    }

}

export default MonteCarloGraph;
