'use strict';

class Path {
    getAppRoot() {
        return __dirname + "/../../";
    }

    getLogPath() {
        return this.getAppRoot() + "logs/";
    }

    getConfigPath() {
        return this.getAppRoot() + "config/";
    }
}

export let myPath = new Path();