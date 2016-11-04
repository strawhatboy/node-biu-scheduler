'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import requestDebugger from '../midwares/requestDebugger';
import expressLoad from 'express-load';
import { logger } from '../infra/logger';

let _logger = logger.getLogger('serverApp');

class ServerApp {
    constructor() {
        this._app = express();
        this._app.use(bodyParser.urlencoded({
            extended: true
        }));
        this._app.use(bodyParser.json());
        this._app.use(requestDebugger);
        expressLoad('lib/controllers')
            .then('lib/routes')
            .into(this._app);
    }

    startServer() {
        _logger.info('starting the express server listening on 8080');
        this._app.listen(8080);
    }
}

export let serverApp = new ServerApp();