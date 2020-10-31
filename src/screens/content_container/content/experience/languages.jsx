const language_labels = {
  english:{
    title:'Experience',
    eduaction_title:'Education',
    job_title:'Places I\'ve worked in'
  },
  spanish:{
    title:'Experiencia',
    eduaction_title:'Educación',
    job_title:'Donde he trabajado'
  }
}


const education = [
  {
    University: {
      english:"National Autonomous University of Mexico",
      spanish:"Universidad Nacional Autónoma de México",
    },
    Degree: {
      english:"Actuarial Sciences",
      spanish:'Actuaría'
    },
    Description:{
     english:"Education focused on statistics, probability and maths",
     spanish:'Educación enfocada en estadística, probabilidad y matemáticas' 
    }
     
  }
]


const jobs = [
    {
      "PositionName": {
        english:"Client Service Representative",
        spanish:'Soporte Técnico de Clientes'
      },
      "Company": "Telvista",
      "Area": "MetroPCS",
      "Location": "Mexico City, Mexico",
      "DateBegin": 1343779200000,
      "DateEnd": 1356998400000,
      "Responsibilities":{
        english:[
          "To make communication with MetroPCS Clients"
        ],
        spanish:[
          'Hacer comunicación con los clientes de MetroPCS'
        ]
      }
    },
    {
      "PositionName": {
        english:"Financial Management Traineé",
        spanish:'Becario de Finanzas'
      },
      
      "Company": "Farmapiel",
      "Area": "Financial Management",
      "Location": "Mexico City, Mexico",
      "DateBegin": 1488326400000,
      "DateEnd": 1496275200000,
      "Responsibilities":{
        english:[
          "Report generation for the managers"
        ],
        spanish:[
          'Generación de reportes para la gerencia'
        ]
      }
    },
    {
      "PositionName": {
        english:"MIS Analytics Credit Analyst",
        spanish:'Analista MIS Analytics Crédito'
      },
      "Company": "Scotiabank",
      "Area": "Customer Acquisition Risk Strategy",
      "Location": "Mexico City, Mexico",
      "DateBegin": 1496275200000,
      "DateEnd": 1525132800000,
      "Responsibilities":{
        english:[
          "Report generation for the credit department",
          "Development of software tools using VB .NET framework which 100+ people operational help",
          "Analysis and forecast of demand using Excel and SQL tools"
        ],
        spanish:[
          'Generación de reportes para el departamento de crédito',
          'Desarrollo de software usando VB .NET apoyando una operación de +100 personas',
          'Análisis y forecast de demanda con Excel y SQL'
        ]
      }
    },
    {
      "PositionName": {
        english:"Revenue Data Analyst",
        spanish:'Analista Datos de Revenue Management'
      },
      "Company": "Grupo Vidanta",
      "Area": "Revenue Management",
      "Location": "Puerto Vallarta, Mexico",
      "DateBegin": 1525132800000,
      "DateEnd": 1556668800000,
      "Responsibilities":{
        english:[
          "Hotel inventory optimization using forecasting techniques"
        ],
        spanish:[
          'Optimización de inventario de hoteles usando técnicas de forecasting'
        ]
      }
    },
    {
      "PositionName": {
        english:"Business Analyst",
        spanish:'Business Analyst'
      },
      "Company": "Grupo Vidanta",
      "Area": "Business Analytics",
      "Location": "Puerto Vallarta, Mexico",
      "DateBegin": 1525132800000,
      "DateEnd": 1556668800000,
      "JobID": 3,
      "PositionID": 1,
      "Responsibilities":{
        english:[
          "Sales Analysis and reporting, forecasting demand"
        ],
        spanish:[
          'Análisis de ventas, reporteo y forecasts de demanda'
        ]
      }
    },
    {

      "PositionName": {
        english: "Senior Business Analyst",
        spanish: 'Senior Business Analyst'
      },
      "Company": "Grupo Vidanta",
      "Area": "Business Analytics",
      "Location": "Puerto Vallarta, Mexico",
      "DateBegin": 1572566400000,
      "DateEnd": 1585699200000,
      "JobID": 3,
      "PositionID": 2,
      "Responsibilities":{
        english:[
          "Extended responsabilities to the hotel's restaurants providing analysis and insight"
        ],
        spanish:[
          'Responsabilidades extendidas a la operación restorantera de hoteles, otorgando análisis e insights'
        ]
      }
    },
    {
      "PositionName": {
        english:'Freelancer',
        spanish:'Freelancer',
      },
      "Company": "My Own",
      "Area": "Anything",
      "Location": "Puerto Vallarta, Mexico",
      "DateBegin": 1585699200000,
      "DateEnd": null,
      "JobID": 4,
      "PositionID": 0,
      "Responsibilities":{
        english:[
          "Due to coronavirus I really need to freelance"
        ],
        spanish:[
          'Debido al coronavirus he freelanceado'
        ]
      }
    }
];


const content = {language_labels, education, jobs}
export default content;