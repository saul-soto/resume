//excel:    images
//python:   images/svg's (as React Components)
//power bi: images(with urls to main report)/embedded report with graphs
//d3.js:    React Components

import React from 'react';
import MathJax from 'react-mathjax';

//EXCEL
import MetallurgicDashboard from './Excel/excel_metallurgic.png';
import RetentionAnalysis from './Excel/retention_analysis.png';

//POWER BI
import { ReactComponent as TripAdvisor } from './Power BI/TripAdvisor WebScraping Landscape.svg';
import { ReactComponent as Telemarketing } from './Power BI/telemarketing landscape.svg';
import { ReactComponent as TelemarketingQuality } from './Power BI/telemarketing quality landscape.svg';

import { ReactComponent as TelemarketingPortrait } from './Power BI/telemarketing portrait.svg';
import { ReactComponent as TelemarketingQualityPortrait } from './Power BI/telemarketing quality portrait.svg';
import { ReactComponent as TripAdvisorPortrait } from './Power BI/TripAdvisor WebScraping Portrait.svg';


//PYTHON
import {ReactComponent as MonteCarloSim} from './Python/montecarlo_simulation/graph.svg';
import {ReactComponent as NBABestPlayers} from './Python/top_best_nba_players/graph.svg';

//D3.js
import GoodnessOfFit from './D3.js/goodness_of_fit/graph';
import MonteCarloGraph from './D3.js/montecarlo_animation/graph';

//ALL D3.JS MUST HAVE A <div className='react-component'>
const gallery_data = [
    {
        tool:'Excel',
        source:MetallurgicDashboard,
        type:'png',
        title:'Excel Report',
        description:'This is a dashboard using MS Excel',
        hide_info:true,
    },
    {
        tool:'Excel',
        source:RetentionAnalysis,
        type:'png',
        title:'Excel Report',
        description:'This is a report using MS Excel',
        hide_info:true,
    },

    {
        tool:'Power BI',
        source:Telemarketing,
        type:'svg',
        title:'Power BI Report',
        description:'Test',
        hide_info:true,
        portrait_version: TelemarketingPortrait
    },

    {
        tool:'Power BI',
        source:TripAdvisor,
        type:'svg',
        title:'Power BI Report',
        description:'Test',
        hide_info:true,
        portrait_version: TripAdvisorPortrait
    },
    {
        tool:'Power BI',
        source:TelemarketingQuality,
        type:'svg',
        title:'Power BI Report',
        description:'This is a report using PBI',
        hide_info:true,
        portrait_version: TelemarketingQualityPortrait
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
        source: MonteCarloGraph,
        type:'react component',
        title:'Random Walk',
        description:'A random walk given a probability of going up/down',
        hide_info:false
    },
    {
        tool:'D3.js',
        source: GoodnessOfFit,
        type:'react component',
        title:'A simple histogram',
        description:'A simple histogram',
        hide_info:false
    },


]

export default gallery_data;