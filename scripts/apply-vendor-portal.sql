ALTER TABLE "Vendor" ADD COLUMN IF NOT EXISTS "slug" TEXT;
ALTER TABLE "Vendor" ADD COLUMN IF NOT EXISTS "categorySlug" TEXT;
ALTER TABLE "Vendor" ADD COLUMN IF NOT EXISTS "instagram" TEXT;
ALTER TABLE "Vendor" ADD COLUMN IF NOT EXISTS "whatsapp" TEXT;
ALTER TABLE "Vendor" ADD COLUMN IF NOT EXISTS "address" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "Vendor_slug_key" ON "Vendor"("slug");
CREATE INDEX IF NOT EXISTS "Vendor_categorySlug_city_idx" ON "Vendor"("categorySlug", "city");

ALTER TABLE "MarketplaceLead" ADD COLUMN IF NOT EXISTS "coupleUserId" TEXT;
ALTER TABLE "MarketplaceLead" ADD COLUMN IF NOT EXISTS "quoteAmount" DOUBLE PRECISION;
CREATE INDEX IF NOT EXISTS "MarketplaceLead_coupleUserId_idx" ON "MarketplaceLead"("coupleUserId");

CREATE TABLE IF NOT EXISTS "VendorShowcase" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT UNIQUE NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "categorySlug" TEXT NOT NULL DEFAULT 'dugun-mekanlari',
  "tagline" TEXT NOT NULL DEFAULT '',
  "story" TEXT NOT NULL DEFAULT '',
  "contactName" TEXT NOT NULL DEFAULT '',
  "contactTitle" TEXT NOT NULL DEFAULT '',
  "contactPhone" TEXT NOT NULL DEFAULT '',
  "contactEmail" TEXT NOT NULL DEFAULT '',
  "instagram" TEXT NOT NULL DEFAULT '',
  "website" TEXT NOT NULL DEFAULT '',
  "youtube" TEXT NOT NULL DEFAULT '',
  "linkedin" TEXT NOT NULL DEFAULT '',
  "whatsapp" TEXT NOT NULL DEFAULT '',
  "address" TEXT NOT NULL DEFAULT '',
  "city" TEXT NOT NULL DEFAULT '',
  "district" TEXT NOT NULL DEFAULT '',
  "citySlug" TEXT NOT NULL DEFAULT 'istanbul',
  "lat" TEXT NOT NULL DEFAULT '41.0082',
  "lng" TEXT NOT NULL DEFAULT '28.9784',
  "transportNotes" TEXT NOT NULL DEFAULT '',
  "seatedCapacity" INTEGER NOT NULL DEFAULT 0,
  "cocktailCapacity" INTEGER NOT NULL DEFAULT 0,
  "parking" INTEGER NOT NULL DEFAULT 0,
  "priceFrom" INTEGER NOT NULL DEFAULT 0,
  "priceType" TEXT NOT NULL DEFAULT 'PACKAGE',
  "features" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "usps" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "published" BOOLEAN NOT NULL DEFAULT false,
  "moderationStatus" TEXT NOT NULL DEFAULT 'DRAFT',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "VendorShowcase_published_moderationStatus_idx" ON "VendorShowcase"("published", "moderationStatus");
CREATE INDEX IF NOT EXISTS "VendorShowcase_categorySlug_citySlug_idx" ON "VendorShowcase"("categorySlug", "citySlug");

CREATE TABLE IF NOT EXISTS "VendorGalleryItem" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "caption" TEXT NOT NULL DEFAULT '',
  "isCover" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "VendorGalleryItem_vendorId_sortOrder_idx" ON "VendorGalleryItem"("vendorId", "sortOrder");

CREATE TABLE IF NOT EXISTS "VendorServiceOffer" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "kind" TEXT NOT NULL DEFAULT 'PACKAGE',
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL DEFAULT '',
  "weekdayPrice" INTEGER NOT NULL DEFAULT 0,
  "weekendPrice" INTEGER NOT NULL DEFAULT 0,
  "includes" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "VendorServiceOffer_vendorId_kind_idx" ON "VendorServiceOffer"("vendorId", "kind");

