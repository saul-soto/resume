import React from 'react';
import content from './data_plain.jsx';
import * as d3 from 'd3';
import { nest } from 'd3-collection';

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

    _get_x_scaler(){
        return d3.scaleBand()
            .domain(d3.range(content.skills[this.props.lang].length))
            .range([0, 2*Math.PI])
        ;
    }

    _transform_data(){
        const x = this._get_x_scaler();

        const data = 
            content.skills[this.props.lang].map((d,i)=>{
                d['is_module'] = d.tool !== d.module
                d['min_rad'] = x(i)
                d['max_rad'] = x(i) + x.bandwidth()
                return d
            })
        ;

        const type_tool_grouped = (is_filtered_by_modules) => {
            return (
                nest()
                .key(d=>d.type).key(d=>d.tool)
                .rollup(d=> {
                    const min = d3.min(d, d=>d.min_rad );
                    const max = d3.max(d, d=>d.min_rad ) + x.bandwidth();
                    return { min, max }
                })
                .entries(data.filter(d=>is_filtered_by_modules?d.is_module:true) )
            )

        }

        const types = 
            type_tool_grouped(false).map(d=>{return {
                type: d.key,
                min_rad: d3.min(d.values.map(d=>d.value.min)),
                max_rad: d3.max(d.values.map(d=>d.value.max))
            }})
        ;

        const tools = 
            d3.merge(
                type_tool_grouped(true).map(d=>d.values).map(d=>{
                    return d.map(d=>{return {
                        tool: d.key,
                        min_rad: d.value.min,
                        max_rad: d.value.max,
                    }})
                })
            )
        ;
        
        return {tools, types, modules: data};
    }

    _bind_implicit_data(){
        const { modules, tools } = this._transform_data();
        
        const canvas = d3.select('#skills-canvas');

        const radius = 70;
        const y_offset = 30;

        const bind_modules = () => {
            const modules_selection = 
                canvas
                    .append('g')
                        .attr('class', 'modules')
                            .selectAll('path').data(modules);

            const modules_groups = 
                modules_selection
                    .enter().append('g')
                        .attr('class', 'module-group')
                        
            ;

            modules_groups
                .append('path')
                    .attr('id', (_,i) => 'arc-text'+i)
                    .attr('fill', 'none')
                    .attr('transform', `translate(${this.state.width/2},${this.state.height/2})`)
                    .attr('stroke', d => d.is_module?'black':'red')
                    .attr('d', d => {return (
                        d3.arc()({
                            innerRadius: radius-10,
                            outerRadius: radius,
                            startAngle: d.min_rad,
                            endAngle: d.max_rad
                        })
                    )})
            ;

            modules_groups
                .append('text').append('textPath')
                    .attr('xlink:href', (_,i) => '#arc-text'+i)
                    .attr('font-size', 12)
                    .text(d=>d.module)
                    .attr('fill',d=>d.is_module?'black':'red')
            ;

        }

        const bind_tools = () => {
            const types_selection = 
                canvas
                    .append('g')
                        .attr('class', 'types')

                            .selectAll('g').data(tools)
            ;

            const type_groups = 
                types_selection
                    .enter().append('g')
                        .attr('class', 'type-group')
            ;

            type_groups
                .append('path')
                    .attr('id', (_,i)=>'type-arc-'+i)
                    .attr('fill','none')
                    .attr('stroke', 'black')
                    .attr('transform', `translate(${this.state.width/2},${this.state.height/2})`)
                    .attr('d', d=>{return(
                        d3.arc()({
                            innerRadius: radius-10+y_offset,
                            outerRadius: radius+y_offset,
                            startAngle: d.min_rad,
                            endAngle: d.max_rad
                        })
                    )})
            ;

            type_groups
                .append('text').append('textPath')
                    .attr('xlink:href', (_,i)=>'#type-arc-'+i)
                    .text(d=>d.tool)
            ;

            console.table(tools);
        }

        bind_modules();
        bind_tools();

    }

    _run_pattern(pattern){


        if(pattern==='enter'){
            this._bind_implicit_data();
        }
        if(pattern==='update'){

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