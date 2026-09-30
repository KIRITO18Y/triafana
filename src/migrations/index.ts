import * as migration_20260904_033014_initial from './20260904_033014_initial';
import * as migration_20260918_020923_promo_banner_global from './20260918_020923_promo_banner_global';
import * as migration_20260918_025719_add_customers_google_id from './20260918_025719_add_customers_google_id';
import * as migration_20260918_040345_add_orders_collection from './20260918_040345_add_orders_collection';
import * as migration_20260919_220339_coupons from './20260919_220339_coupons';
import * as migration_20260929_024721_add_wompi_payment_fields from './20260929_024721_add_wompi_payment_fields';

export const migrations = [
  {
    up: migration_20260904_033014_initial.up,
    down: migration_20260904_033014_initial.down,
    name: '20260904_033014_initial',
  },
  {
    up: migration_20260918_020923_promo_banner_global.up,
    down: migration_20260918_020923_promo_banner_global.down,
    name: '20260918_020923_promo_banner_global',
  },
  {
    up: migration_20260918_025719_add_customers_google_id.up,
    down: migration_20260918_025719_add_customers_google_id.down,
    name: '20260918_025719_add_customers_google_id',
  },
  {
    up: migration_20260918_040345_add_orders_collection.up,
    down: migration_20260918_040345_add_orders_collection.down,
    name: '20260918_040345_add_orders_collection',
  },
  {
    up: migration_20260919_220339_coupons.up,
    down: migration_20260919_220339_coupons.down,
    name: '20260919_220339_coupons',
  },
  {
    up: migration_20260929_024721_add_wompi_payment_fields.up,
    down: migration_20260929_024721_add_wompi_payment_fields.down,
    name: '20260929_024721_add_wompi_payment_fields',
  },
];
