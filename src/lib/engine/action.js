'use strict';

import { logger } from '../infra/logger';
let _logger = logger.getLogger('ActionBase');

export default class ActionBase {
    constructor(param, callback) {
        this.param = param;
        this.callback = callback;
    }

    trigger() {
        _logger.error('default trigger() called');
    }

    destroy() {
        _logger.error('default destroy() called');
    }
}