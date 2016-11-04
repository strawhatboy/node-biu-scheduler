'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Components = exports.CronTrigger = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cron = require('cron');

var _logger2 = require('../infra/logger');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _logger = _logger2.logger.getLogger('CronTrigger');

var _this = null;

// { cron: '{cron format string}' }

var CronTrigger = exports.CronTrigger = function () {
    function CronTrigger(param, trigger) {
        _classCallCheck(this, CronTrigger);

        _logger.debug('initializing...');
        _this = this;
        try {
            this.cronJob = new _cron.CronJob(param.cron, function () {
                trigger && trigger(_this, null, param);
            }, null, true);
            _logger.debug('new cron trigger initialized with parameter: ' + JSON.stringify(param));
        } catch (exception) {
            _logger.debug('Got exception when creating a cron job ' + JSON.stringify(exception));
            trigger && trigger(_this, exception, param);
        }
    }

    _createClass(CronTrigger, [{
        key: 'destroy',
        value: function destroy() {
            this.cronJob && this.cronJob.stop();
            this.cronJob = null;
        }
    }]);

    return CronTrigger;
}();

;

var Components = exports.Components = [{
    name: "CronTrigger",
    description: "The trigger that will be triggered with a defined cron string",
    create: function create(param, trigger) {
        return new CronTrigger(param, trigger);
    }
}];
//# sourceMappingURL=CronTrigger.js.map
