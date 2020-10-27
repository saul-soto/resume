//excel:    images
//python:   images/svg's (as React Components)
//power bi: images(with urls to main report)/embedded report with graphs
//d3.js:    React Components

import React from 'react';
import MathJax from 'react-mathjax';
import {ReactComponent as MonteCarloSim} from './Python/montecarlo_simulation/graph.svg';
import {ReactComponent as NBABestPlayers} from './Python/top_best_nba_players/graph.svg';


const gallery_data = [
    {
        tool:'Python',
        source:MonteCarloSim,
        type:'svg',
        title:'Monte Carlo Simulation',
        description:'This is a montecarlo simulation using Matplotlib and pyplot'
    },
    {
        tool:'Python',
        source:NBABestPlayers,
        type:'svg',
        title: 
            <MathJax.Provider>
                Graph of function 
                <MathJax.Node formula={`f(x)=\\sin²(x)`} /> 
            </MathJax.Provider>,
        description:'This is a simple graph of a function using Matplotlib'
    },
]

export default gallery_data;