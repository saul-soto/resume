import React from 'react';
import gallery_data from './data/data.jsx';
import {ReactComponent as SVG_arrow} from '../../../../assets/arrow_right.svg';
import * as d3 from 'd3';

class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected_option: 'Python',
            opacity: .2

        }
    }

    render(){
        const initial_arrow_style = {
            fill:"rgba(26, 27, 31, "+this.state.opacity+")",
            height:'35px',
            width:'50px',
            cursor:'pointer'
        }

        return(
            <div className='content-gallery' id='nav-gallery_projects'>

                <h3 className='title'>Gallery<span>+</span>Projects</h3>

                <div className='gallery-menu'>
                    {[...new Set(this.props.gallery_data.map(r => r.tool))].map((tool,i)=>{return(
                        <p 
                            key={i} 
                            className='gallery-menu-option' 
                            id={tool!==this.state.selected_option ? null: 'is-selected'}
                            onClick={()=>{this.setState({selected_option:tool})}}
                        >
                            {tool}
                        </p>
                    )})}
                </div>

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

Gallery.defaultProps = {gallery_data}

export default Gallery;