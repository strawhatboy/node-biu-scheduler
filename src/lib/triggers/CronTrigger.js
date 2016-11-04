'use strict';
import { CronJob } from 'cron'
import { logger } from '../infra/logger';
let _logger = logger.getLogger('CronTrigger');

let _this = null;

// { cron: '{cron format string}' }
export class CronTrigger {
    constructor(param, trigger) {
        _logger.debug('initializing...');
        _this = this;
        try {
            this.cronJob = new CronJob(param.cron, function () {
                trigger && trigger(_this, null, param);
            }, null, true);
            _logger.debug(`new cron trigger initialized with parameter: ${JSON.stringify(param)}`);
        } catch (exception) {
            _logger.debug(`Got exception when creating a cron job ${JSON.stringify(exception)}`);
            trigger && trigger(_this, exception, param);
        }
    }

    destroy() {
        this.cronJob && this.cronJob.stop();
        this.cronJob = null;
    }
};

export let Components = [{
    name: "CronTrigger",
    description: "The trigger that will be triggered with a defined cron string",
    create: (param, trigger) => {
        return new CronTrigger(param, trigger);
    }
}]