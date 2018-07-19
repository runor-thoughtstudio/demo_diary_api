'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersRouter = _express2.default.Router();

usersRouter.post('/users', function (req, res) {
	var datastructure = req.app.get('appData');
	var _req$body = req.body,
	    email = _req$body.email,
	    password = _req$body.password,
	    dob = _req$body.dob,
	    fullName = _req$body.fullName;

	if (email && dob && fullName && password) {
		if (email.length > 0 && dob.length > 0 && fullName.length > 0 && password.length >= 6) {
			var user = datastructure.users.filter(function (u) {
				return u.email === email && u.password === password;
			});
			if (user.length > 0 && user[0].email) {
				res.status(409).json({ error: 'This email has already been taken!' });
			} else {
				datastructure.users.push(req.body);
				var payload = {
					email: req.body.email
				};
				var token = _jsonwebtoken2.default.sign(payload, '1357389', { expiresIn: 60000 });
				res.setHeader('token', token);
				res.status(201).json({ message: 'You have successfully signed up' });
			}
		} else {
			res.status(422).json({ message: 'Please fill in all the fields properly!' });
		}
	} else {
		res.status(400).json({ message: 'Invalid Request!' });
	}
});

usersRouter.post('/users/signin', function (req, res) {
	var datastructure = req.app.get('appData');
	var _req$body2 = req.body,
	    email = _req$body2.email,
	    password = _req$body2.password;

	if (email.length > 0 && password.length > 0) {
		var user = datastructure.users.filter(function (u) {
			return u.email === email && u.password === password;
		});
		if (user.length > 0 && user[0].email) {
			var payload = {
				email: user.email
			};
			user = Object.assign({}, user[0]);
			delete user.password;
			var token = _jsonwebtoken2.default.sign(payload, 'djdkdldmldkldm', { expiresIn: 60000 });
			res.setHeader('token', token);
			res.status(200).json({ message: 'You have successfully signed in', user: user });
		} else {
			res.status(401).json({ message: 'Cannot log in' });
		}
	} else {
		res.status(400).json({ message: 'Invalid request' });
	}
});

usersRouter.get('/users/:id', function (req, res) {
	var datastructure = req.app.get('appData');
	if (datastructure.users === undefined || datastructure.users[req.params.id] === undefined) {
		res.status(404).json({ error: 'This user does not exist' });
	} else {
		var user = datastructure.users[req.params.id];
		res.status(200).json(user);
	}
});

usersRouter.put('/users/:id', function (req, res) {
	var datastructure = req.app.get('appData');
	if (!req.body.email || !req.body.fullName || !req.body.dob) {
		res.status(400).json({ message: 'Invalid request' });
	}
	if (req.body.email < 1 || req.body.fullName < 1 || req.body.dob < 1) {
		res.status(422).json({ message: 'Please fill in all the fields properly!' });
	}
	if (datastructure.users === undefined || datastructure.users[req.params.id] === undefined) {
		res.status(404).json({ error: 'This user does not exist' });
	}
	datastructure.users[req.params.id].email = req.body.email;
	datastructure.users[req.params.id].fullName = req.body.fullName;
	datastructure.users[req.params.id].dob = req.body.dob;
	res.status(200).json({ message: 'User Profile has been updated' });
});

usersRouter.put('/users/:id/notifications', function (req, res) {
	var datastructure = req.app.get('appData');
	if (!req.body.reminderDate) {
		res.status(400).json({ message: 'Invalid request' });
	}
	if (req.body.reminderDate < 1) {
		res.status(422).json({ message: 'Please pick a date for your notification!' });
	}
	if (datastructure.users === undefined || datastructure.users[req.params.id] === undefined) {
		res.status(404).json({ error: 'This user does not exist' });
	}
	datastructure.users[req.params.id].reminder = req.body.reminderDate;
	res.status(200).json({ message: 'Your notification settings has been updated' });
});

exports.default = usersRouter;
//# sourceMappingURL=usersApi.js.map
