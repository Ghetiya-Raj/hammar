import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['buyer', 'seller']);

export const auctionStatusEnum = pgEnum('auction_status', [
  'scheduled',
  'live',
  'closed',
  'cancelled',
]);

export const settlementStatusEnum = pgEnum('settlement_status', [
  'pending',
  'paid',
  'moved_to_next_bidder',
  'unsold',
]);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: text('name').notNull(),

  email: text('email').notNull().unique(),

  passwordHash: text('password_hash').notNull(),

  role: userRoleEnum('role').notNull(),

  isTwoFactorEnabled: boolean('is_two_factor_enabled').notNull().default(false),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const auctions = pgTable('auctions', {
  id: uuid('id').defaultRandom().primaryKey(),

  sellerId: uuid('seller_id')
    .notNull()
    .references(() => users.id),

  title: text('title').notNull(),

  description: text('description').notNull(),

  category: text('category').notNull(),

  startingPrice: integer('starting_price').notNull(),

  reservePrice: integer('reserve_price'),

  currentHighestBid: integer('current_highest_bid'),

  startTime: timestamp('start_time', { withTimezone: true }).notNull(),

  endTime: timestamp('end_time', { withTimezone: true }).notNull(),

  status: auctionStatusEnum('status').notNull().default('scheduled'),

  settlementStatus: settlementStatusEnum('settlement_status')
    .notNull()
    .default('pending'),

  winnerId: uuid('winner_id').references(() => users.id),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const auctionImages = pgTable('auction_images', {
  id: uuid('id').defaultRandom().primaryKey(),

  auctionId: uuid('auction_id')
    .notNull()
    .references(() => auctions.id, { onDelete: 'cascade' }),

  imageUrl: text('image_url').notNull(),

  sortOrder: integer('sort_order').notNull().default(0),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const bids = pgTable('bids', {
  id: uuid('id').defaultRandom().primaryKey(),

  auctionId: uuid('auction_id')
    .notNull()
    .references(() => auctions.id, { onDelete: 'cascade' }),

  bidderId: uuid('bidder_id')
    .notNull()
    .references(() => users.id),

  amount: integer('amount').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
