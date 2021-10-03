import { logger } from './logger';

import { app } from './app';

app.listen(3000, () => {
  logger.info('Server running');
});
