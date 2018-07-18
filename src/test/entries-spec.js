import chai from 'chai';
import nock from 'nock';
import dotenv from 'dotenv';
import Request from '../lib/requests';

dotenv.config();
const { expect } = chai;
const request = new Request();

describe('Test Enrties Routes', () => {
	describe('allEntries()', () => {
		it('should show all entries in the app', (done) => {
			before(() => {
				nock(`${process.env.root_url}/${process.version_url}`).get('/entries').reply(200, [{ title: 'one', description: 'cool' }]);
			});
			const url = `${process.env.root_url}/${process.env.version_url}/entries`;
			request.get(url, (error, res, body) => {
				const jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('array');
				done();
			});
		}).timeout(10000);
	});
});
