'use strict';
import * as log4js from 'log4js';
import * as fs from 'fs';
import { myPath } from './myPath'

class Logger {

    constructor() {
        var logdir = myPath.getLogPath();
        
        if (!fs.existsSync(logdir)) {
            fs.mkdirSync(logdir);
        }

        log4js.configure({
            appenders: [
                {
                    type: 'console'
                },
                {
                    type: 'file', filename: logdir + 'agent.log'
                }
            ]
        });
    }

    getLogger() {
        return log4js.getLogger.apply(log4js, arguments);
    }
}

export let logger = new Logger();