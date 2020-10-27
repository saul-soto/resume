import React from 'react';
import * as d3 from 'd3';
import {ReactComponent as SVGArrow} from '../../../../assets/arrow_right.svg';
import {ReactComponent as SVGCircle} from '../../../../assets/circle.svg';

class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            graph_idx_selection: 0
        }
    }

    render(){
        const {initial_value, final_value} = {initial_value:.2, final_value: .5}
        const initial_arrow_style = {
            fill:"rgba(26, 27, 31, "+initial_value+")",
            height:'35px',
            width:'50px',
            cursor:'pointer',
            zIndex:999
        }

        return(
            <div className='slider'>                
                <div className='arrows-container'>
                    <SVGArrow
                        id='left-arrow'
                        transform='rotate(-180 0 0)'
                        style={initial_arrow_style}
                        onPointerOver={()=>{this._restyle_arrow('#left-arrow',initial_value,final_value)}}
                        onPointerLeave={()=>{this._restyle_arrow('#left-arrow',final_value,initial_value)}}
                        onClick={()=>{this._navigate_through_graphs('left')}}
                    />
                    <SVGArrow
                        id='right-arrow'
                        style={initial_arrow_style}
                        onPointerOver={()=>{this._restyle_arrow('#right-arrow',initial_value,final_value)}}
                        onPointerLeave={()=>{this._restyle_arrow('#right-arrow',final_value,initial_value)}}
                        onClick={()=>{this._navigate_through_graphs('right')}}
                    />
                </div>

                <div className='circle-container'>
                    <SVGCircle width='20px' fill='lightgrey' style={{cursor:'pointer'}}/>
                    <SVGCircle width='20px' fill='lightgrey' style={{cursor:'pointer'}}/>
                </div>


                <div className='gallery-container'>
                    {this.props.data.length === 0 ? null:
                        this.props.data.map((row,i) => {return(
                            <>
                                {this.state.graph_idx_selection === i ? 
                                    row.type ==='svg' ?
                                        <row.source/>
                                    :row.type ==='png' ?
                                        null
                                    :null

                                :null}
                            </>
                            
                        )})
                    }
                </div>

        </div>
        )
    }

    _restyle_arrow(id_name, initial_value, final_value){
        const basic_style = 'height:35px;width:50px;cursor:pointer;z-index:999';
        
        d3.select(id_name)
            .attr('style', basic_style)
            .attr('fill',"rgba(26, 27, 31, "+initial_value+")")
            .transition().duration(350)
            .attr('style',basic_style)
            .attr('fill',"rgba(26, 27, 31, "+final_value+")")
    }

    _navigate_through_graphs(direction){
        if(this.props.data.length > 0){
            const go_around = true;
            const to_add = direction === 'left' ? -1 :1;
            let new_idx  = this.state.graph_idx_selection + to_add;
            //UPPER LIMIT
            new_idx = new_idx < this.props.data.length ? new_idx   :go_around ? 0 :this.props.data.length-1;
            //LOWER LIMIT
            new_idx = new_idx < 0                      ? go_around ? this.props.data.length-1: 0 :new_idx;

            this.setState({graph_idx_selection: new_idx});
        }
    }
}

export default Slider;