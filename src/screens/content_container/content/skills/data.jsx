const labels = {
    english: {
        skill_label:'Skills',
        tool_label:'Tools'
    },
    spanish: {
        skill_label:'Habilidades',
        tool_label:'Herramientas'
    },
}

const skills = {
    english:[
        {
            type: 'Data Preprocessing', 
            tool: 'MySQL',
            modules: null,
            expertise:3
        },
        {
            type: 'Data Preprocessing', 
            tool: 'MS SQL',
            modules: null,
            expertise:4
        },
        {
            type: 'Data Preprocessing', 
            tool: 'Python',
            modules: [{name:'Pandas', expertise:4}],
        },
        {
            type: 'Data Preprocessing', 
            tool: 'Qlik',
            modules: [{name:'View',expertise:3},{name:'Sense',expertise:4}]
        },
        {
            type: 'Data Preprocessing', 
            tool: 'MS Excel',
            modules: null,
            expertise:5
        },



        {
            type: 'Descriptive Analysis', 
            tool: 'Python',
            modules: [
                  {name:'Pandas', expertise:4},
                  {name:'Numpy', expertise:3},
                  {name:'Matplotlib', expertise:3}
            ]
        },
        {
            type: 'Descriptive Analysis', 
            tool: 'Power BI',
            modules: [
                {name:'DAX Language',expertise:3}, 
                {name:'Custom Visualizations', expertise:4}, 
                {name:'Dashboard & Reports', expertise:5}
            ]
        },
        {
            type: 'Descriptive Analysis', 
            tool: 'D3.js visualizations',
            modules: null,
            expertise: 4
        },
        {
            type: 'Descriptive Analysis', 
            tool: 'MS Excel',
            modules: null,
            expertise:5
        },

        {
            type: 'Predictive Analysis', 
            tool: 'Python',
            modules: [
                  {name:'scikit-learn', expertise:4},
                  {name:'scipy', expertise:3},
                  {name:'tensorflow', expertise:3}
            ]
        },
    ],
    spanish:[
        {
            type: 'Extracción de Datos', 
            tool: 'MySQL',
            modules: null,
            expertise:3
        },
        {
            type: 'Extracción de Datos', 
            tool: 'MS SQL',
            modules: null,
            expertise:4
        },
        {
            type: 'Extracción de Datos', 
            tool: 'Python',
            modules: [{name: 'Pandas', expertise:4}],
        },
        {
            type: 'Extracción de Datos', 
            tool: 'Qlik',
            modules: [{name:'View',expertise:3},{name:'Sense',expertise:4}]
        },
        {
            type: 'Extracción de Datos', 
            tool: 'MS Excel',
            modules: null,
            expertise:5
        },



        {
            type: 'Análisis Descriptivo', 
            tool: 'Python',
            modules: [
                  {name:'Pandas', expertise:4},
                  {name:'Numpy', expertise:3},
                  {name:'Matplotlib', expertise:3}
            ]
        },
        {
            type: 'Análisis Descriptivo', 
            tool: 'Power BI',
            modules: [
                {name:'Lenguage DAX', expertise:3}, 
                {name:'Visualizaciones Personalizadas', expertise: 4}, 
                {name:'Dashboard & Reportes', expertise:5}
            ]
        },
        {
            type: 'Análisis Descriptivo', 
            tool: 'D3.js visualizaciones',
            modules: null,
            expertise: 4
        },
        {
            type: 'Análisis Descriptivo', 
            tool: 'MS Excel',
            modules: null,
            expertise:5
        },

        {
            type: 'Análisis Predictivo', 
            tool: 'Python',
            modules: [
                  {name:'scikit-learn', expertise:4},
                  {name:'scipy', expertise:3},
                  {name:'tensorflow', expertise:3}
            ]
        },
    ],
    
    
};

const content = {labels, skills};

export default content;