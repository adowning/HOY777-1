-- Custom Migration

ALTER TABLE banners RENAME COLUMN imageUrl TO imagePath;
ALTER TABLE transactions ADD COLUMN note TEXT;
ALTER TABLE transactions ADD COLUMN balance INTEGER;

CREATE TABLE `promo_groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);

CREATE TABLE `user_rewards` (
	`user_id` integer NOT NULL,
	`achievement_bonus` text DEFAULT '0',
	`achievement_status` integer DEFAULT 0 NOT NULL,
	`cash_back` text DEFAULT '0',
	`weekly_bonus` text DEFAULT '0',
	`level_up_bonuses` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `invite_stats` (
    `user_id` integer NOT NULL,
    `bonus_month` text DEFAULT '0',
    `bonus_today` text DEFAULT '0',
    `bonus_total` text DEFAULT '0',
    `bonus_yesterdays` text DEFAULT '0',
    `deposit_users` integer DEFAULT 0,
    `deposit_users_month` integer DEFAULT 0,
    `deposit_users_today` integer DEFAULT 0,
    `deposit_users_yesterdays` integer DEFAULT 0,
    `invited_users` integer DEFAULT 0,
    `available_bonus` text DEFAULT '0',
    PRIMARY KEY(`user_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `invite_commission_history` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `user_id` integer NOT NULL,
    `from_user_id` integer,
    `bonus` text NOT NULL,
    `created_at` integer,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
    FOREIGN KEY (`from_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `user_achievements` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `user_id` integer NOT NULL,
    `achievement_id` integer NOT NULL,
    `progress` integer DEFAULT 0 NOT NULL,
    `status` integer DEFAULT 0 NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
    FOREIGN KEY (`achievement_id`) REFERENCES `achievements`(`id`) ON UPDATE no action ON DELETE no action
);

ALTER TABLE promos ADD COLUMN promo_group_id INTEGER REFERENCES promo_groups(id);
