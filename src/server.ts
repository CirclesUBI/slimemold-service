import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';

import errorsMiddleware from './middleware/errors'; // TODO fix ts types in this file and helper files

const DEFAULT_PORT = 3000;

// Initialize express instance
const server = express();
server.set('port', process.env.PORT || DEFAULT_PORT);

// Use HTTP middleware
server.use(compression());
server.use(bodyParser.json());
server.use(methodOverride());

// Use CORS and security middleware
server.use(cors());
server.use(helmet());

// Use middleware to handle all thrown errors
server.use(errorsMiddleware);

export default server;
