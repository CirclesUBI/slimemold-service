import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';

const DEFAULT_PORT = 3000;

// Initialize express instance
const server = express();
server.set('port', process.env.PORT || DEFAULT_PORT);

// Use HTTP middlewares
server.use(compression());
server.use(bodyParser.json());
server.use(methodOverride());

// Use CORS and security middlewares
server.use(cors());
server.use(helmet());

export default server;
