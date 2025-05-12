-- CreateTable
CREATE TABLE "age_rating" (
    "id" BIGSERIAL NOT NULL,
    "organisation" TEXT,
    "category" TEXT,
    "cover_url" TEXT,

    CONSTRAINT "age_rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "constructor" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "log_url" TEXT,

    CONSTRAINT "constructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_to_age_rating" (
    "id" BIGSERIAL NOT NULL,
    "game_id" BIGINT NOT NULL,
    "age_rating_id" BIGINT NOT NULL,

    CONSTRAINT "game_to_rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "key_word" TEXT,
    "cover_url" TEXT,
    "created_at" DATE,
    "storyline" TEXT,
    "summary" TEXT,
    "parent_game" BIGINT,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games_to_platforms" (
    "id" BIGSERIAL NOT NULL,
    "game_id" BIGINT NOT NULL,
    "platform_id" BIGINT NOT NULL,
    "url" TEXT,

    CONSTRAINT "games_to_platforms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "library" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT,
    "game_id" BIGINT,
    "platform_id" BIGINT,

    CONSTRAINT "library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platforms" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "constructor" BIGINT,
    "logo_url" TEXT,

    CONSTRAINT "platforms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" BIGINT NOT NULL,
    "game_id" BIGINT NOT NULL,
    "rate" DECIMAL NOT NULL,
    "comment" TEXT,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "picture" TEXT,
    "email" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "provider_id" TEXT,
    "password" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "game_id" BIGINT NOT NULL,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "game_to_age_rating" ADD CONSTRAINT "game_to_age_rating_age_rating_id_fkey" FOREIGN KEY ("age_rating_id") REFERENCES "age_rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_to_age_rating" ADD CONSTRAINT "game_to_rating_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games_to_platforms" ADD CONSTRAINT "games_to_platforms_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games_to_platforms" ADD CONSTRAINT "games_to_platforms_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library" ADD CONSTRAINT "library_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library" ADD CONSTRAINT "library_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library" ADD CONSTRAINT "library_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platforms" ADD CONSTRAINT "platforms_constructor_fkey" FOREIGN KEY ("constructor") REFERENCES "constructor"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
