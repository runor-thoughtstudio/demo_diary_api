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

export default entriesRouter;
