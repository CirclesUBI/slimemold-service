import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

const server = express();

server.set('port', 3000);
server.use(compression());
server.use(bodyParser.json());

export default server;
