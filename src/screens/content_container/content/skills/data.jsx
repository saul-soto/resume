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
            modules: null
        },
        {
            type: 'Data Preprocessing', 
            tool: 'MS SQL',
            modules: null
        },
        {
            type: 'Data Preprocessing', 
            tool: 'Python Pandas',
            modules: null
        },
        {
            type: 'Data Preprocessing', 
            tool: 'Qlik',
            modules: ['View','Sense']
        },
        {
            type: 'Data Preprocessing', 
            tool: 'MS Excel',
            modules: null
        },



        {
            type: 'Descriptive Analysis', 
            tool: 'Python',
            modules: ['Pandas','Numpy','Matplotlib']
        },
        {
            type: 'Descriptive Analysis', 
            tool: 'Power BI',
            modules: ['DAX Language', 'Custom Visualizations', 'Dashboard & Reports']
        },
        {
            type: 'Descriptive Analysis', 
            tool: 'D3.js visualizations',
            modules: null
        },
        {
            type: 'Descriptive Analysis', 
            tool: 'MS Excel',
            modules: null
        },

        {
            type: 'Predictive Analysis', 
            tool: 'Python',
            modules: ['scikit-learn','scipy','tensorflow']
        },
    ],
    spanish:[
        {
            type: 'Extracción de Datos', 
            tool: 'MySQL',
            modules: null
        },
        {
            type: 'Extracción de Datos', 
            tool: 'MS SQL',
            modules: null
        },
        {
            type: 'Extracción de Datos', 
            tool: 'Python Pandas',
            modules: null
        },
        {
            type: 'Extracción de Datos', 
            tool: 'Qlik',
            modules: ['View','Sense']
        },
        {
            type: 'Extracción de Datos', 
            tool: 'MS Excel',
            modules: null
        },



        {
            type: 'Análisis Descriptivo', 
            tool: 'Python',
            modules: ['Pandas','Numpy','Matplotlib']
        },
        {
            type: 'Análisis Descriptivo', 
            tool: 'Power BI',
            modules: ['Lenguage DAX', 'Visualizaciones Personalizadas', 'Dashboard & Reportes']
        },
        {
            type: 'Análisis Descriptivo', 
            tool: 'D3.js visualizaciones',
            modules: null
        },
        {
            type: 'Análisis Descriptivo', 
            tool: 'MS Excel',
            modules: null
        },

        {
            type: 'Análisis Predictivo', 
            tool: 'Python',
            modules: ['scikit-learn','scipy','tensorflow']
        },
    ],
    
    
};

const content = {labels, skills};

export default content;