import * as migration_20260904_033014_initial from './20260904_033014_initial';
import * as migration_20260919_191809_orders from './20260919_191809_orders';
import * as migration_20260919_220339_coupons from './20260919_220339_coupons';
import * as migration_20260921_170141_guest_orders from './20260921_170141_guest_orders';

export const migrations = [
  {
    up: migration_20260904_033014_initial.up,
    down: migration_20260904_033014_initial.down,
    name: '20260904_033014_initial',
  },
  {
    up: migration_20260919_191809_orders.up,
    down: migration_20260919_191809_orders.down,
    name: '20260919_191809_orders',
  },
  {
    up: migration_20260919_220339_coupons.up,
    down: migration_20260919_220339_coupons.down,
    name: '20260919_220339_coupons',
  },
  {
    up: migration_20260921_170141_guest_orders.up,
    down: migration_20260921_170141_guest_orders.down,
    name: '20260921_170141_guest_orders'
  },
];
