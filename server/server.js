const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api');
const fileController = require('./controllers/fileController');
const app = express();
const PORT = 3000;

/**
 * handle parsing request body
 */
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

/**
 * define route handlers
 */
 app.use('/api', apiRouter);

// statically serve everything in the build folder on the route '/build'
app.use('/build',express.static(path.join(__dirname, '../build')));

 // serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
});

app.post('/', fileController.getPets, (req,res) => {
  return res.status(200)
            .json(res.locals.pet)
});

app.delete('/', fileController.deletePets, (req,res) => {
  return res.status(200).json({});
})
// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

 app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
 app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;