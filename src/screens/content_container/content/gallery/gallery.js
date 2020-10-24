import React from 'react';
import gallery_data from './data/data.jsx';

class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected_option: 'Python'
        }
    }

    render(){
        return(
            <div className='content-gallery'>

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


            </div>
        )
    }
}

Gallery.defaultProps = {gallery_data}

export default Gallery;