import express from 'express';
import jwt from 'jsonwebtoken';

const usersRouter = express.Router();

usersRouter.post('/users', (req, res) => {
	const datastructure = req.app.get('appData');
	const {
		email, password, dob, fullName,
	} = req.body;
	if (email && dob && fullName && password) {
		if (email.length > 0 && dob.length > 0 && fullName.length > 0 && password.length >= 6) {
			const user = datastructure.users.filter(u => u.email === email && u.password === password);
			if (user.length > 0 && user[0].email) {
				res.status(409).json({ error: 'This email has already been taken!' });
			} else {
				datastructure.users.push(req.body);
				const payload = {
					email: req.body.email,
				};
				const token = jwt.sign(payload, '1357389', { expiresIn: 60000 });
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

usersRouter.post('/users/signin', (req, res) => {
	const datastructure = req.app.get('appData');
	const { email, password } = req.body;
	if (email.length > 0 && password.length > 0) {
		let user = datastructure.users.filter(u => u.email === email && u.password === password);
		if (user.length > 0 && user[0].email) {
			const payload = {
				email: user.email,
			};
			user = Object.assign({}, user[0]);
			delete user.password;
			const token = jwt.sign(payload, 'djdkdldmldkldm', { expiresIn: 60000 });
			res.setHeader('token', token);
			res.status(200).json({ message: 'You have successfully signed in', user });
		} else {
			res.status(401).json({ message: 'Cannot log in' });
		}
	} else {
		res.status(400).json({ message: 'Invalid request' });
	}
});

usersRouter.get('/users/:id', (req, res) => {
	const datastructure = req.app.get('appData');
	if (datastructure.users === undefined || datastructure.users[req.params.id] === undefined) {
		res.status(404).json({ error: 'This user does not exist' });
	} else {
		const user = datastructure.users[req.params.id];
		res.status(200).json(user);
	}
});

usersRouter.put('/users/:id', (req, res) => {
	const datastructure = req.app.get('appData');
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

usersRouter.put('/users/:id/notifications', (req, res) => {
	const datastructure = req.app.get('appData');
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

export default usersRouter;
