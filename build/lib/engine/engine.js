'use strict';

// engine will load all the types of trigger, condition, actions. and then do the job

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.engine = exports.Engine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _nodeUuid = require('node-uuid');

var uuid = _interopRequireWildcard(_nodeUuid);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _logger2 = require('../infra/logger');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _logger = _logger2.logger.getLogger('Engine');

var COMPONENT_TYPE_ACTION = 'action';
var COMPONENT_TYPE_TRIGGER = 'trigger';
var COMPONENT_TYPE_CONDITION = 'condition';

var LOCATION_ACTIONS = 'lib/actions';
var LOCATION_TRIGGERS = 'lib/triggers';
var LOCATION_CONDITIONS = 'lib/conditions';

var _this = null;

var Engine = exports.Engine = function () {
    function Engine() {
        _classCallCheck(this, Engine);

        _this = this;
        _logger.info('initializing...');
        this.triggers = [];
        this.actions = [];
        this.conditions = [];
        this._loadAllComponent();
        this.jobs = {};
    }

    _createClass(Engine, [{
        key: '_getComponentLocation',
        value: function _getComponentLocation(type) {
            switch (type) {
                case COMPONENT_TYPE_TRIGGER:
                    return LOCATION_TRIGGERS;
                case COMPONENT_TYPE_CONDITION:
                    return LOCATION_CONDITIONS;
                case COMPONENT_TYPE_ACTION:
                    return LOCATION_ACTIONS;
                default:
                    _logger.error('invalid component type for the engine');
                    return null;
            }
        }
    }, {
        key: '_loadAllComponent',
        value: function _loadAllComponent() {
            _logger.debug('loading all triggers, actions & conditions...');
            this.triggers = this._loadComponent(COMPONENT_TYPE_TRIGGER);
            this.actions = this._loadComponent(COMPONENT_TYPE_ACTION);
            this.conditions = this._loadComponent(COMPONENT_TYPE_CONDITION);
        }
    }, {
        key: '_loadComponent',
        value: function _loadComponent(type) {
            var componentLocation = this._getComponentLocation(type);
            var location = path.resolve(path.normalize(componentLocation));
            var result = [];

            if (fs.statSync(location).isDirectory()) {
                var dir = fs.readdirSync(location);
                for (var file in dir) {
                    var script = path.normalize(path.join(location, dir[file]));
                    if (fs.statSync(script).isDirectory() || script.endsWith('.js')) {
                        result = result.concat(require(script).Components);
                    }
                }
            }

            return result;
        }

        // { "name": "whatjob", "description": "blabla", "triggers": [{ "type": "CronTrigger", "param": { "cron": "* * * * *" } }], "conditions": [], "actions": [ { "type": "ConsoleAction", "param": { "format": "%s is this", params: ["what?"] } } ] }

    }, {
        key: 'createJob',
        value: function createJob(job, callback) {
            //create job id
            var jobId = uuid.v4();
            this.jobs[jobId] = _.cloneDeep(job);
            this.jobs[jobId].jobId = jobId;
            this.jobs[jobId].triggers = [];
            this.jobs[jobId].conditions = [];
            this.jobs[jobId].actions = [];

            if (job.actions) {
                var length = job.actions.length;
                for (var i = 0; i < length; i++) {
                    var actionType = _.find(this.actions, function (o) {
                        return o.name === job.actions[i].type;
                    });
                    var action = actionType.create(job.actions[i].param, function (obj, err, data) {
                        if (err) {} else {
                            _logger.info('job action done. with data: ' + JSON.stringify(data));
                        }
                    });
                    this.jobs[jobId].actions.push(action);
                }
            }

            // we should use _this here because it was called by the trigger.
            var triggerEvent = function triggerEvent(obj, err, param) {
                var length = _this.jobs[jobId].actions.length;
                _logger.debug('trigger triggered with parameter ' + JSON.stringify(param));

                // run all actions...
                for (var i = 0; i < length; i++) {
                    _this.jobs[jobId].actions[i].trigger();
                }
            };

            if (job.triggers) {

                length = job.triggers.length;
                for (var i = 0; i < length; i++) {
                    var triggerType = _.find(this.triggers, function (o) {
                        return o.name === job.triggers[i].type;
                    });
                    var trigger = triggerType.create(job.triggers[i].param, triggerEvent);
                    this.jobs[jobId].triggers.push(trigger);
                }
            } else {
                // just run all the actions... 
                //TODO: one shot job, we can clean up it then.
                triggerEvent();
                stopJob(jobId);
            }

            return this.jobs[jobId];
        }
    }, {
        key: 'stopJob',
        value: function stopJob(jobId) {
            //TODO: destroy all resources related to this job.
        }
    }]);

    return Engine;
}();

var engine = exports.engine = new Engine();
//# sourceMappingURL=engine.js.map
