import chai from 'chai';
// import nock from 'nock';
import dotenv from 'dotenv';
import Request from '../lib/requests';
import { mainServer } from '../app';

dotenv.config();
const { expect } = chai;
const request = new Request();
const user = {
	email: 'user1@example.com',
	password: 'password',
	fullName: 'User Name',
	dob: '2018-04',
};

describe('User Tests', () => {
	after(() => {
		mainServer.close();
	});
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

	describe('signin user()', () => {
		it('should signin a user', (done) => {
			const url = `${process.env.root_url}/${process.env.version_url}/users/signin`;
			const formData = {
				email: 'user@example.com',
				password: 'password',
			};
			request.post(url, formData, (error, res, body) => {
				const jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('object');
				expect(jsonObject.message).to.be.equal('You have successfully signed in');
				done();
			});
		}).timeout(10000);
	});

	describe('showProfile()', () => {
		it('should show a users profile', (done) => {
			const url = `${process.env.root_url}/${process.env.version_url}/users/0`;
			request.get(url, (error, res, body) => {
				const jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('object');
				done();
			});
		}).timeout(10000);
	});

	describe('UpdateProfile()', () => {
		it('should update a users profile', (done) => {
			const url = `${process.env.root_url}/${process.env.version_url}/users/0`;
			const formData = {
				email: 'kampkelllllly@gmail.com',
				fullName: 'New User',
				dob: '2018-04',
			};
			request.put(url, formData, (error, res, body) => {
				const jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('object');
				done();
			});
		}).timeout(10000);
	});

	describe('saveNotifications()', () => {
		it('should save notifications', (done) => {
			const url = `${process.env.root_url}/${process.env.version_url}/users/0/notifications`;
			const formData = {
				reminderDate: '2019-04',
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
