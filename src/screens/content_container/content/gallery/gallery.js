import React from 'react';
import gallery_data from './data/data.jsx';
import Slider from './slider';


class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected_option: 'D3.js',
        }
    }

    render(){
        return(
            <div className='content-gallery' id='nav-gallery_projects'>

                <h3 className='title'>Gallery<span>+</span>Projects</h3>

                <div className='gallery-menu'>
                    {['Excel','Python','Power BI','D3.js'].map((tool,i)=>{return(
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

                <Slider data={this.props.gallery_data.filter(row => {return row.tool === this.state.selected_option})}/>

            </div>
        )
    }
}

Gallery.defaultProps = {gallery_data}

export default Gallery;