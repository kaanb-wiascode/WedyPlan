ALTER TABLE "Couple" ADD COLUMN IF NOT EXISTS "venueName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Couple" ADD COLUMN IF NOT EXISTS "guestCountGoal" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Couple" ADD COLUMN IF NOT EXISTS "vibe" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Couple" ADD COLUMN IF NOT EXISTS "slug" TEXT;
ALTER TABLE "Couple" ADD COLUMN IF NOT EXISTS "onboardingDone" BOOLEAN NOT NULL DEFAULT false;
CREATE UNIQUE INDEX IF NOT EXISTS "Couple_slug_key" ON "Couple"("slug");

CREATE TABLE IF NOT EXISTS "CoupleInvitation" (
  "id" TEXT PRIMARY KEY,
  "coupleId" TEXT UNIQUE NOT NULL,
  "userId" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "title" TEXT NOT NULL,
  "dateLabel" TEXT NOT NULL DEFAULT '',
  "timeLabel" TEXT NOT NULL DEFAULT '19:00',
  "venueName" TEXT NOT NULL DEFAULT '',
  "address" TEXT NOT NULL DEFAULT '',
  "theme" TEXT NOT NULL DEFAULT 'minimalist-white',
  "coverImage" TEXT NOT NULL DEFAULT '',
  "welcomeMessage" TEXT NOT NULL DEFAULT '',
  "askDietary" BOOLEAN NOT NULL DEFAULT true,
  "askSongRequest" BOOLEAN NOT NULL DEFAULT true,
  "showWishlist" BOOLEAN NOT NULL DEFAULT true,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "CoupleInvitation_userId_idx" ON "CoupleInvitation"("userId");

CREATE TABLE IF NOT EXISTS "CouplePhoto" (
  "id" TEXT PRIMARY KEY,
  "coupleId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "caption" TEXT NOT NULL DEFAULT '',
  "uploaderName" TEXT NOT NULL DEFAULT 'Çift',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "CouplePhoto_coupleId_createdAt_idx" ON "CouplePhoto"("coupleId", "createdAt");
CREATE INDEX IF NOT EXISTS "CouplePhoto_userId_idx" ON "CouplePhoto"("userId");

CREATE TABLE IF NOT EXISTS "CoupleGiftItem" (
  "id" TEXT PRIMARY KEY,
  "coupleId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'Hediye',
  "price" INTEGER NOT NULL DEFAULT 0,
  "imageUrl" TEXT NOT NULL DEFAULT '',
  "isPurchased" BOOLEAN NOT NULL DEFAULT false,
  "purchasedBy" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "CoupleGiftItem_coupleId_idx" ON "CoupleGiftItem"("coupleId");
CREATE INDEX IF NOT EXISTS "CoupleGiftItem_userId_idx" ON "CoupleGiftItem"("userId");

CREATE TABLE IF NOT EXISTS "CoupleRsvp" (
  "id" TEXT PRIMARY KEY,
  "coupleId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "guestName" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "attending" BOOLEAN NOT NULL,
  "plusOneCount" INTEGER NOT NULL DEFAULT 0,
  "dietary" TEXT NOT NULL DEFAULT '',
  "songRequest" TEXT NOT NULL DEFAULT '',
  "note" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "CoupleRsvp_coupleId_createdAt_idx" ON "CoupleRsvp"("coupleId", "createdAt");
CREATE INDEX IF NOT EXISTS "CoupleRsvp_userId_idx" ON "CoupleRsvp"("userId");
