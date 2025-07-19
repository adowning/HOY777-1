CREATE TABLE `achievement_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`index` integer,
	`num` integer,
	`award` integer,
	`state` integer,
	`rate` integer
);
--> statement-breakpoint
CREATE TABLE `achievements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `announcements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text,
	`starts_at` integer,
	`ends_at` integer
);
--> statement-breakpoint
CREATE TABLE `balances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`amount` integer,
	`currency` text,
	`available_balance` integer,
	`real` text,
	`bonus` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `banners` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image_url` text,
	`link_url` text,
	`icon_path` text,
	`click_feedback` integer,
	`content` text
);
--> statement-breakpoint
CREATE TABLE `bonuses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`amount` integer,
	`claimed` integer DEFAULT false,
	`type` integer,
	`status` integer,
	`now` text,
	`max` text,
	`ended_at` integer,
	`created_at` integer,
	`gain_amount` text,
	`currency` text,
	`receive` integer,
	`wager` integer,
	`rate` integer,
	`deposit` text,
	`children` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `chat_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text,
	`avatar` text,
	`grade` text,
	`grade_color` text,
	`grade_background` text,
	`sender` text,
	`receiver` text,
	`message` text,
	`star_level` text
);
--> statement-breakpoint
CREATE TABLE `countries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`code` text
);
--> statement-breakpoint
CREATE TABLE `currencies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`code` text
);
--> statement-breakpoint
CREATE TABLE `deposits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`amount` integer,
	`status` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`id_number` text,
	`first_name` text,
	`last_name` text,
	`channels_id` text,
	`note` text,
	`currency` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `explain_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`index` integer,
	`num` integer,
	`award` integer,
	`status` integer,
	`rate` integer
);
--> statement-breakpoint
CREATE TABLE `game_big_wins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`game_id` text,
	`game_name` text,
	`game_icon` text,
	`user_name` text,
	`user_vip_group` integer,
	`user_vip_level` integer,
	`bet_amount` text,
	`multiplier` text,
	`win_amount` text,
	`time` integer
);
--> statement-breakpoint
CREATE TABLE `game_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`slug` text,
	`icon` text,
	`image` text,
	`pictures` text,
	`game_count` integer,
	`page_no` integer
);
--> statement-breakpoint
CREATE TABLE `game_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`created_at` integer,
	`amount` text,
	`multiplier` text,
	`bet_id` text,
	`status` text,
	`profit` integer
);
--> statement-breakpoint
CREATE TABLE `games` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`provider` text,
	`category_id` integer,
	FOREIGN KEY (`category_id`) REFERENCES `game_categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `invite_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`time` text,
	`user` text,
	`bonus` text
);
--> statement-breakpoint
CREATE TABLE `invites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`inviter_id` integer,
	`invitee_id` integer,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`inviter_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`invitee_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `languages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`code` text
);
--> statement-breakpoint
CREATE TABLE `live_wins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image` text,
	`level` integer,
	`game_name` text,
	`betting_amount` text
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`read` integer DEFAULT false,
	`content` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `promos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text,
	`code` text,
	`image_path` text,
	`text` text,
	`desc` text,
	`countdown` integer,
	`content` text,
	`click_feedback` integer,
	`button_path` text,
	`button_text` text
);
--> statement-breakpoint
CREATE TABLE `rewards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `statistics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`today_deposited_user` integer,
	`yesterday_deposited_user` integer,
	`today_revenue` integer,
	`yesterday_revenue` integer,
	`this_month_deposited_user` integer,
	`this_month_revenue` integer,
	`total_registered_user` integer,
	`total_depositing_user` integer,
	`total_revenue` integer
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`amount` integer,
	`type` text,
	`status` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` text,
	`username` text,
	`email` text,
	`phone` text,
	`avatar` text,
	`balance` integer,
	`withdrawable` integer,
	`vip_level` integer,
	`invite_url` text,
	`invite_code` text,
	`first_name` text,
	`last_name` text,
	`id_number` text,
	`email_confirmed` integer DEFAULT false,
	`phone_confirmed` integer DEFAULT false,
	`date_of_birth` text,
	`county` text,
	`state` text,
	`city` text,
	`address` text,
	`postal_code` text,
	`language` text,
	`locale` text,
	`initial_profile_complete` integer DEFAULT false,
	`is_suspended` integer,
	`sys_communications` integer DEFAULT false,
	`locked_personal_info_fields` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `vip_level_awards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`level` integer,
	`award` integer
);
--> statement-breakpoint
CREATE TABLE `vip_level_reward_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`notes_id` text,
	`created_at` text,
	`amount` text,
	`vip_level` text,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `vip_levels` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`level` integer,
	`name` text,
	`rank_id` integer,
	`protection_conditions` integer,
	`deposit_exp` integer,
	`bet_exp` integer,
	`free_spins_times` integer,
	`uprank_award` integer,
	`week_award` integer,
	`withdrawals_amount` integer,
	`withdrawal_times` integer,
	`month_withdrawals_amount` integer,
	`month_withdrawals_times` integer,
	`month_award` integer,
	`free_withdrawals` integer,
	`free_withdrawals_times` integer,
	`withdrawal_fee` integer,
	`bet_award_rate` text,
	`signin_award` text,
	`tasks_max` integer,
	`deposit_rate` integer,
	`bet_rate` integer,
	`available_daily_bonus_time` text,
	`collectable_week_bonus_day` text,
	`collectable_month_bonus_day` text
);
--> statement-breakpoint
CREATE TABLE `vip_rebate_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`notes_id` text,
	`created_at` text,
	`amount` text,
	`cash_back` text,
	`vip_level` text,
	`vip_rate` text,
	`game_type` text
);
--> statement-breakpoint
CREATE TABLE `vip_signin_awards` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`day` integer,
	`award` integer
);
--> statement-breakpoint
CREATE TABLE `vip_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`index` integer,
	`task_id` integer,
	`task_type` integer,
	`task_terms` text,
	`state` integer,
	`award` integer
);
--> statement-breakpoint
CREATE TABLE `vip_times_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`notes_id` text,
	`created_at` text,
	`amount` text,
	`vip_level` text,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `vips` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`level` integer,
	`name` text,
	`icon` text,
	`banner` text,
	`background` text,
	`color` text,
	`text_color` text,
	`progress` integer,
	`progress_max` integer,
	`progress_text` text,
	`level_up_award` integer,
	`level_up_award_received` integer,
	`level_up_award_unreceived` integer,
	`level_up_award_list` text,
	`signin_award` integer,
	`signin_award_received` integer,
	`signin_award_unreceived` integer,
	`signin_award_list` text,
	`award_total` integer,
	`award_total_received` integer,
	`award_total_unreceived` integer,
	`award_total_list` text,
	`deposit_exp` integer,
	`bet_exp` integer,
	`rank_bet_exp` integer,
	`rank_deposit_exp` integer,
	`free_spin_times` integer,
	`week_gift` integer,
	`month_gift` integer,
	`upgrade_gift` integer,
	`now_cash_back` integer,
	`yesterday_cash_back` integer,
	`history_cash_back` integer
);
--> statement-breakpoint
CREATE TABLE `withdrawals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`amount` integer,
	`status` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`id_number` text,
	`first_name` text,
	`last_name` text,
	`channels_id` text,
	`note` text,
	`currency_type` text,
	`currency` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
