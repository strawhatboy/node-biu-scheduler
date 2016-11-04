'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logger = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _log4js = require('log4js');

var log4js = _interopRequireWildcard(_log4js);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _myPath = require('./myPath');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);

        var logdir = _myPath.myPath.getLogPath();

        if (!fs.existsSync(logdir)) {
            fs.mkdirSync(logdir);
        }

        log4js.configure({
            appenders: [{
                type: 'console'
            }, {
                type: 'file', filename: logdir + 'agent.log'
            }]
        });
    }

    _createClass(Logger, [{
        key: 'getLogger',
        value: function getLogger() {
            return log4js.getLogger.apply(log4js, arguments);
        }
    }]);

    return Logger;
}();

var logger = exports.logger = new Logger();
//# sourceMappingURL=logger.js.map
