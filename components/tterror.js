class TamTamError extends Error {
	constructor({ code, message }) {
		super(message);

		this.code = code;
		this.message = message;
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	toJSON() {
		const json = {};

		for (const key of Object.getOwnPropertyNames(this)) {
			json[key] = this[key];
		}

		return json;
	}
}

module.exports = TamTamError;
