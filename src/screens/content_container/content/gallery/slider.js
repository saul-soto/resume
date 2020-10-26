import React from 'react';
import * as d3 from 'd3';
import {ReactComponent as SVGArrow} from '../../../../assets/arrow_right.svg';
import {ReactComponent as SVGCircle} from '../../../../assets/circle.svg';

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

        return(
            <div className='slider'>                
                <div className='arrows-container'>
                    <SVGArrow
                        id='left-arrow'
                        transform='rotate(-180 0 0)'
                        style={initial_arrow_style}
                        onPointerOver={()=>{this._transform_base_arrow('#left-arrow',initial_value,final_value)}}
                        onPointerLeave={()=>{this._transform_base_arrow('#left-arrow',final_value,initial_value)}}
                    />
                    <SVGArrow
                        id='right-arrow'
                        style={initial_arrow_style}
                        onPointerOver={()=>{this._transform_base_arrow('#right-arrow',initial_value,final_value)}}
                        onPointerLeave={()=>{this._transform_base_arrow('#right-arrow',final_value,initial_value)}}
                    />
                </div>

                <div className='gallery-container'></div>

                <div className='circle-container'>
                    <SVGCircle width='20px' fill='lightgrey' style={{cursor:'pointer'}}/>
                    <SVGCircle width='20px' fill='lightgrey' style={{cursor:'pointer'}}/>
                </div>
        </div>
        )
    }

    _transform_base_arrow(id_name, initial_value, final_value){
        const basic_style = 'height:35px;width:50px;cursor:pointer;z-index:999';
        
        d3.select(id_name)
            .attr('style', basic_style)
            .attr('fill',"rgba(26, 27, 31, "+initial_value+")")
            .transition().duration(300)
            .attr('style',basic_style)
            .attr('fill',"rgba(26, 27, 31, "+final_value+")")
    }
}

export default Slider;