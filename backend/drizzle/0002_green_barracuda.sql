CREATE TYPE "public"."jackpot_type_enum" AS ENUM('GRAND', 'MAJOR', 'MINOR', 'MINI');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('INSTORE_CASH', 'CREDIT_CARD', 'BANK_TRANSFER', 'CRYPTO');--> statement-breakpoint
CREATE TYPE "public"."session_status" AS ENUM('ACTIVE', 'COMPLETED', 'EXPIRED');--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"uid" text,
	"username" text NOT NULL,
	"email" text,
	"password_hash" text,
	"phone" text,
	"avatar" text,
	"balance" integer,
	"withdrawable" integer,
	"vip_level" integer,
	"invite_url" text,
	"invite_code" text,
	"first_name" text,
	"last_name" text,
	"id_number" text,
	"email_confirmed" boolean DEFAULT false,
	"phone_confirmed" boolean DEFAULT false,
	"date_of_birth" text,
	"county" text,
	"role" "role" DEFAULT 'user' NOT NULL,
	"state" text,
	"city" text,
	"address" text,
	"postal_code" text,
	"language" text,
	"current_game_sesssion" text DEFAULT null,
	"locale" text,
	"initial_profile_complete" boolean DEFAULT false,
	"is_suspended" integer,
	"sys_communications" boolean DEFAULT false,
	"locked_personal_info_fields" jsonb,
	"last_seen_at" timestamp,
	"last_started_at" timestamp,
	"last_sign_in_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "vip_level_awards" (
	"id" varchar PRIMARY KEY NOT NULL,
	"level" integer,
	"award" integer
);
--> statement-breakpoint
CREATE TABLE "vip_level_reward_history" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"notes_id" text,
	"created_at" text,
	"amount" text,
	"vip_level" text,
	"type" text
);
--> statement-breakpoint
CREATE TABLE "vip_levels" (
	"id" varchar PRIMARY KEY NOT NULL,
	"level" integer,
	"name" text,
	"rank_id" integer,
	"protection_conditions" integer,
	"deposit_exp" integer,
	"bet_exp" integer,
	"free_spins_times" integer,
	"uprank_award" integer,
	"week_award" integer,
	"withdrawals_amount" integer,
	"withdrawal_times" integer,
	"month_withdrawals_amount" integer,
	"month_withdrawals_times" integer,
	"month_award" integer,
	"free_withdrawals" integer,
	"free_withdrawals_times" integer,
	"withdrawal_fee" integer,
	"bet_award_rate" jsonb,
	"signin_award" jsonb,
	"tasks_max" integer,
	"deposit_rate" integer,
	"bet_rate" integer,
	"available_daily_bonus_time" text,
	"collectable_week_bonus_day" text,
	"collectable_month_bonus_day" text
);
--> statement-breakpoint
CREATE TABLE "vip_rebate_history" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"notes_id" text,
	"created_at" text,
	"amount" text,
	"cash_back" text,
	"vip_level" text,
	"vip_rate" text,
	"game_type" text
);
--> statement-breakpoint
CREATE TABLE "vip_signin_awards" (
	"id" varchar PRIMARY KEY NOT NULL,
	"day" integer,
	"award" integer
);
--> statement-breakpoint
CREATE TABLE "vip_tasks" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"index" integer,
	"task_id" integer,
	"task_type" integer,
	"task_terms" jsonb,
	"state" integer,
	"award" integer
);
--> statement-breakpoint
CREATE TABLE "vip_times_history" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"notes_id" text,
	"created_at" text,
	"amount" text,
	"vip_level" text,
	"type" text
);
--> statement-breakpoint
CREATE TABLE "vips" (
	"id" varchar PRIMARY KEY NOT NULL,
	"level" integer,
	"name" text,
	"icon" text,
	"banner" text,
	"background" text,
	"color" text,
	"text_color" text,
	"progress" integer,
	"progress_max" integer,
	"progress_text" text,
	"level_up_award" integer,
	"level_up_award_received" integer,
	"level_up_award_unreceived" integer,
	"level_up_award_list" jsonb,
	"signin_award" integer,
	"signin_award_received" integer,
	"signin_award_unreceived" integer,
	"signin_award_list" jsonb,
	"award_total" integer,
	"award_total_received" integer,
	"award_total_unreceived" integer,
	"award_total_list" jsonb,
	"deposit_exp" integer,
	"bet_exp" integer,
	"rank_bet_exp" integer,
	"rank_deposit_exp" integer,
	"free_spin_times" integer,
	"week_gift" integer,
	"month_gift" integer,
	"upgrade_gift" integer,
	"now_cash_back" integer,
	"yesterday_cash_back" integer,
	"history_cash_back" integer
);
--> statement-breakpoint
CREATE TABLE "favorite_games" (
	"user_id" varchar NOT NULL,
	"game_id" varchar NOT NULL,
	CONSTRAINT "favorite_games_user_id_game_id_pk" PRIMARY KEY("user_id","game_id")
);
--> statement-breakpoint
CREATE TABLE "game_big_wins" (
	"id" varchar PRIMARY KEY NOT NULL,
	"game_id" text,
	"game_name" text,
	"game_icon" text,
	"user_name" text,
	"user_vip_group" integer,
	"user_vip_level" integer,
	"bet_amount" text,
	"multiplier" text,
	"win_amount" text,
	"time" integer
);
--> statement-breakpoint
CREATE TABLE "game_categories" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"title" text,
	"category" text,
	"slug" text,
	"type" text,
	"icon" text,
	"image" text,
	"pictures" text,
	"game_count" integer,
	"page_no" integer
);
--> statement-breakpoint
CREATE TABLE "game_history" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" integer,
	"amount" text,
	"multiplier" text,
	"bet_id" text,
	"status" text,
	"profit" integer
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"provider" text,
	"category_id" varchar
);
--> statement-breakpoint
CREATE TABLE "balances" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"amount" integer,
	"currency" text,
	"available_balance" integer,
	"real" text,
	"bonus" text
);
--> statement-breakpoint
CREATE TABLE "bonuses" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"amount" integer,
	"claimed" boolean DEFAULT false,
	"type" integer,
	"status" integer,
	"now" text,
	"max" text,
	"ended_at" integer,
	"created_at" integer,
	"gain_amount" text,
	"currency" text,
	"receive" integer,
	"wager" integer,
	"rate" integer,
	"deposit" text,
	"children" jsonb
);
--> statement-breakpoint
CREATE TABLE "deposits" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"amount" integer,
	"status" text,
	"id_number" text,
	"first_name" text,
	"last_name" text,
	"channels_id" text,
	"note" text,
	"currency" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"amount" integer,
	"type" text,
	"status" text,
	"note" text,
	"balance" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "withdrawals" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"amount" integer,
	"status" text,
	"id_number" text,
	"first_name" text,
	"last_name" text,
	"channels_id" text,
	"note" text,
	"currency_type" text,
	"currency" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "achievements" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "invite_commission_history" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"from_user_id" varchar,
	"bonus" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "invite_stats" (
	"user_id" varchar NOT NULL,
	"bonus_month" text DEFAULT '0',
	"bonus_today" text DEFAULT '0',
	"bonus_total" text DEFAULT '0',
	"bonus_yesterdays" text DEFAULT '0',
	"deposit_users" integer DEFAULT 0,
	"deposit_users_month" integer DEFAULT 0,
	"deposit_users_today" integer DEFAULT 0,
	"deposit_users_yesterdays" integer DEFAULT 0,
	"invited_users" integer DEFAULT 0,
	"available_bonus" text DEFAULT '0',
	CONSTRAINT "invite_stats_user_id_pk" PRIMARY KEY("user_id")
);
--> statement-breakpoint
CREATE TABLE "invites" (
	"id" varchar PRIMARY KEY NOT NULL,
	"inviter_id" varchar,
	"invitee_id" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rewards" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"achievement_id" varchar NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"status" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_rewards" (
	"user_id" varchar NOT NULL,
	"achievement_bonus" text DEFAULT '0',
	"achievement_status" integer DEFAULT 0 NOT NULL,
	"cash_back" text DEFAULT '0',
	"weekly_bonus" text DEFAULT '0',
	"level_up_bonuses" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "user_rewards_user_id_pk" PRIMARY KEY("user_id")
);
--> statement-breakpoint
CREATE TABLE "operators" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"operator_secret" text NOT NULL,
	"operator_access" text NOT NULL,
	"callback_url" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"allowed_ips" text[] NOT NULL,
	"description" text,
	"balance" integer DEFAULT 0 NOT NULL,
	"net_revenue" integer DEFAULT 0 NOT NULL,
	"accepted_payments" "payment_method"[] NOT NULL,
	"owner_id" text,
	"last_used_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "operators_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" varchar PRIMARY KEY NOT NULL,
	"title" text DEFAULT 'default' NOT NULL,
	"product_type" text DEFAULT 'bundle' NOT NULL,
	"bonus_total_in_credits" integer DEFAULT 0 NOT NULL,
	"is_active" boolean,
	"price_in_cents" integer DEFAULT 0 NOT NULL,
	"amount_to_receive_in_credits" integer DEFAULT 0 NOT NULL,
	"best_value" integer DEFAULT 0 NOT NULL,
	"discount_in_cents" integer DEFAULT 0 NOT NULL,
	"bonus_spins" integer DEFAULT 0 NOT NULL,
	"is_promo" boolean DEFAULT false,
	"total_discount_in_cents" integer DEFAULT 0 NOT NULL,
	"operator_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallets" (
	"id" varchar PRIMARY KEY NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL,
	"payment_method" "payment_method" DEFAULT 'INSTORE_CASH' NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"address" varchar(255),
	"cashtag" varchar(50),
	"user_id" text NOT NULL,
	"operator_id" text NOT NULL,
	"last_used_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "wallets_address_unique" UNIQUE("address"),
	CONSTRAINT "wallets_cashtag_unique" UNIQUE("cashtag"),
	CONSTRAINT "wallets_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "promo_groups" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promos" (
	"id" varchar PRIMARY KEY NOT NULL,
	"promo_group_id" varchar,
	"name" text,
	"description" text,
	"code" text,
	"image_path" text,
	"text" text,
	"desc" text,
	"countdown" boolean,
	"content" text,
	"click_feedback" integer,
	"button_path" text,
	"button_text" text
);
--> statement-breakpoint
CREATE TABLE "achievement_items" (
	"id" varchar PRIMARY KEY NOT NULL,
	"index" integer,
	"num" integer,
	"award" integer,
	"state" integer,
	"rate" integer
);
--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" varchar PRIMARY KEY NOT NULL,
	"content" text,
	"starts_at" timestamp,
	"ends_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "banners" (
	"id" varchar PRIMARY KEY NOT NULL,
	"image_path" text,
	"link_url" text,
	"icon_path" text,
	"click_feedback" integer,
	"content" text
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" varchar PRIMARY KEY NOT NULL,
	"type" text,
	"avatar" text,
	"grade" text,
	"grade_color" text,
	"grade_background" text,
	"sender" text,
	"receiver" text,
	"message" text,
	"star_level" jsonb
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"code" text
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"code" text
);
--> statement-breakpoint
CREATE TABLE "explain_items" (
	"id" varchar PRIMARY KEY NOT NULL,
	"index" integer,
	"num" integer,
	"award" integer,
	"status" integer,
	"rate" integer
);
--> statement-breakpoint
CREATE TABLE "invite_history" (
	"id" varchar PRIMARY KEY NOT NULL,
	"time" text,
	"user" text,
	"bonus" text
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"code" text
);
--> statement-breakpoint
CREATE TABLE "live_wins" (
	"id" varchar PRIMARY KEY NOT NULL,
	"image" text,
	"level" integer,
	"game_name" text,
	"betting_amount" text
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"read" boolean DEFAULT false,
	"content" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "statistics" (
	"id" varchar PRIMARY KEY NOT NULL,
	"today_deposited_user" integer,
	"yesterday_deposited_user" integer,
	"today_revenue" integer,
	"yesterday_revenue" integer,
	"this_month_deposited_user" integer,
	"this_month_revenue" integer,
	"total_registered_user" integer,
	"total_depositing_user" integer,
	"total_revenue" integer
);
--> statement-breakpoint
CREATE TABLE "auth_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"status" "session_status" DEFAULT 'ACTIVE' NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"device_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone,
	"last_seen" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"auth_session_id" text NOT NULL,
	"user_id" text NOT NULL,
	"game_id" text,
	"status" "session_status" DEFAULT 'ACTIVE' NOT NULL,
	"total_wagered" integer DEFAULT 0 NOT NULL,
	"total_won" integer DEFAULT 0 NOT NULL,
	"total_xp_gained" integer DEFAULT 0 NOT NULL,
	"rtp" numeric(5, 2),
	"duration" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"end_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "game_spins" (
	"id" varchar PRIMARY KEY NOT NULL,
	"player_name" text,
	"game_name" text,
	"spin_data" jsonb,
	"gross_win_amount" real,
	"wager_amount" real,
	"spin_number" integer DEFAULT 0,
	"player_avatar" text,
	"session_id" varchar,
	"user_id" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"occurred_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "vip_info" (
	"user_id" text PRIMARY KEY NOT NULL,
	"level" integer DEFAULT 0,
	"deposit_exp" integer DEFAULT 0,
	"bet_exp" integer DEFAULT 0,
	"rank_bet_exp" integer DEFAULT 0,
	"rank_deposit_exp" integer DEFAULT 0,
	"free_spin_times" integer DEFAULT 0,
	"week_gift" integer DEFAULT 0,
	"month_gift" integer DEFAULT 0,
	"upgrade_gift" integer DEFAULT 0,
	"now_cash_back" integer DEFAULT 0,
	"yesterday_cash_back" integer DEFAULT 0,
	"history_cash_back" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "jackpot_contributions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"jackpot_id" text NOT NULL,
	"game_spin_id" text NOT NULL,
	"contribution_amount_coins" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jackpot_wins" (
	"id" varchar PRIMARY KEY NOT NULL,
	"jackpot_id" text NOT NULL,
	"winner_id" text NOT NULL,
	"win_amount_coins" integer NOT NULL,
	"game_spin_id" text NOT NULL,
	"transaction_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "jackpot_wins_game_spin_id_unique" UNIQUE("game_spin_id")
);
--> statement-breakpoint
CREATE TABLE "jackpots" (
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "jackpot_type_enum" NOT NULL,
	"current_amount_coins" integer DEFAULT 0 NOT NULL,
	"seed_amount_coins" integer DEFAULT 0 NOT NULL,
	"minimum_bet_coins" integer DEFAULT 1 NOT NULL,
	"contribution_rate_basis_points" integer DEFAULT 0 NOT NULL,
	"probability_per_million" integer DEFAULT 0 NOT NULL,
	"minimum_time_between_wins_minutes" integer DEFAULT 0 NOT NULL,
	"last_won_at" timestamp,
	"last_won_by" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "vip_level_reward_history" ADD CONSTRAINT "vip_level_reward_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vip_rebate_history" ADD CONSTRAINT "vip_rebate_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vip_tasks" ADD CONSTRAINT "vip_tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vip_times_history" ADD CONSTRAINT "vip_times_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_games" ADD CONSTRAINT "favorite_games_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_games" ADD CONSTRAINT "favorite_games_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "games" ADD CONSTRAINT "games_category_id_game_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."game_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "balances" ADD CONSTRAINT "balances_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bonuses" ADD CONSTRAINT "bonuses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "withdrawals" ADD CONSTRAINT "withdrawals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite_commission_history" ADD CONSTRAINT "invite_commission_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite_commission_history" ADD CONSTRAINT "invite_commission_history_from_user_id_users_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invite_stats" ADD CONSTRAINT "invite_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_inviter_id_users_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invites" ADD CONSTRAINT "invites_invitee_id_users_id_fk" FOREIGN KEY ("invitee_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_rewards" ADD CONSTRAINT "user_rewards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_operator_id_operators_id_fk" FOREIGN KEY ("operator_id") REFERENCES "public"."operators"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_operator_id_operators_id_fk" FOREIGN KEY ("operator_id") REFERENCES "public"."operators"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promos" ADD CONSTRAINT "promos_promo_group_id_promo_groups_id_fk" FOREIGN KEY ("promo_group_id") REFERENCES "public"."promo_groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_auth_session_id_auth_sessions_id_fk" FOREIGN KEY ("auth_session_id") REFERENCES "public"."auth_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_spins" ADD CONSTRAINT "game_spins_session_id_game_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."game_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_spins" ADD CONSTRAINT "game_spins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vip_info" ADD CONSTRAINT "vip_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "wallet_user_id_idx" ON "wallets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "wallet_operator_id_idx" ON "wallets" USING btree ("operator_id");--> statement-breakpoint
CREATE INDEX "wallet_is_active_idx" ON "wallets" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "wallet_cashtag_idx" ON "wallets" USING btree ("cashtag");--> statement-breakpoint
CREATE INDEX "auth_session_user_idx" ON "auth_sessions" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "auth_session_status_idx" ON "auth_sessions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "game_session_auth_session_idx" ON "game_sessions" USING btree ("auth_session_id");--> statement-breakpoint
CREATE INDEX "game_session_user_idx" ON "game_sessions" USING btree ("user_id");