const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const utils = require('../utils/utils');
const User = require('../models/UserModel');
const PUBLIC_KEY = fs.readFileSync(path.resolve('./keys/public.pem'));  // use for token verification

module.exports.checkAuth = async(req, res, next) => {
	let token;
	console.log();
	if(req.header('Authorization')){
		// Fetch token from header with format Bearer <token>
		token = req.header('Authorization').split(' ')[1];

		try{
			const payload = await utils.verifyJwtToken(token, PUBLIC_KEY);
			req.userId = payload.userId;
			next();
		}
		catch (err) {
	      	console.log(err);
	      	return res.status(401).send('Invalid token.');
	    }
	}
	else {
	    return res.status(403).send('No token provided.');
	}
};