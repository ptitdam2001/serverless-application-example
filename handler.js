// const serverless = require('serverless-http');
// const express = require('express')
// const app = express()

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

// module.exports.handler = serverless(app);

const SampleService = require('./services/sample-service')

module.exports.hello = async event => SampleService.getHelloMessage(event);