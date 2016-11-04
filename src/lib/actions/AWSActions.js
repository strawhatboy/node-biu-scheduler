'use strict';

import * as AWS from 'aws-sdk';
import ActionBase from '../engine/action';
let config = require('../config/config.json');
import { logger } from '../infra/logger';
let _logger = logger.getLogger('AWSActions');

// {
//  action: 'getInstance | getInstances | startInstance | stopInstance | terminateInstance | <launchInstance>',
//  instanceId: '',
//  region: '',
// }
let _this = null;

export class AWSActions extends ActionBase {
    constructor(param, callback) {
        super(param, callback);
        _this = this;
        _logger.debug('initializing...');
        var ec2options = { apiVersion: '2016-09-15', region: "us-west-2" };
        if (config.webproxy) {
            ec2options.httpOptions = {
                proxy: config.webproxy
            };
            ec2options.sslEnabled = false;
        }
        this.ec2 = new AWS.EC2(ec2options);
    }

    trigger() {
        _logger.info(`aws action triggered with parameter: ${JSON.stringify(this.param)}`);
        switch (this.param.action.toLowerCase()) {
            case 'getinstance':
                break;
            case 'getinstances':
                break;
            case 'startinstance':
                this.startInstance(this.param.instanceId, this.callback);
                break;
            case 'stopinstance':
                this.stopInstance(this.param.instanceId, this.callback);
                break;
            case 'stopinstances':
                this.stopInstances(this.param.instanceIds, this.callback);
                break;
            default:
                break;
        }
    }

    stopInstance(instanceId, callback) {
        this.stopInstances([instanceId], callback);
    }

    stopInstances(instanceIds, callback) {
        this.ec2.stopInstances({
            InstanceIds: instanceIds
        }, (err, data) => {
            if (err) {
                _logger.error(err, err.stack);
                callback(_this, err, data);
            } else {
                callback(_this, null, data);
            }
        });
    }

    startInstance(instanceId, callback) {
        this.startInstances([instanceId], callback);
    }

    startInstances(instanceIds, callback) {
        this.ec2.startInstances({
            InstanceIds: instanceIds
        }, (err, data) => {
            if (err) {
                _logger.error(err, err.stack);
                callback(_this, err, data);
            } else {
                callback(_this, null, data);
            }
        });
    }

    destroy() {
        this.ec2 = null;
        _this = null;
    }
}

export let Components = [{
    name: "AWSEC2Actions",
    description: "actions for aws ec2 operations",
    create: (param, callback) => {
        return new AWSActions(param, callback);
    }
}];