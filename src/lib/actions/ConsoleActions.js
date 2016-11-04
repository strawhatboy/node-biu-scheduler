'use strict';

// for debugging.

import ActionBase from '../engine/action';
import { logger } from '../infra/logger';
let _logger = logger.getLogger('AWSActions');

export class ConsoleActions extends ActionBase {
    constructor(param, callback) {
        super(param, callback);
    }

    trigger() {
        _logger.info(this.param.format, this.param.params);
        this.callback(this, null, 'done');
    }

    destroy() {
        // nothing to do.
    }
}

export let Components = [{
    name: "ConsoleActions",
    description: "actions for console output, for debugging use.",
    create: (param, callback) => {
        return new ConsoleActions(param, callback);
    }
}];