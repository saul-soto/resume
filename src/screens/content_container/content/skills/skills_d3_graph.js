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
        const data = content.skills[this.props.lang];
        const data_by_type = [...new Set(data.map( d => {return d.type}))].map( type => {return (
            data.filter( t => {return  t.type===type})
        )});

        // TYPE-GROUPS
        const canvas = d3.select('#skills-canvas');
        canvas.selectAll('g').data( data_by_type )
            .enter().append('g')
                .attr('class', 'type-group')
                // .attr('id', (d) => {return d[0].type.split(' ').map( w => {return w.toLowerCase()}).join('-')})
        ;

        // FOR EACH TYPE-GROUP APPEND type-title, skills-group, expertise-data-group
        const all_type_groups = canvas.selectAll('.type-group');
            
        all_type_groups
            .append('text')
                .attr('class', 'type-title')
        ;

        all_type_groups
            .append('g')
                .attr('class', 'expertise-data-group')
        ;

        // FOR EACH skills-group APPEND THE A tool-group THAT CONTAINS tool-title AND ITS modules
        const tool_groups = all_type_groups
            .append('g')
                .attr('class', 'skills-group')

                    .selectAll('g').data((d) => {
                        return d.map(e => {
                            const modules = e.modules===null? 
                                [{name:e.tool, expertise:e.expertise, no_modules:true}]:
                                e.modules
                            return {tool:e.tool, modules}
                        });
                    })
                        .enter().append('g')
                            .attr('class', 'tool-group')
        ;

        tool_groups  
            .append('text')
                .attr('class', 'tool-title')
        ;

        
        tool_groups.filter( (d) => { return d.modules[0].no_modules !== true } )
            .append('g')
                .attr('class', 'tool-modules')

                    .selectAll('text').data( d => {return d.modules})
                        .enter().append('text')
                            .attr('class', 'modules')
        ;
        
        
    }

    _run_pattern(pattern){
        const canvas = d3.select('#skills-canvas');

        if(pattern==='enter'){
            this._bind_implicit_data();

        }
        if(pattern==='update'){
            canvas.selectAll('.type-title')
                .text((d)=>{return d[0].type})
            ;

            canvas.selectAll('.tool-title')
                .text((d)=>{return d.tool})

            canvas.selectAll('.modules')
                .text( (d)=>{return d.name})

        }
        if(pattern==='exit'){

        }

    }

    _update_responsive_sizes(){
        const div_container = d3.select('#skills-canvas-container').node();
        const height = div_container.offsetHeight-this.margins.vertical;
        const width = div_container.offsetWidth-this.margins.horizontal;
        this.setState({ width, height });
    }

    componentDidMount(){
        this._update_responsive_sizes();
        window.addEventListener('resize', this._update_responsive_sizes.bind(this));
        this._run_pattern('enter');
        this._run_pattern('update');
    }

}

export default Skills;