import React from 'react';
import content from './data_plain.jsx';
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

    _get_x_scaler(){
        const scaler = d3.scaleBand()
            .domain(d3.range(content.skills[this.props.lang].length))
            .range([0, 2*Math.PI])
        ;
        return scaler

    }

    _bind_implicit_data(){
        let data = content.skills[this.props.lang];
        const x_scaler = this._get_x_scaler();
        data = data.map((d,i)=>{
            d['radians'] = x_scaler(i)
            return d
        });

        const canvas = d3.select('#skills-canvas');

        canvas.append('g')
            .attr('class', 'labels-group')

                .selectAll('g').data(data)
                    .enter().append('g')
                        .attr('class', 'label-container')

                            .append('text')
                                .attr('class', 'label')
        ;




        console.table(data);
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
                    const translate = ` translate(200,0)`;
                    return rotate + translate
                })
            ;

            canvas.selectAll('.label')
                .text(d=>d.module)
                .style("font-size", 14)
                .attr("transform", (_,i) => (x(i) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                    ? "rotate(90)translate(0,16)"
                    : "rotate(-90)translate(0,-9)")
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