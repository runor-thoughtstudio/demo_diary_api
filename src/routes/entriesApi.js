import express from 'express';

// class EntriesApi {
// 	constructor() {
// 		const router = express.Router();
// 	}
// 	router.get('/api/v1/entries', (req, res) => {
// 		const datastructure = req.app.get('appData');
// 		if (!datastructure.entries) {
// 			res.status(404).json({ error: 'Not Found' });
// 		}
// 		res.status(200).json(datastructure.entries);
// 	});
// }

const entriesRouter = express.Router();

entriesRouter.get('/entries', (req, res) => {
	const datastructure = req.app.get('appData');
	if (!datastructure.entries) {
		res.status(404).json({ error: 'Not Found' });
	}
	res.status(200).json(datastructure.entries);
});

entriesRouter.get('/entries/:id', (req, res) => {
	const datastructure = req.app.get('appData');
	if (datastructure.entries === undefined || datastructure.entries[req.params.id] === undefined) {
		res.status(404).json({ error: 'This entry cannot be found' });
	} else {
		const entry = datastructure.entries[req.params.id];
		res.json(entry);
	}
});

entriesRouter.post('/entries', (req, res) => {
	const datastructure = req.app.get('appData');
	if (req.body.title === ' ' || req.body.description === ' ') {
		res.status(422).json({ message: 'Please fill in all the fields properly!' });
	}
	if (req.body.title && req.body.description) {
		datastructure.entries.push(req.body);
		res.status(201).json({ message: 'The entry has been created' });
	} else {
		res.status(400).json({ message: 'Invalid request' });
	}
});


export default entriesRouter;
