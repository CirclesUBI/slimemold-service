import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

const DEFAULT_PORT = 3000;

const server = express();
server.set('port', process.env.PORT || DEFAULT_PORT);
server.use(compression());
server.use(bodyParser.json());

export default server;
