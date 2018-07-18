'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _requests = require('../lib/requests');

var _requests2 = _interopRequireDefault(_requests);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var expect = _chai2.default.expect;

var request = new _requests2.default();

describe('Test Enrties Routes', function () {
	after(function () {
		_app2.default.close();
	});
	describe('allEntries()', function () {
		it('should show all entries in the app', function (done) {
			before(function () {
				(0, _nock2.default)(process.env.root_url + '/' + process.version_url).get('/entries').reply(200, [{ title: 'one', description: 'cool' }]);
			});
			var url = process.env.root_url + '/' + process.env.version_url + '/entries';
			request.get(url, function (error, res, body) {
				var jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('array');
				done();
			});
		}).timeout(10000);
	});

	describe('showEntry()', function () {
		it('should show an entry', function (done) {
			before(function () {
				(0, _nock2.default)(process.env.root_url + '/' + process.version_url).get('/entries/0').reply(200, { title: 'one', description: 'cool' });
			});
			var url = process.env.root_url + '/' + process.env.version_url + '/entries/0';
			request.get(url, function (error, res, body) {
				var jsonObject = JSON.parse(body);
				expect(res.statusCode).to.be.equal(200);
				expect(jsonObject).to.be.a('object');
				done();
			});
		}).timeout(10000);
	});
});
//# sourceMappingURL=entries-spec.js.map
