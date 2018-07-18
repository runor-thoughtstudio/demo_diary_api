import chai from 'chai';
import nock from 'nock';
import dotenv from 'dotenv';
import Request from '../lib/requests';
import server from '../app';

dotenv.config();
const { expect } = chai;
const request = new Request();

describe('Test Enrties Routes', () => {
	after(() => {
		server.close();
	});
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

	describe('showEntry()', () => {
		it('should show an entry', (done) => {
			const url = `${process.env.root_url}/${process.env.version_url}/entries/0`;
			request.get(url, (error, res, body) => {
				const jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('object');
				done();
			});
		}).timeout(10000);
	});

	describe('createEntry()', () => {
		it('should create an entry', (done) => {
			const url = `${process.env.root_url}/${process.env.version_url}/entries`;
			const formData = {
				title: 'Title',
				description: 'Cool',
			};
			request.post(url, formData, (error, res, body) => {
				const jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(201);
				expect(jsonObject).to.be.a('object');
				done();
			});
		}).timeout(10000);
	});

	describe('updateEntry()', () => {
		it('should update an entry', (done) => {
			const url = `${process.env.root_url}/${process.env.version_url}/entries/0`;
			const formData = {
				title: 'Title',
				description: 'Cool',
			};
			request.put(url, formData, (error, res, body) => {
				const jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('object');
				done();
			});
		}).timeout(10000);
	});
});
