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
                .rollup(d=> {return { 
                    min: d3.min(d, d=>d.min_rad ), 
                    max: d3.max(d, d=>d.min_rad ) 
                }})
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
                        mir_rad: d.value.min,
                        max_rad: d.value.max,
                    }})
                })
            )
        ;
        
        return {tools, types, data};
    }

    _bind_implicit_data(){
        const canvas = d3.select('#skills-canvas');

        const modules = this._transform_data().data.filter(d=>d.is_module);
        console.table(modules);

        canvas.selectAll('path').data(modules)
            .enter().append('path')
                .attr('stroke', 'black')
                .attr('fill', 'none')
                .attr('transform', `translate(${this.state.width/2},${this.state.height/2})`)
                .attr('d', d => {
                    return (
                        d3.arc()({
                            innerRadius: 140,
                            outerRadius: 150,
                            startAngle: d.min_rad,
                            endAngle: d.max_rad
                        })
                    )
                })
        ;

        
        

        

        let data = content.skills[this.props.lang];
        const x_scaler = this._get_x_scaler();
        data = data.map((d,i)=>{
            d['radians'] = x_scaler(i)
            d['is_module'] = d.tool !== d.module
            return d
        });

        let grouped_is_modules =
            nest()
                .key(d=>d.type)
                .key(d=>d.tool)
                
                .rollup(d=>{
                    const min = d3.min(d, d=>d.radians );
                    const max = d3.max(d, d=>d.radians );
                    const middle = min+(max-min)/2;
                    return { min, max, middle }
                })
                .entries(data.filter(d => d.is_module===true))
        ;

        grouped_is_modules =
            d3.merge(grouped_is_modules.map(d=>d.values))
                .map(d=>{
                    d.value['tool'] = d.key;
                    return d.value
                })
        ;

        

        const labels_group = canvas.append('g')
            .attr('class', 'labels-group')
        ;

        labels_group
            .selectAll('labels-group').data(data)
                .enter().append('g')
                    .attr('class', 'label-container')

                        .append('text')
                            .attr('class', 'label')
        ;


        labels_group
            .selectAll('labels-group').data(grouped_is_modules)
                .enter().append('g')
                    .attr('class', 'missing-label-container')

                        .append('text')
                            .attr('class', 'missing-label')
        ;




        // console.table(data);
    }

    _run_pattern(pattern){


        if(pattern==='enter'){
            this._bind_implicit_data();
        }
        if(pattern==='update'){
            const canvas = d3.select('#skills-canvas');
            const x = this._get_x_scaler();

            const get_degrees = (radians) => {
                return radians + x.bandwidth()*0/2
            };


            canvas.selectAll('.labels-group')
                .attr('transform', `translate(${this.state.width/2},${this.state.height/2})`)
            ;

            canvas.selectAll('.label-container')
                .attr('transform', d => {
                    const degree =  get_degrees(d.radians) * (180 / Math.PI) - 90;
                    const rotate = `rotate(${degree})`;
                    const not_module_title = !d.is_module?0:40;
                    const translate = ` translate(${320-not_module_title},0)`;
                    return rotate + translate
                })
            ;

            canvas.selectAll('.label')
                .text(d=>d.module)
                .attr("font-size", 15)
                .attr("transform", (_,i) => (x(i) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                    ? "rotate(90)translate(0,16)"
                    : "rotate(-90)translate(0,-9)")
                .attr('text-anchor','middle')
            ;


            canvas.selectAll('.missing-label-container')
                .attr('transform', d => {
                    // console.log(d)
                    const degree =  get_degrees(d.middle) * (180 / Math.PI) - 90;
                    const rotate = `rotate(${degree})`;
                    const translate = ` translate(${320},0)`;
                    return rotate + translate
                })
            ;

            canvas.selectAll('.missing-label')
                .text(d=>d.tool)
                .attr("font-size", 15)
                .attr("transform", d => (x(d.middle) + Math.PI / 2) % (2 * Math.PI) < Math.PI
                    ? "rotate(-90)translate(0,16)"
                    : "rotate(90)translate(0,-9)")
                .attr('text-anchor','middle')
            ;



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