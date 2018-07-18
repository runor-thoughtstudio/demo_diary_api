'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var app = (0, _express2.default)();
var dataStructure = {
	entries: [{
		title: 'First', description: 'The description'
	}],
	users: [{
		email: 'user@example.com', password: 'password', fullName: 'Example User', dob: '2018-06'
	}]
};
app.set('port', process.env.PORT || 3000);
app.set('appData', dataStructure);
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.listen(app.get('port'), function () {
	console.log('Application started. Listening :)');
});
//# sourceMappingURL=app.js.map
