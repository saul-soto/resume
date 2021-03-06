import React from 'react';
import gallery_data from './data/data.jsx';
import Slider from './slider';
import content from './languages.jsx';


class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected_option: 'Power BI',
            graph_idx_selection: 0
        }
    }

    render(){
        return(
            <div className='content-gallery' id='nav-gallery_projects'>

                <h3 className='title'>{content[this.props.lang].gallery_label}<span>+</span>{content[this.props.lang].projects_label}</h3>

                <div className='gallery-menu'>
                    {['Excel','Power BI','Python','D3.js'].map((tool,i)=>{return(
                        <p 
                            key={i} 
                            className='gallery-menu-option' 
                            id={tool!==this.state.selected_option ? null: 'is-selected'}
                            onClick={()=>{this.setState({
                                selected_option:tool,
                                graph_idx_selection:tool===this.state.selected_option?this.state.graph_idx_selection:0
                            })}}
                        >
                            {tool}
                        </p>
                    )})}
                </div>

                <Slider 
                    data={this.props.gallery_data.filter(row => {return row.tool === this.state.selected_option})}
                    navigate_through_graphs={this._navigate_through_graphs.bind(this)}
                    graph_idx_selection={this.state.graph_idx_selection}
                />

            </div>
        )
    }

    _navigate_through_graphs(direction, data_length){
        if(data_length > 0){
            const go_around = true;
            const to_add = direction === 'left' ? -1 :1;
            let new_idx  = this.state.graph_idx_selection + to_add;
            //UPPER LIMIT
            new_idx = new_idx < data_length ? new_idx   :go_around ? 0 :data_length-1;
            //LOWER LIMIT
            new_idx = new_idx < 0                      ? go_around ? data_length-1: 0 :new_idx;

            this.setState({graph_idx_selection: new_idx});
        } else {
            this.setState({graph_idx_selection: direction});
        }
    }    
}

Gallery.defaultProps = {gallery_data}

export default Gallery;