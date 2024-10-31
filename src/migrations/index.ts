import * as migration_20241031_043404 from './20241031_043404';
import * as migration_20241031_044600 from './20241031_044600';
import * as migration_20241031_045354 from './20241031_045354';
import * as migration_20241031_045701 from './20241031_045701';
import * as migration_20241031_050132 from './20241031_050132';
import * as migration_20241031_051630 from './20241031_051630';
import * as migration_20241031_051827 from './20241031_051827';

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
    name: '20241031_045354',
  },
  {
    up: migration_20241031_045701.up,
    down: migration_20241031_045701.down,
    name: '20241031_045701',
  },
  {
    up: migration_20241031_050132.up,
    down: migration_20241031_050132.down,
    name: '20241031_050132',
  },
  {
    up: migration_20241031_051630.up,
    down: migration_20241031_051630.down,
    name: '20241031_051630',
  },
  {
    up: migration_20241031_051827.up,
    down: migration_20241031_051827.down,
    name: '20241031_051827'
  },
];
