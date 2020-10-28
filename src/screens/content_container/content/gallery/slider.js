import React from 'react';
import * as d3 from 'd3';
import {ReactComponent as SVGArrow} from '../../../../assets/arrow_right.svg';

class Slider extends React.Component{
    render(){
        const {initial_value, final_value} = {initial_value:.2, final_value: .5}
        const initial_arrow_style = {
            fill:"rgba(26, 27, 31, "+initial_value+")",
            height:'35px',
            width:'50px',
            cursor:'pointer',
            zIndex:999
        }

        const data_length = this.props.data.length;

        return(
            <div className='slider'>                
                <div className='arrows-container'>
                    <SVGArrow
                        id='left-arrow'
                        transform='rotate(-180 0 0)'
                        style={initial_arrow_style}
                        onPointerOver={()=>{this._restyle_arrow('#left-arrow',initial_value,final_value)}}
                        onPointerLeave={()=>{this._restyle_arrow('#left-arrow',final_value,initial_value)}}
                        onClick={()=>{this.props.navigate_through_graphs('left',data_length)}}
                    />
                    <SVGArrow
                        id='right-arrow'
                        style={initial_arrow_style}
                        onPointerOver={()=>{this._restyle_arrow('#right-arrow',initial_value,final_value)}}
                        onPointerLeave={()=>{this._restyle_arrow('#right-arrow',final_value,initial_value)}}
                        onClick={()=>{this.props.navigate_through_graphs('left',data_length)}}
                    />
                </div>

                <div className='gallery-container'>
                    {this.props.data.length === 0 ? null:
                        this.props.data.map((row,i) => {return(
                            <>{this.props.graph_idx_selection === i ? 
                                <>
                                    {row.type ==='svg' || row.type ==='react component'? <row.source />:null}
                                    <div key={i} className='graph-description-container'>
                                        <h3 className='graph-description-header'>Title</h3>
                                        <p className='graph-description'>{row.title}</p>
                                        <h3 className='graph-description-header'>Description</h3>
                                        <p className='graph-description'>{row.description}</p>
                                    </div>
                                </>
                            :null}</>
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
}

export default Slider;