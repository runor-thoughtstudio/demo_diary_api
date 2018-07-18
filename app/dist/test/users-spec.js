'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _requests = require('../lib/requests');

var _requests2 = _interopRequireDefault(_requests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import server from '../app';
// import app from '../app';

// import nock from 'nock';
_dotenv2.default.config();
var expect = _chai2.default.expect;

var request = new _requests2.default();
var user = {
	email: 'useri@example.com',
	password: 'password',
	fullName: 'User Name',
	dob: '2018-04'
};

describe('User Tests', function () {
	// after((done) => {
	// 	server.close(done);
	// });
	// before(() => {
	// 	app.listen(3000);
	// });
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
});
//# sourceMappingURL=users-spec.js.map
