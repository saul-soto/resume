//excel:    images
//python:   images/svg's
//power bi: images(with urls to main report)/embedded report with graphs
//d3.js:    react components
import React from 'react';
import {ReactComponent as MonteCarloSim} from './Python/montecarlo_simulation/graph.svg';


const gallery_data = [
    {
        tool:'Python',
        source:<MonteCarloSim />,
        type:'svg',
        description:'This is a montecarlo simulation using Python'
    },
]

export default gallery_data;