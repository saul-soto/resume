import React from 'react';
import content from './data.jsx';
import * as d3 from 'd3';

class Skills extends React.Component{
    constructor(props){super(props);
        this.margins = {horizontal:30, vertical: 30};
        this.state = {
            height: null,
            width: null
        };

    }

    render(){
        const lang = this.props.lang;

        return(
            <div className='content-skills' id='nav-skills_tools'>
                <h3 className='title'>{content.labels[lang].skill_label}<span>+</span>{content.labels[lang].tool_label}</h3>

                <div id='skills-canvas-container'>
                    <svg 
                        id='skills-canvas'
                        height = {this.state.height} 
                        width = {this.state.width}
                        style = {{border: 'grey', borderStyle:'solid'}}
                    />                    
                </div>

            </div>
        )
    }

    _bind_implicit_data(){

    }

    _run_pattern(pattern){

    }

    _update_responsive_sizes(){
        const div_container = d3.select('#skills-canvas-container').node();
        const height = div_container.offsetHeight-this.margins.vertical;
        const width = div_container.offsetWidth-this.margins.horizontal;
        this.setState({ width, height });
        this._run_pattern('update');
    }

    componentDidMount(){
        this._update_responsive_sizes();
        window.addEventListener('resize', this._update_responsive_sizes.bind(this));

    }

}

export default Skills;