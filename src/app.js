import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const dataStructure = {
	entries: [{
		title: 'First', description: 'The description',
	}],
	users: [{
		email: 'user@example.com', password: 'password', fullName: 'Example User', dob: '2018-06',
	}],
};
app.set('port', process.env.PORT || 3000);
app.set('appData', dataStructure);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(app.get('port'), () => {
	console.log('Application started. Listening :)');
});
