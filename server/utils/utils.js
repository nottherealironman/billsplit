const jwt = require('jsonwebtoken');

module.exports.generateJwtToken = (data, cert) => {
	return jwt.sign(data, cert, { algorithm: 'RS256' });
}

module.exports.verifyJwtToken = (token, cert) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, cert, function (err, payload){
			if(err){
				return reject(err);
			}
			resolve(payload);
		});
	});
}