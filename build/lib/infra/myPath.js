'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Path = function () {
    function Path() {
        _classCallCheck(this, Path);
    }

    _createClass(Path, [{
        key: "getAppRoot",
        value: function getAppRoot() {
            return __dirname + "/../../";
        }
    }, {
        key: "getLogPath",
        value: function getLogPath() {
            return this.getAppRoot() + "logs/";
        }
    }, {
        key: "getConfigPath",
        value: function getConfigPath() {
            return this.getAppRoot() + "config/";
        }
    }]);

    return Path;
}();

var myPath = exports.myPath = new Path();
//# sourceMappingURL=myPath.js.map
