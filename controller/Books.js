const database = require('../libs/utils/db-manager');
const handlerUtil = require('../libs/utils/handler-util');
const BookModel = require('../libs/models/book');

module.exports = {
	create: (input) => {
		return new Promise((resolve) => {
			let bookDetails = JSON.parse(input.body);

			database.connectToDB()
				.then(async () => {
					const newBook = new BookModel({
						title: bookDetails.title,
						subtitle: bookDetails.subtitle,
						author: {
							firstname: bookDetails.author_firstname,
							lastname: bookDetails.author_lastname,
						},
						description: bookDetails.description,
						format: bookDetails.format,
						price: bookDetails.price,
					})

					await newBook.save()
						.then((saved) => {
							const response = {
								message: 'new book entry created',
								data: saved,
							};
							resolve(handlerUtil.formatHandlerResponse(201, { response }));
						})
						.catch((error) => {
							console.error(error);
							resolve(handlerUtil.formatHandlerResponse(500, {
								error: 'Unable to save book: ' + JSON.stringify(error)
							}))
						});
				})
				.catch((error) => {
					console.error(error, 'An error occurred when connecting to the database');
					resolve(handlerUtil.formatHandlerResponse(500, { error: error}));
				})
		})
	},
	getAll: (input) => {
		return new Promise((resolve) => {
			let query = null;
			// Create query
			if (input.queryStringParameters && input.queryStringParameters.id) {
				query = { _id: input.queryStringParameters.id }
			}

			database.connectToDB()
				.then(async () => {
					BookModel.find(query).exec((err, books) => {
						if (err) {
							resolve(handlerUtil.formatHandlerResponse(400, {
								error: 'An Error finding books'
							}));
						} else {
							resolve(handlerUtil.formatHandlerResponse(200, { response: books }));
						}
					})
				})
				.catch((error) => {
					console.error(error, 'An error occurred when connecting to the database');
					resolve(handlerUtil.formatHandlerResponse(500, { error: error }));
				})
		})
	},
	update: (input) => {
		return new Promise((resolve) => {
			const json = JSON.parse(input.body);
			const { author_firstname, author_lastname, ...bookDetails } = json;

			database.connectToDB()
				.then(async () => {
					let newBookDetails = {
						...bookDetails,
						author: {
							firstname: author_firstname,
							lastname: author_lastname,
						}
					};

					const updateQuery = { $set: newBookDetails };
					const conditionQuery = { _id: bookDetails.id};
					const options = { upsert: true };

					await BookModel.findOneAndUpdate(conditionQuery, updateQuery, options)
						.then((saved) => {
							const response = {
								message: 'successful updated book',
								data: saved,
							};
							resolve(handlerUtil.formatHandlerResponse(200, { response }));
						})
						.catch((error) => {
							console.error(error);
							resolve(handlerUtil.formatHandlerResponse(500, {
								error: 'Unable to update book: ' + JSON.stringify(error)
							}))
						});
				})
				.catch((error) => {
					console.error(error, 'An error occurred when connecting to the database');
					resolve(handlerUtil.formatHandlerResponse(500, { error: error}));
				})
		});
	},
	delete: (input) => {
		return new Promise((resolve) => {
			if (!input.queryStringParameters || !input.queryStringParameters.id) {
				resolve(handlerUtil.formatHandlerResponse(403, { error: 'id is not provided'}));
			}

			const id = input.queryStringParameters.id;

			database.connectToDB()
				.then(async () => {

					await BookModel.findByIdAndDelete(id)
						.then((deleted) => {
							const response = {
								message: 'successful deleted book',
								data: { id },
							};
							resolve(handlerUtil.formatHandlerResponse(200, { response }));
						})
						.catch((error) => {
							console.error(error);
							resolve(handlerUtil.formatHandlerResponse(500, {
								error: 'Unable to update book: ' + JSON.stringify(error)
							}))
						});
				})
				.catch((error) => {
					console.error(error, 'An error occurred when connecting to the database');
					resolve(handlerUtil.formatHandlerResponse(500, { error: error}));
				})
		})
	}
};
