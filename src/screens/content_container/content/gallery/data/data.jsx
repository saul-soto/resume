//excel:    images
//python:   images/svg's (as React Components)
//power bi: images(with urls to main report)/embedded report with graphs
//d3.js:    React Components

import React from 'react';
import MathJax from 'react-mathjax';

import Excel_1 from './Excel/excel_1.png';
import {ReactComponent as MonteCarloSim} from './Python/montecarlo_simulation/graph.svg';
import {ReactComponent as NBABestPlayers} from './Python/top_best_nba_players/graph.svg';
import GoodnessOfFit from './D3.js/goodness_of_fit/graph';

console.log(Excel_1)

//ALL D3.JS MUST HAVE A <div className='react-component'>
const gallery_data = [
    {
        tool:'Excel',
        source:Excel_1,
        type:'png',
        title:'Excel Report',
        description:'This is a report using MS Excel',
        hide_info:true,
    },
    {
        tool:'Python',
        source:MonteCarloSim,
        type:'svg',
        title:'Monte Carlo Simulation',
        description:'This is a montecarlo simulation using Matplotlib and Pyplot',
        hide_info:false,
    },
    {
        tool:'Python',
        source:NBABestPlayers,
        type:'svg',
        title: 
            <MathJax.Provider>
                Graph of function of:
                <MathJax.Node formula={`\\sin\\left(\\frac{x}{2}\\right)`} /> 
                <MathJax.Node formula={`\\cos\\left(\\frac{x+\\pi}{2}  \\right)`} /> 
            </MathJax.Provider>,
        description:'This is a simple graph of a function using Matplotlib and Pyplot',
        hide_info:false
    },

    {
        tool:'D3.js',
        source: GoodnessOfFit,
        type:'react component',
        title:'Goodness of Fit',
        description:'Random simulation of goodness of fit',
        hide_info:false
    },
]

export default gallery_data;