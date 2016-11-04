'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Components = exports.AWSActions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _awsSdk = require('aws-sdk');

var AWS = _interopRequireWildcard(_awsSdk);

var _action = require('../engine/action');

var _action2 = _interopRequireDefault(_action);

var _logger2 = require('../infra/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = require('../config/config.json');

var _logger = _logger2.logger.getLogger('AWSActions');

// {
//  action: 'getInstance | getInstances | startInstance | stopInstance | terminateInstance | <launchInstance>',
//  instanceId: '',
//  region: '',
// }
var _this = null;

var AWSActions = exports.AWSActions = function (_ActionBase) {
    _inherits(AWSActions, _ActionBase);

    function AWSActions(param, callback) {
        _classCallCheck(this, AWSActions);

        var _this2 = _possibleConstructorReturn(this, (AWSActions.__proto__ || Object.getPrototypeOf(AWSActions)).call(this, param, callback));

        _this = _this2;
        _logger.debug('initializing...');
        var ec2options = { apiVersion: '2016-09-15', region: "us-west-2" };
        if (config.webproxy) {
            ec2options.httpOptions = {
                proxy: config.webproxy
            };
            ec2options.sslEnabled = false;
        }
        _this2.ec2 = new AWS.EC2(ec2options);
        return _this2;
    }

    _createClass(AWSActions, [{
        key: 'trigger',
        value: function trigger() {
            _logger.info('aws action triggered with parameter: ' + JSON.stringify(this.param));
            switch (this.param.action.toLowerCase()) {
                case 'getinstance':
                    break;
                case 'getinstances':
                    break;
                case 'startinstance':
                    this.startInstance(this.param.instanceId, this.callback);
                    break;
                case 'stopinstance':
                    this.stopInstance(this.param.instanceId, this.callback);
                    break;
                case 'stopinstances':
                    this.stopInstances(this.param.instanceIds, this.callback);
                    break;
                default:
                    break;
            }
        }
    }, {
        key: 'stopInstance',
        value: function stopInstance(instanceId, callback) {
            this.stopInstances([instanceId], callback);
        }
    }, {
        key: 'stopInstances',
        value: function stopInstances(instanceIds, callback) {
            this.ec2.stopInstances({
                InstanceIds: instanceIds
            }, function (err, data) {
                if (err) {
                    _logger.error(err, err.stack);
                    callback(_this, err, data);
                } else {
                    callback(_this, null, data);
                }
            });
        }
    }, {
        key: 'startInstance',
        value: function startInstance(instanceId, callback) {
            this.startInstances([instanceId], callback);
        }
    }, {
        key: 'startInstances',
        value: function startInstances(instanceIds, callback) {
            this.ec2.startInstances({
                InstanceIds: instanceIds
            }, function (err, data) {
                if (err) {
                    _logger.error(err, err.stack);
                    callback(_this, err, data);
                } else {
                    callback(_this, null, data);
                }
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.ec2 = null;
            _this = null;
        }
    }]);

    return AWSActions;
}(_action2.default);

var Components = exports.Components = [{
    name: "AWSEC2Actions",
    description: "actions for aws ec2 operations",
    create: function create(param, callback) {
        return new AWSActions(param, callback);
    }
}];
//# sourceMappingURL=AWSActions.js.map
