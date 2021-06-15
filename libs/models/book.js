const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let book = {
	_id: {
		type: Schema.Types.ObjectId,
		auto: true,
	},
	title: String,
	subtitle: String,
	author: {
		firstname: String,
		lastname: String,
	},
	description: String,
	format: String,
	price: Number,
};

const BookSchema = new Schema(book);

// Reference for already declared model issue resolution
function modelAlreadyDeclared() {
	try {
		mongoose.model('Books');
		return true;
	} catch (e) {
		return false;
	}
}

module.exports = modelAlreadyDeclared() === true ? mongoose.model('Books') : mongoose.model('Books', BookSchema);