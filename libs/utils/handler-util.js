const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Origin, X-Resquested-With, Content-Type, Accept, Authorization',
	'Access-Control-Allows-Credentials': 'true'
}


module.exports = {
	formatHandlerResponse: (code, body) => ({
		statusCode: code,
		body: JSON.stringify(body),
		headers
	})
}