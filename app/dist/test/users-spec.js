'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _requests = require('../lib/requests');

var _requests2 = _interopRequireDefault(_requests);

var _app = require('../app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
// import nock from 'nock';
var expect = _chai2.default.expect;

var request = new _requests2.default();
var user = {
	email: 'user1@example.com',
	password: 'password',
	fullName: 'User Name',
	dob: '2018-04'
};

describe('User Tests', function () {
	after(function () {
		_app.mainServer.close();
	});
	describe('signup user()', function () {
		it('should signup a user', function (done) {
			var url = process.env.root_url + '/' + process.env.version_url + '/users';
			request.post(url, user, function (error, res, body) {
				var jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(201);
				expect(jsonObject).to.be.a('object');
				done();
			});
		}).timeout(10000);
	});

	describe('signin user()', function () {
		it('should signin a user', function (done) {
			var url = process.env.root_url + '/' + process.env.version_url + '/users/signin';
			var formData = {
				email: 'user@example.com',
				password: 'password'
			};
			request.post(url, formData, function (error, res, body) {
				var jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('object');
				expect(jsonObject.message).to.be.equal('You have successfully signed in');
				done();
			});
		}).timeout(10000);
	});

	describe('showProfile()', function () {
		it('should show a users profile', function (done) {
			var url = process.env.root_url + '/' + process.env.version_url + '/users/0';
			request.get(url, function (error, res, body) {
				var jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('object');
				done();
			});
		}).timeout(10000);
	});

	describe('UpdateProfile()', function () {
		it('should update a users profile', function (done) {
			var url = process.env.root_url + '/' + process.env.version_url + '/users/0';
			var formData = {
				email: 'kampkelllllly@gmail.com',
				fullName: 'New User',
				dob: '2018-04'
			};
			request.put(url, formData, function (error, res, body) {
				var jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('object');
				done();
			});
		}).timeout(10000);
	});

	describe('saveNotifications()', function () {
		it('should save notifications', function (done) {
			var url = process.env.root_url + '/' + process.env.version_url + '/users/0/notifications';
			var formData = {
				reminderDate: '2019-04'
			};
			request.put(url, formData, function (error, res, body) {
				var jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('object');
				done();
			});
		}).timeout(10000);
	});
});
//# sourceMappingURL=users-spec.js.map
