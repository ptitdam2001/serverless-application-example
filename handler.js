// const serverless = require('serverless-http');
// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// module.exports.handler = serverless(app);

const SampleService = require('./services/sample-service');
const BookController = require('./controller/Books')

module.exports.hello = async event => SampleService.getHelloMessage(event);
module.exports.booksCreate = async (event) => BookController.create(event);
module.exports.booksGetAll = async (event) => BookController.getAll(event);
module.exports.booksUpdate = async (event) => BookController.update(event);
module.exports.booksDelete = async (event) => BookController.delete(event);