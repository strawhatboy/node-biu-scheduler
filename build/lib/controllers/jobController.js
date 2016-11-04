'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _engine = require('../engine/engine');

var _logger2 = require('../infra/logger');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _logger = _logger2.logger.getLogger('jobController');

var JobController = function () {
    function JobController() {
        _classCallCheck(this, JobController);

        _logger.debug('initializing...');
    }

    // reqPath('/createJob')


    _createClass(JobController, [{
        key: 'createJob',
        value: function createJob(req, res) {
            // get body json
            var job = req.body;
            res.send(JSON.stringify(_engine.engine.createJob(job).jobId));
        }
    }]);

    return JobController;
}();

// to fit with the express-load


module.exports = new JobController();
//# sourceMappingURL=jobController.js.map