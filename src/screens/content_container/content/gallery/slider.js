import React from 'react';
import * as d3 from 'd3';
import {ReactComponent as SVG_arrow} from '../../../../assets/arrow_right.svg';

class Slider extends React.Component{
    render(){
        const initial_arrow_style = {
            fill:"rgba(26, 27, 31, .2)",
            height:'35px',
            width:'50px',
            cursor:'pointer'
        }

        return(
            <div className='slider'>
                <div className='arrows-container'>
                    <SVG_arrow
                        id='left-arrow'
                        transform='rotate(-180 0 0)'
                        style={initial_arrow_style}
                        onPointerOver={()=>{this._transform_base_arrow('#left-arrow',.2,.8)}}
                        onPointerLeave={()=>{this._transform_base_arrow('#left-arrow',.8,.2)}}
                    />
                    <SVG_arrow
                        id='right-arrow'
                        style={initial_arrow_style}
                        onPointerOver={()=>{this._transform_base_arrow('#right-arrow',.2,.8)}}
                        onPointerLeave={()=>{this._transform_base_arrow('#right-arrow',.8,.2)}}
                    />
                    
                </div>
                
                <div className='circle-nav'></div>
        </div>
        )
    }

    _transform_base_arrow(id_name, inital_value, final_value){
        const basic_style = 'height:35px;width:50px;cursor:pointer';
        
        d3.select(id_name)
            .attr('style', basic_style)
            .attr('fill',"rgba(26, 27, 31, "+inital_value+")")
            .transition().duration(250)
            .attr('style',basic_style)
            .attr('fill',"rgba(26, 27, 31, "+final_value+")")
    }
}

export default Slider;