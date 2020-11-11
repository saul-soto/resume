import React from 'react';
import { select as d3select, range } from 'd3';
import {ReactComponent as SVGArrow} from '../../../../assets/arrow_right.svg';
import { debounce } from 'debounce';

class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flex_direction: '',
            width:0,
            height:0,
            media_query: 'other-but-potrait',
            isChrome: false
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
                        onClick={()=>{this.props.navigate_through_graphs('right',data_length)}}
                    />
                </div>

                <div className={'gallery-container'}>
                    {this.props.data.length === 0 ? null:
                        this.props.data.map((row,i) => {return(
                            <>{this.props.graph_idx_selection === i ? 
                                <>
                                    {/* POWER BI PDF TO SVG */}
                                    {row.type === 'svg' && row.tool === 'Power BI' ? 
                                        <svg
                                            width='100%'
                                            height='auto'
                                            viewBox={this.state.media_query==='other-but-portrait'?'50 10 90 150':'0 70 220 100'}
                                        >
                                            <g transform={this.state.media_query==='other-but-portrait'?'scale(.24) translate(-100,0)':'scale(.3) translate(-20,0)'}>
                                                {this.state.media_query==='other-but-portrait'?
                                                    <row.source />:
                                                    <row.portrait_version />
                                                }
                                            </g>
                                        </svg>

                                    // PYTHON SVGS
                                    :row.type ==='svg' && row.tool === 'Python'? 
                                        <svg 
                                            width={this.state.media_query==='other-but-portrait'?'50%':'100%'}
                                            height='auto'
                                            viewBox={`0 0 ${this.state.media_query==='other-but-portrait'?100:90} 80`}
                                            preserveAspectRatio="none"
                                        >
                                            <g transform='scale(.2)'>
                                                <row.source />
                                            </g>
                                        </svg>

                                    // D3 REACT COMPONENTS
                                    :row.type ==='svg' || row.type === 'react component'? 
                                        <row.source /> 

                                    // SIMPLE IMAGES
                                    :row.type === 'png' ? 
                                        <img onCompositionEnd id='image-source' src={row.source} alt="_" />
                                    :null
                                    }
                                    <div key={i} className='graph-description-container'>
                                        {row.hide_info ? null:
                                            <>
                                                <h3 className='graph-description-header'>Title</h3>
                                                <p className='graph-description'>{row.title}</p>
                                                    <h3 className='graph-description-header'>Description</h3>
                                                <p className='graph-description'>{row.description}</p>
                                            </>
                                        }
                                    </div>
                                </>
                            :null}</>
                        )})
                    }
                </div>

                <div className='navigation-identifier'>
                    <div className='identifiers-container'>
                        {range(data_length).map(i => {return (
                            
                            <div 
                                className='identifier-cont'
                                style={{width:100/this.props.data.length+'%'}}
                                // onClick={() => {this.props.navigate_through_graphs(i,[])}}
                            >
                                <div 
                                    key={i} 
                                    className='identifier' 
                                    id= {i===this.props.graph_idx_selection && data_length > 1?'is_selected': data_length === 1 ? 'only-one-element': null}
                                    
                                >
                                </div>
                            </div>


                            
                        )})}

                    </div>

                    {/* <p className='note'>**Data is random and used for display purposes only</p> */}
                </div>
                
        </div>
        )
    }

    _restyle_arrow(id_name, initial_value, final_value){
        const basic_style = 'height:35px;width:50px;cursor:pointer;z-index:999';
        
        d3select(id_name)
            .attr('style', basic_style)
            .attr('fill',"rgba(26, 27, 31, "+initial_value+")")
            .transition().duration(350)
            .attr('style',basic_style)
            .attr('fill',"rgba(26, 27, 31, "+final_value+")")
    }

    _update_media_query(){
        const look_for_style = (style) => {
            return d3select('.content-gallery').style(style)
        }
        this.setState({ media_query: look_for_style('animation-name')});
    }

    async componentDidMount(){
        await this._update_media_query();
        window.addEventListener('resize', debounce(this._update_media_query.bind(this), 1000 ))
        const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
        this.setState({ isChrome })
    }

}

export default Slider;