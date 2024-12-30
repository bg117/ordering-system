/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    admins: AdminAuthOperations;
    users: UserAuthOperations;
  };
  collections: {
    admins: Admin;
    users: User;
    media: Media;
    items: Item;
    'cart-items': CartItem;
    orders: Order;
    'order-items': OrderItem;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    admins: AdminsSelect<false> | AdminsSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    items: ItemsSelect<false> | ItemsSelect<true>;
    'cart-items': CartItemsSelect<false> | CartItemsSelect<true>;
    orders: OrdersSelect<false> | OrdersSelect<true>;
    'order-items': OrderItemsSelect<false> | OrderItemsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user:
    | (Admin & {
        collection: 'admins';
      })
    | (User & {
        collection: 'users';
      });
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface AdminAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admins".
 */
export interface Admin {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  grade: number;
  section: string;
  firstName: string;
  lastName: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "items".
 */
export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  image: number | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cart-items".
 */
export interface CartItem {
  id: number;
  user: number | User;
  item: number | Item;
  quantity: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: number;
  user: number | User;
  extraInstructions?: string | null;
  placedAt: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "order-items".
 */
export interface OrderItem {
  id: number;
  order: number | Order;
  item: number | Item;
  quantity: number;
  total: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'admins';
        value: number | Admin;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'items';
        value: number | Item;
      } | null)
    | ({
        relationTo: 'cart-items';
        value: number | CartItem;
      } | null)
    | ({
        relationTo: 'orders';
        value: number | Order;
      } | null)
    | ({
        relationTo: 'order-items';
        value: number | OrderItem;
      } | null);
  globalSlug?: string | null;
  user:
    | {
        relationTo: 'admins';
        value: number | Admin;
      }
    | {
        relationTo: 'users';
        value: number | User;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user:
    | {
        relationTo: 'admins';
        value: number | Admin;
      }
    | {
        relationTo: 'users';
        value: number | User;
      };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "admins_select".
 */
export interface AdminsSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  grade?: T;
  section?: T;
  firstName?: T;
  lastName?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "items_select".
 */
export interface ItemsSelect<T extends boolean = true> {
  name?: T;
  price?: T;
  description?: T;
  image?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cart-items_select".
 */
export interface CartItemsSelect<T extends boolean = true> {
  user?: T;
  item?: T;
  quantity?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders_select".
 */
export interface OrdersSelect<T extends boolean = true> {
  user?: T;
  extraInstructions?: T;
  placedAt?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "order-items_select".
 */
export interface OrderItemsSelect<T extends boolean = true> {
  order?: T;
  item?: T;
  quantity?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}