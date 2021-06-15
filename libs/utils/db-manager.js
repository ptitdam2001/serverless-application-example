const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DB_URL = process.env.DB_URL;

module.exports.connectToDB = async () => {
	return mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
		.then(() => console.log('Connection to DB successful'))
		.catch((err) => console.error(err, 'Error'));
};