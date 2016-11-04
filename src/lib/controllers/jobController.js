'use strict';

import { engine } from '../engine/engine';
import { logger } from '../infra/logger';
let _logger = logger.getLogger('jobController');

class JobController {
    constructor() {
        _logger.debug('initializing...');
    }

    // reqPath('/createJob')
    createJob(req, res) {
        // get body json
        var job = req.body;
        res.send(JSON.stringify(engine.createJob(job).jobId));
    }
}

// to fit with the express-load
module.exports = new JobController();