CREATE TABLE IF NOT EXISTS "VendorCampaign" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "discount" TEXT NOT NULL DEFAULT '',
  "expiry" TIMESTAMP,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "VendorCampaign_vendorId_idx" ON "VendorCampaign"("vendorId");

CREATE TABLE IF NOT EXISTS "VendorFaqItem" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "VendorFaqItem_vendorId_idx" ON "VendorFaqItem"("vendorId");

CREATE TABLE IF NOT EXISTS "VendorStaffMember" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'Ekip',
  "phone" TEXT NOT NULL DEFAULT '',
  "email" TEXT NOT NULL DEFAULT '',
  "assignedEvent" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "VendorStaffMember_vendorId_idx" ON "VendorStaffMember"("vendorId");

CREATE TABLE IF NOT EXISTS "VendorCoupleThread" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "coupleUserId" TEXT NOT NULL,
  "conversationId" TEXT UNIQUE NOT NULL,
  "coupleNames" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS "VendorCoupleThread_vendorId_coupleUserId_key" ON "VendorCoupleThread"("vendorId", "coupleUserId");
CREATE INDEX IF NOT EXISTS "VendorCoupleThread_coupleUserId_idx" ON "VendorCoupleThread"("coupleUserId");

CREATE TABLE IF NOT EXISTS "VendorDeal" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "coupleUserId" TEXT,
  "coupleNames" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "totalAmount" INTEGER NOT NULL DEFAULT 0,
  "depositAmount" INTEGER NOT NULL DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "weddingDate" TEXT,
  "guestCount" INTEGER NOT NULL DEFAULT 0,
  "notes" TEXT NOT NULL DEFAULT '',
  "leadId" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "VendorDeal_vendorId_status_idx" ON "VendorDeal"("vendorId", "status");
CREATE INDEX IF NOT EXISTS "VendorDeal_coupleUserId_idx" ON "VendorDeal"("coupleUserId");

CREATE TABLE IF NOT EXISTS "VendorDealMilestone" (
  "id" TEXT PRIMARY KEY,
  "dealId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "dueAt" TIMESTAMP,
  "isDone" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS "VendorDealMilestone_dealId_idx" ON "VendorDealMilestone"("dealId");

CREATE TABLE IF NOT EXISTS "VendorReviewRecord" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "coupleUserId" TEXT,
  "authorName" TEXT NOT NULL,
  "rating" INTEGER NOT NULL DEFAULT 5,
  "comment" TEXT NOT NULL,
  "vendorReply" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "VendorReviewRecord_vendorId_isPublished_idx" ON "VendorReviewRecord"("vendorId", "isPublished");

CREATE TABLE IF NOT EXISTS "VendorCalendarItem" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "coupleUserId" TEXT,
  "dealId" TEXT,
  "title" TEXT NOT NULL,
  "coupleNames" TEXT NOT NULL DEFAULT '',
  "startsAt" TIMESTAMP NOT NULL,
  "endsAt" TIMESTAMP,
  "kind" TEXT NOT NULL DEFAULT 'MEETING',
  "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
  "note" TEXT NOT NULL DEFAULT '',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "VendorCalendarItem_vendorId_startsAt_idx" ON "VendorCalendarItem"("vendorId", "startsAt");

CREATE TABLE IF NOT EXISTS "VendorPaymentRequest" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "dealId" TEXT,
  "coupleUserId" TEXT,
  "coupleNames" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "amount" INTEGER NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "paymentUrl" TEXT NOT NULL DEFAULT '',
  "dueDate" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS "VendorPaymentRequest_vendorId_status_idx" ON "VendorPaymentRequest"("vendorId", "status");
CREATE INDEX IF NOT EXISTS "VendorPaymentRequest_coupleUserId_idx" ON "VendorPaymentRequest"("coupleUserId");
