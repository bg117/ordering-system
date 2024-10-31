import * as migration_20241031_043404 from './20241031_043404';
import * as migration_20241031_044600 from './20241031_044600';
import * as migration_20241031_045354 from './20241031_045354';

export const migrations = [
  {
    up: migration_20241031_043404.up,
    down: migration_20241031_043404.down,
    name: '20241031_043404',
  },
  {
    up: migration_20241031_044600.up,
    down: migration_20241031_044600.down,
    name: '20241031_044600',
  },
  {
    up: migration_20241031_045354.up,
    down: migration_20241031_045354.down,
    name: '20241031_045354'
  },
];
