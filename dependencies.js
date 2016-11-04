var FILE_NAME_PACKAGE = 'package.json';
var GLOB_EVERYTHING = '/**/*';
var PATH_NODE_MODULES = './node_modules/';

var _ = require('lodash');

var arrayContains = function(arr, obj) {
    "use strict";
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === obj) {
            return true;
        }
    }

    return false;
};

var getDependenciesGlob = function(isDevDependenciesIncluded, packageFilePath, _keys) {
    "use strict";
    var fs = require('fs');
    var filePath = packageFilePath || './' + FILE_NAME_PACKAGE;
    if (!(fs.existsSync(filePath))) {
        return [];
    }

    if (isDevDependenciesIncluded) {
        return [PATH_NODE_MODULES + GLOB_EVERYTHING];
    }

    var packageContent = JSON.parse(require('fs').readFileSync(filePath));
    var keys = _keys || [];

    var getDependenciesKeys = function(denpendencies) {
        for (var key in denpendencies) {
            if (!arrayContains(keys, PATH_NODE_MODULES + key + GLOB_EVERYTHING)) {
                //console.log('keys count: ' + keys.length);
                //console.log("key: " + key);
                keys.push(PATH_NODE_MODULES + key + GLOB_EVERYTHING);
                keys = _.union(keys, getDependenciesGlob(isDevDependenciesIncluded, PATH_NODE_MODULES + key + '/' + FILE_NAME_PACKAGE, keys));
            }
        }
    };

    getDependenciesKeys(packageContent.dependencies);
    if (isDevDependenciesIncluded) {
        getDependenciesKeys(packageContent.devDependencies);
    }

    return keys;
};

module.exports = getDependenciesGlob;