'use strict';
import { logger } from '../infra/logger';
let _logger = logger.getLogger('AWService');

class AWService {
    startInstance(instanceId) {
        _logger.info(`starting the instance with id: ${instanceId}`);
    }
}

export let awsService = new AWService();