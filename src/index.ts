import server from './server';
import logger from './helpers/logger';

// Start server
const env = server.get('env');
const port = server.get('port');

server.listen(port, () => {
  logger.info(`Server is listening at port ${port} in ${env} mode`);
});
