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
import DashboardSentimentAnalysis from './Power BI/pbi_dashboard.png';
import DashboardTelemarketing from './Power BI/pbi_dashboard_1.png';
import DailyTrend from './Power BI/pbi_daily_trend.png';
import GoalsForecast from './Power BI/pbi_goals_forecast.png';

//PYTHON
import {ReactComponent as MonteCarloSim} from './Python/montecarlo_simulation/graph.svg';
import {ReactComponent as NBABestPlayers} from './Python/top_best_nba_players/graph.svg';

//D3.js
import GoodnessOfFit from './D3.js/goodness_of_fit/graph';

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
        source:DashboardSentimentAnalysis,
        type:'png',
        title:'Power BI Report',
        description:'This is a report using PBI',
        hide_info:true,
    },

    {
        tool:'Power BI',
        source:DashboardTelemarketing,
        type:'png',
        title:'Power BI Report',
        description:'This is a report using PBI',
        hide_info:true,
    },
    
    {
        tool:'Power BI',
        source:DailyTrend,
        type:'png',
        title:'Power BI Report',
        description:'This is a report using PBI',
        hide_info:true,
    },

    {
        tool:'Power BI',
        source:GoalsForecast,
        type:'png',
        title:'Power BI Report',
        description:'This is a report using PBI',
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