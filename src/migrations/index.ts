import * as migration_20260904_033014_initial from './20260904_033014_initial';

export const migrations = [
  {
    up: migration_20260904_033014_initial.up,
    down: migration_20260904_033014_initial.down,
    name: '20260904_033014_initial'
  },
];
