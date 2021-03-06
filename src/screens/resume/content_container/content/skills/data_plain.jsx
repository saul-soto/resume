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
            
            type: 'I - Transforming Data', 
            tool: 'SQL',
            module: 'SQL',
            expertise: 4
        },
        {
            
            type: 'I - Transforming Data', 
            tool: 'Python',
            module: 'Pandas',
            expertise: 4
        },
        {
            
            type: 'I - Transforming Data', 
            tool: 'Qlik',
            module: 'View',
            expertise: 3
        },
        {
            
            type: 'I - Transforming Data', 
            tool: 'Qlik',
            module: 'Sense',
            expertise: 2
        },
        {
            
            type: 'II - Describing Data', 
            tool: 'Python',
            module: 'Pandas', 
            expertise: 4
        },
        {
            
            type: 'II - Describing Data', 
            tool: 'Python',
            module: 'Numpy', 
            expertise: 3
        },
        {
            
            type: 'II - Describing Data', 
            tool: 'Python',
            module: 'Pyplot', 
            expertise: 3
        },
        {
            
            type: 'II - Describing Data', 
            tool: 'PowerBI',
            module: 'PowerBI', 
            expertise: 5
        },
        {
            
            type: 'II - Describing Data', 
            tool: 'D3.js',
            module: 'D3.js',
            expertise: 4
        },
        {
            
            type: 'II - Describing Data', 
            tool: 'Excel',
            module: 'Excel',
            expertise: 5
        },

        {
            
            type: 'III - Predictive Modeling', 
            tool: 'Python',
            module: 'Sklearn', 
            expertise: 4
        },
        {
            
            type: 'III - Predictive Modeling', 
            tool: 'Python',
            module: 'Scipy', 
            expertise: 3
        },
        {
            
            type: 'III - Predictive Modeling', 
            tool: 'Python',
            module: 'Tensorflow', 
            expertise: 3
        },
    ],
    spanish:[
        {
            
            type: 'Extracción de Datos', 
            tool: 'MySQL',
            module: 'MySQL',
            expertise: 3
        },
        {
            
            type: 'Extracción de Datos', 
            tool: 'MS SQL',
            module: 'MS SQL',
            expertise: 4
        },
        {
            
            type: 'Extracción de Datos', 
            tool: 'Python',
            module: 'Pandas', 
            expertise: 4
        },
        {
            
            type: 'Extracción de Datos', 
            tool: 'Qlik',
            module: 'View',
            expertise: 3

        },
        {
            
            type: 'Extracción de Datos', 
            tool: 'Qlik',
            module: 'Sense',
            expertise:4
        },
        {
            
            type: 'Extracción de Datos', 
            tool: 'MS Excel',
            module: 'MS Excel',
            expertise: 5
        },
        {
            
            type: 'Análisis Descriptivo', 
            tool: 'Python',
            module: 'Pandas', 
            expertise: 4
        },
        {
            
            type: 'Análisis Descriptivo', 
            tool: 'Python',
            module: 'Numpy', 
            expertise: 3
        },
        {
            
            type: 'Análisis Descriptivo', 
            tool: 'Python',
            module: 'Pyplot', 
            expertise: 3
        },
        {
            
            type: 'Análisis Descriptivo', 
            tool: 'Power BI',
            module: 'Lenguage DAX', 
            expertise: 3
        },

        {
            
            type: 'Análisis Descriptivo', 
            tool: 'Power BI',
            module: 'Visualizaciones Personalizadas', 
            expertise: 4
        },
        {
            
            type: 'Análisis Descriptivo', 
            tool: 'Power BI',
            module: 'Dashboard & Reportes', 
            expertise: 5
        },
        {
            
            type: 'Análisis Descriptivo', 
            tool: 'D3.js visualizaciones',
            module: 'D3.js visualizaciones',
            expertise: 4
        },
        {
            
            type: 'Análisis Descriptivo', 
            tool: 'MS Excel',
            module: 'MS Excel',
            expertise:5
        },

        {
            
            type: 'Análisis Predictivo', 
            tool: 'Python',
            module: 'scikit-learn', 
            expertise:4
        },
        {
            
            type: 'Análisis Predictivo', 
            tool: 'Python',
            module: 'scipy', 
            expertise:3
        },
        {
            
            type: 'Análisis Predictivo', 
            tool: 'Python',
            module: 'tensorflow', 
            expertise:3
        },
    ],
    
    
};

const content = {labels, skills};

export default content;