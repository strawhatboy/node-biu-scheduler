'use strict';

// engine will load all the types of trigger, condition, actions. and then do the job

import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'node-uuid';
import * as _ from 'lodash';
import { logger } from '../infra/logger';
let _logger = logger.getLogger('Engine');

const COMPONENT_TYPE_ACTION = 'action';
const COMPONENT_TYPE_TRIGGER = 'trigger';
const COMPONENT_TYPE_CONDITION = 'condition';

const LOCATION_ACTIONS = 'lib/actions';
const LOCATION_TRIGGERS = 'lib/triggers';
const LOCATION_CONDITIONS = 'lib/conditions';

let _this = null;

export class Engine {
    constructor() {
        _this = this;
        _logger.info('initializing...');
        this.triggers = [];
        this.actions = [];
        this.conditions = [];
        this._loadAllComponent();
        this.jobs = {};
    }

    _getComponentLocation(type) {
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

    _loadAllComponent() {
        _logger.debug('loading all triggers, actions & conditions...');
        this.triggers = this._loadComponent(COMPONENT_TYPE_TRIGGER);
        this.actions = this._loadComponent(COMPONENT_TYPE_ACTION);
        this.conditions = this._loadComponent(COMPONENT_TYPE_CONDITION);
    }

    _loadComponent(type) {
        var componentLocation = this._getComponentLocation(type);
        var location = path.resolve(path.normalize(componentLocation));
        let result = [];

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
    createJob(job, callback) {
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
                var actionType = _.find(this.actions, o => o.name === job.actions[i].type);
                var action = actionType.create(job.actions[i].param, (obj, err, data) => {
                    if (err) {
                    } else {
                        _logger.info('job action done. with data: ' + JSON.stringify(data));
                    }
                });
                this.jobs[jobId].actions.push(action);
            }
        }

        // we should use _this here because it was called by the trigger.
        let triggerEvent = (obj, err, param) => {
            var length = _this.jobs[jobId].actions.length;
            _logger.info(`trigger triggered with parameter ${JSON.stringify(param)}`);

            // run all actions...
            for (var i = 0; i < length; i++) {
                _this.jobs[jobId].actions[i].trigger();
            }
        };

        if (job.triggers) {

            length = job.triggers.length;
            for (var i = 0; i < length; i++) {
                var triggerType = _.find(this.triggers, o => o.name === job.triggers[i].type);
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

    stopJob(jobId) {
        //TODO: destroy all resources related to this job.
    }
}

export let engine = new Engine();