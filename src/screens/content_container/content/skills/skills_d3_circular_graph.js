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
        // const lang = this.props.lang;

        return(
            <div className='content-skills' id='nav-skills_tools'>
                {/* <h3 className='title'>{content.labels[lang].skill_label}<span>+</span>{content.labels[lang].tool_label}</h3> */}

                <div id='skills-canvas-container'>
                    <svg 
                        id='skills-canvas'
                        height = {this.state.height} 
                        width = {this.state.width}
                        overflow = 'visible'
                        // style = {{border: 'grey', borderStyle:'solid'}}
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
        const { modules, tools, types  } = this._transform_data();
        const { width, height } = this.state;
        
        const radius = 110;
        const y_offset = 35;
        const font_size = 12;

        const canvas = d3.select('#skills-canvas');

        canvas.append('text')
            .text('Skills & Tools')
            .attr('transform', `translate(${width/2}, ${height/2})`)
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Helvetica')
            .attr('font-size', font_size+8) 
        ;

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
                    .attr('transform', `translate(${width/2},${height/2})`)
                    .attr('d', d => {return (
                        d3.arc()({
                            outerRadius: radius+20,
                            startAngle: d.min_rad,
                            endAngle: d.max_rad
                        })
                    )})
            ;

            modules_groups
                .append('text').append('textPath')
                    .attr('xlink:href', (_,i) => '#arc-text'+i)
                    .attr('font-size', font_size)
                    .attr('font-weight', d=>d.is_module?500:600)
                    .text(d=>d.module)
                    .attr('startOffset', '50%')
                    .attr('text-anchor', 'middle')
                    .attr('fill',d=>d.is_module?'grey':'black')

            ;

        }



        const bind_tools = () => {
            const types_selection = 
                canvas
                    .append('g')
                        .attr('class', 'tools')

                            .selectAll('g').data(tools)
            ;

            const type_groups = 
                types_selection
                    .enter().append('g')
                        .attr('class', 'tool-group')
            ;

            type_groups
                .append('path')
                    .attr('id', (_,i)=>'tool-arc-'+i)
                    .attr('transform', `translate(${width/2},${height/2})`)
                    .attr('fill','none')
                    .attr('d', d=>{return(
                        d3.arc()({
                            // innerRadius: radius-y_offset*.5-10,
                            outerRadius: radius-y_offset*.5,
                            startAngle: d.min_rad,
                            endAngle: d.max_rad
                        })
                    )})

            type_groups
                .append('path')
                    .attr('fill','none')
                    .attr('stroke', 'grey')
                    .attr('stroke-dasharray', '1,1')
                    .attr('transform', `translate(${width/2},${height/2})`)
                    .attr('d', d=>{return(
                        d3.arc()({
                            innerRadius: radius-y_offset+170,
                            outerRadius: radius-y_offset*.5,
                            startAngle: d.min_rad,
                            endAngle: d.max_rad
                        })
                    )})
            ;

            type_groups
                .append('text')
                    .attr("dy", -8)
                        .append('textPath')
                            .attr('xlink:href', (_,i)=>'#tool-arc-'+i)
                            .text(d=>d.tool)
                            .attr('font-weight', 500)
                            .attr('font-size',font_size)
                            .attr('startOffset', '50%')
                            .attr('text-anchor', 'middle')
                    
            ;
        }



        const bind_types = () => {
            const types_selection = 
                canvas
                    .append('g')
                        .attr('class', 'types')
                            .selectAll('g').data(types)
            ;

            const types_groups = 
                types_selection
                    .enter().append('g')
                        .attr('class', 'type-group')
            ;

            types_groups
                .append('path')
                    .attr('id', (_,i)=>'type-arc-'+i)
                    .attr('transform', `translate(${width/2},${height/2})`)
                    .attr('stroke', 'lightgrey')
                    .attr('stroke-width',2)
                    .attr('opacity', .6)
                    .attr('fill', 'none')
                    .attr('d', d=>{return(
                        d3.arc()({
                            innerRadius: radius-y_offset+170,
                            outerRadius: radius-y_offset,
                            startAngle: d.min_rad,
                            endAngle: d.max_rad
                        })
                    )})
            ;

            types_groups
                .append('text')
                    .attr('dy',-8)
                        .append('textPath')
                            .attr('xlink:href', (_,i)=>'#type-arc-'+i)
                            .text(d=>d.type)
                            .attr('font-family', 'Helvetica')
                            .attr('font-size',font_size +8)
                            .attr('startOffset', '25%')
                            .attr('text-anchor', 'middle')
            ;
        }





        const bind_expertise = () => {
            const expertise_selection =
                canvas.append('g')
                    .attr('class', 'expertise')
                        .selectAll('g').data(d3.range(1,6).map(thold => {
                            return(
                                modules.filter(d=>thold<=d.expertise).map(d=>{return {
                                    thold,min_rad:d.min_rad, max_rad:d.max_rad
                                }})
                            )
                        }))
            ;
            
            const expertise_groups = 
                expertise_selection
                    .enter().append('g')
                        .attr('transform', `translate(${width/2},${height/2})`)
                        .attr('class',(_,i)=>'exp-group-'+i)
            ; 

            // EXPERTISE
            expertise_groups
                .selectAll('path').data(d=>d)
                    .enter().append('path')
                        .attr('stroke','lightgrey')
                        .attr('fill','darkred')
                        .attr('opacity', d=>(d.thold)*.18+0)
                        .attr('d', d=>{return(
                            d3.arc()({
                                innerRadius: 30+radius+(y_offset/2)*d.thold+10,
                                outerRadius: 30+radius+(y_offset/2)*d.thold,
                                startAngle: d.min_rad+.1,
                                endAngle: d.max_rad-.1
                            })
                        )})
            ;
            
            
        }

        bind_modules();
        bind_tools();
        bind_types();
        bind_expertise();

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