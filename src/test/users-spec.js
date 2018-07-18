import chai from 'chai';
// import nock from 'nock';
import dotenv from 'dotenv';
import Request from '../lib/requests';
// import server from '../app';
// import app from '../app';

dotenv.config();
const { expect } = chai;
const request = new Request();
const user = {
	email: 'useri@example.com',
	password: 'password',
	fullName: 'User Name',
	dob: '2018-04',
};

describe('User Tests', () => {
	// after((done) => {
	// 	server.close(done);
	// });
	// before(() => {
	// 	app.listen(3000);
	// });
	describe('signup user()', () => {
		it('should signup a user', (done) => {
			const url = `${process.env.root_url}/${process.env.version_url}/users`;
			request.post(url, user, (error, res, body) => {
				const jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(201);
				expect(jsonObject).to.be.a('object');
				done();
			});
		}).timeout(10000);
	});
});
