import React from 'react';
import content from './data.jsx';
import * as d3 from 'd3';

class Skills extends React.Component{
    constructor(props){super(props);
        this.margins = {horizontal:30, vertical: 30};
        this.state = {
            height: 0,
            width: 0
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
        canvas.selectAll('svg').data( data_by_type )
            .enter().append('svg')
                .attr('class', 'type-group')
                // .attr('id', (d) => {return d[0].type.split(' ').map( w => {return w.toLowerCase()}).join('-')})
        ;

        // FOR EACH TYPE-GROUP APPEND type-title, skills-group, expertise-data-group
        const all_type_groups = canvas.selectAll('.type-group');
            
        all_type_groups
            .append('text')
                .attr('class', 'type-title')
        ;

        // FOR EACH skills-group APPEND THE A tool-group THAT CONTAINS tool-title AND ITS modules
        const tool_groups = all_type_groups
            .append('svg')
                .attr('class', 'skills-group')

                    .selectAll('svg').data((d) => {
                        return d.map(e => {
                            const modules = e.modules===null? 
                                [{name:e.tool, expertise:e.expertise, no_modules:true}]:
                                e.modules
                            return {type:e.type, tool:e.tool, modules}
                        });
                    })
                        .enter().append('svg')
                            .attr('overflow','auto')
                            .attr('id', (d) => {return d.type})
                            .attr('class', 'tool-group')
        ;

        tool_groups  
            .append('text')
                .attr('class', 'tool-title')
        ;

        // FOR EACH module-group BIND THEIR module-title AND THEIR expertise-group
        const tool_groups_modules = 
            tool_groups
                .append('g')
                    .attr('class', 'tool-modules')
        ;

        const module_group = 
            tool_groups_modules
                .selectAll('g').data( d => {return d.modules} )
                    .enter().append('g')
                        .attr('class', 'module-group')

        module_group
            .append('text')
                .attr('is-module', (d) => { return !d.no_modules ? true: false})
                .attr('class', 'module-title')
        ;

        // FOR EACH expertise-group BIND THE FIGURES FOR EACH EXPERTISE LEVEL
        module_group
            .append('g')
                .attr('class', 'expertise-group')
                    
                    .selectAll('circle').data( d => {return d3.range(d.expertise)})
                        .enter().append('circle')
                            .attr('class', 'expertise')
        ;
        
    }

    _run_pattern(pattern){


        if(pattern==='enter'){
            this._bind_implicit_data();
        }
        if(pattern==='update'){
            const canvas = d3.select('#skills-canvas');
            const { width, height } = this.state;
            const data = content.skills[this.props.lang];
            const unique_types = [...new Set( data.map( d => {return d.type}) )]
            const number_types = unique_types.length;

            const type_height = height/number_types;

            canvas.selectAll('.type-group')
                .attr('transform', (d,i)=>{
                    const type = d[0].type;
                    return `translate(0,${(height/number_types)*i})`
                })
                .attr('width',  width)
                .attr('height', type_height)
            ;

            canvas.selectAll('.type-title')
                .text((d)=>{return d[0].type})
                .attr('height', type_height)
                // .attr('y', height/2)
            ;

            // canvas.selectAll('.skills-group')
            //     .attr('height', height/2-30)
            // ;



            // unique_types.map( (type) => {
            //     const n_tools = data.filter( d => {return d.type === type}).length;
            //     const x_distance =  (width/number_types)/n_tools;

            //     canvas.selectAll('.tool-group')
            //         .filter( d => {return d.type === type})
            //             .attr('transform', (_,i) => {return `translate(${  x_distance*(i)  }, ${height/2-40} )`})
            //             .attr('width',x_distance) 
            //     ;
            // })
                

            // ;
            // canvas.selectAll('.tool-title')
            //     .text( d =>{return d.tool})
            //     .attr('font-size', 12)
            // ;

            // canvas.selectAll('.module-title')
            //     .text( (d)=>{return d.no_modules ? '': d.name})
            //     .attr('y', -30)
            //     .attr('font-size', 12)

            // canvas.selectAll('.expertise')
            //     .attr('cy', (d) => {return d})

        }
        if(pattern==='exit'){

        }

    }

    _update_responsive_sizes(){
        const div_container = d3.select('#skills-canvas-container').node();
        const height = div_container.offsetHeight-this.margins.vertical;
        const width = div_container.offsetWidth-this.margins.horizontal;
        this.setState({ width, height });
        this._run_pattern('update');
    }

    async componentDidMount(){
        await this._update_responsive_sizes();
        window.addEventListener('resize', this._update_responsive_sizes.bind(this));
        await this._run_pattern('enter');
        await this._run_pattern('update');
    }

}

export default Skills;