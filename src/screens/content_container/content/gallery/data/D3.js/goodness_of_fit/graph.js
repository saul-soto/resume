import React from 'react';
import create_data from './data'
import * as d3 from 'd3';


class GoodnessOfFit extends React.Component{
    render(){
        return(
            <div className='react-component'></div>
        )
    }

    _bind_invisibe_elements(){
        const data = create_data(30, 1,.5,3);
        console.log(data);
    }

    _update_sizes(){
        const node = d3.select('.react-component').node();
        this._update_binded_elements(node.offsetHeight, node.offsetWidth)
    }

    componentDidMount(){
        this._bind_invisibe_elements();
        window.addEventListener('resize', this._update_sizes.bind(this));
        this._update_sizes();
    }

    _update_binded_elements(height, width){
        console.log('new sizes',height,width);
    }
}

export default GoodnessOfFit;