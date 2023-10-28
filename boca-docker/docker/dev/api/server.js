// 'use strict';
// const express = require('express');
// // Constants
// const PORT = 8080;
// const HOST = '0.0.0.0';
// // App
// const app = express();
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });
// app.listen(PORT, HOST, () => {
//   console.log(`Running on http://${HOST}:${PORT}`);
// });


'use strict';
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const router = require('./routes/routes')

// App instance 
const app = express();

// Swagger Setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Boca API',
      version: '1.0.0',
      description: ' Documentation Boca API',
    },
  },
  apis: ['./routes/routes.js'], //routes
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

//Listening
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
  console.log(`Swagger docs running on http://${HOST}:${PORT}/docs`)
});
