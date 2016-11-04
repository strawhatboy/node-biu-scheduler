'use strict';

import { logger } from '../infra/logger';
let _logger = logger.getLogger('instanceController');

class InstanceController {
    constructor() {
        _logger.debug('initializing...');
    }

    // reqPath('/startInstance')
    startInstance(req, res) {
        res.send("instanceController - startInstance");
    }
}

// to fit with the express-load
module.exports = new InstanceController();