import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  uniqueIndex,
  pgEnum,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

export const postStatusEnum = pgEnum("post_status", ["published", "draft"]);
export const notificationTypeEnum = pgEnum("notification_type", [
  "like",
  "repost",
  "follow",
  "mention",
  "rss_item",
  "system",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  authorId: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  parentId: text("parent_id").references((): AnyPgColumn => posts.id, {
    onDelete: "set null",
  }),
  status: postStatusEnum("status").notNull().default("published"),
  postMessage: text("post_message").notNull(),
  postRepo: text("post_repo"),
  postCommit: text("post_commit"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at"),
}, (table) => [
  index("posts_author_id_idx").on(table.authorId),
  index("posts_parent_id_idx").on(table.parentId),
  index("posts_status_idx").on(table.status),
  index("posts_created_at_idx").on(table.createdAt),
]);

export const postLikes = pgTable(
  "post_likes",
  {
    id: text("id").primaryKey(),
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("post_likes_post_user_uidx").on(table.postId, table.userId),
    index("post_likes_user_id_idx").on(table.userId),
    index("post_likes_post_id_idx").on(table.postId),
  ],
);

export const postReposts = pgTable(
  "post_reposts",
  {
    id: text("id").primaryKey(),
    postId: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    comment: text("comment"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("post_reposts_post_user_uidx").on(table.postId, table.userId),
    index("post_reposts_user_id_idx").on(table.userId),
    index("post_reposts_post_id_idx").on(table.postId),
  ],
);

export const follows = pgTable(
  "follows",
  {
    id: text("id").primaryKey(),
    followerId: text("follower_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    followingId: text("following_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("follows_follower_following_uidx").on(
      table.followerId,
      table.followingId,
    ),
    index("follows_follower_id_idx").on(table.followerId),
    index("follows_following_id_idx").on(table.followingId),
  ],
);

export const rssSources = pgTable(
  "rss_sources",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    feedUrl: text("feed_url").notNull().unique(),
    siteUrl: text("site_url"),
    description: text("description"),
    isDefault: boolean("is_default").default(true).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("rss_sources_default_idx").on(table.isDefault),
    index("rss_sources_active_idx").on(table.isActive),
  ],
);

export const rssSubscriptions = pgTable(
  "rss_subscriptions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    sourceId: text("source_id").references(() => rssSources.id, {
      onDelete: "set null",
    }),
    customFeedUrl: text("custom_feed_url"),
    title: text("title"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("rss_subscriptions_user_source_uidx").on(
      table.userId,
      table.sourceId,
    ),
    uniqueIndex("rss_subscriptions_user_custom_url_uidx").on(
      table.userId,
      table.customFeedUrl,
    ),
    index("rss_subscriptions_user_id_idx").on(table.userId),
    index("rss_subscriptions_source_id_idx").on(table.sourceId),
  ],
);

export const rssItems = pgTable(
  "rss_items",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    sourceId: text("source_id").references(() => rssSources.id, {
      onDelete: "set null",
    }),
    subscriptionId: text("subscription_id").references(
      () => rssSubscriptions.id,
      {
        onDelete: "set null",
      },
    ),
    externalId: text("external_id"),
    title: text("title").notNull(),
    url: text("url").notNull(),
    summary: text("summary"),
    content: text("content"),
    author: text("author"),
    publishedAt: timestamp("published_at"),
    fetchedAt: timestamp("fetched_at").defaultNow().notNull(),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("rss_items_user_url_uidx").on(table.userId, table.url),
    index("rss_items_user_id_idx").on(table.userId),
    index("rss_items_source_id_idx").on(table.sourceId),
    index("rss_items_subscription_id_idx").on(table.subscriptionId),
    index("rss_items_published_at_idx").on(table.publishedAt),
  ],
);

export const notifications = pgTable(
  "notifications",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    actorId: text("actor_id").references(() => user.id, {
      onDelete: "set null",
    }),
    type: notificationTypeEnum("type").notNull(),
    postId: text("post_id").references(() => posts.id, {
      onDelete: "set null",
    }),
    rssItemId: text("rss_item_id").references(() => rssItems.id, {
      onDelete: "set null",
    }),
    message: text("message").notNull(),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("notifications_user_id_idx").on(table.userId),
    index("notifications_actor_id_idx").on(table.actorId),
    index("notifications_type_idx").on(table.type),
    index("notifications_created_at_idx").on(table.createdAt),
  ],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  posts: many(posts),
  postLikes: many(postLikes),
  postReposts: many(postReposts),
  following: many(follows, { relationName: "follower" }),
  followers: many(follows, { relationName: "following" }),
  rssSubscriptions: many(rssSubscriptions),
  rssItems: many(rssItems),
  receivedNotifications: many(notifications, {
    relationName: "notificationRecipient",
  }),
  sentNotifications: many(notifications, { relationName: "notificationActor" }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(user, {
    fields: [posts.authorId],
    references: [user.id],
  }),
  parent: one(posts, {
    fields: [posts.parentId],
    references: [posts.id],
  }),
  children: many(posts),
  likes: many(postLikes),
  reposts: many(postReposts),
  notifications: many(notifications),
}));

export const postLikesRelations = relations(postLikes, ({ one }) => ({
  post: one(posts, {
    fields: [postLikes.postId],
    references: [posts.id],
  }),
  user: one(user, {
    fields: [postLikes.userId],
    references: [user.id],
  }),
}));

export const postRepostsRelations = relations(postReposts, ({ one }) => ({
  post: one(posts, {
    fields: [postReposts.postId],
    references: [posts.id],
  }),
  user: one(user, {
    fields: [postReposts.userId],
    references: [user.id],
  }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(user, {
    fields: [follows.followerId],
    references: [user.id],
    relationName: "follower",
  }),
  following: one(user, {
    fields: [follows.followingId],
    references: [user.id],
    relationName: "following",
  }),
}));

export const rssSourcesRelations = relations(rssSources, ({ many }) => ({
  subscriptions: many(rssSubscriptions),
  items: many(rssItems),
}));

export const rssSubscriptionsRelations = relations(
  rssSubscriptions,
  ({ one, many }) => ({
    user: one(user, {
      fields: [rssSubscriptions.userId],
      references: [user.id],
    }),
    source: one(rssSources, {
      fields: [rssSubscriptions.sourceId],
      references: [rssSources.id],
    }),
    items: many(rssItems),
  }),
);

export const rssItemsRelations = relations(rssItems, ({ one, many }) => ({
  user: one(user, {
    fields: [rssItems.userId],
    references: [user.id],
  }),
  source: one(rssSources, {
    fields: [rssItems.sourceId],
    references: [rssSources.id],
  }),
  subscription: one(rssSubscriptions, {
    fields: [rssItems.subscriptionId],
    references: [rssSubscriptions.id],
  }),
  notifications: many(notifications),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  recipient: one(user, {
    fields: [notifications.userId],
    references: [user.id],
    relationName: "notificationRecipient",
  }),
  actor: one(user, {
    fields: [notifications.actorId],
    references: [user.id],
    relationName: "notificationActor",
  }),
  post: one(posts, {
    fields: [notifications.postId],
    references: [posts.id],
  }),
  rssItem: one(rssItems, {
    fields: [notifications.rssItemId],
    references: [rssItems.id],
  }),
}));
