-- WedyPlan ops tables (IF NOT EXISTS)

CREATE TYPE "OpsDesk" AS ENUM ('SUPER', 'FINANCE', 'SALES', 'REGION', 'CRM');
CREATE TYPE "OpsTaskPriority" AS ENUM ('URGENT', 'HIGH', 'MEDIUM', 'LOW');
CREATE TYPE "OpsTaskStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'BLOCKED', 'DONE');

CREATE TABLE IF NOT EXISTS "AdminStaff" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT UNIQUE NOT NULL,
  "desk" "OpsDesk" NOT NULL,
  "title" TEXT NOT NULL DEFAULT 'Uzman',
  "regionCode" TEXT,
  "managerUserId" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "extraPerms" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "revokedPerms" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "VendorPackage" (
  "id" TEXT PRIMARY KEY,
  "code" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "tagline" TEXT NOT NULL DEFAULT '',
  "monthlyPrice" DECIMAL(12,2) NOT NULL,
  "yearlyPrice" DECIMAL(12,2) NOT NULL,
  "trialDays" INTEGER NOT NULL DEFAULT 14,
  "leadQuota" INTEGER NOT NULL DEFAULT 20,
  "featuredSlots" INTEGER NOT NULL DEFAULT 0,
  "teamSeats" INTEGER NOT NULL DEFAULT 1,
  "commissionPct" DECIMAL(5,2) NOT NULL DEFAULT 12,
  "features" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "isPublic" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "VendorPackageSale" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "packageId" TEXT NOT NULL,
  "billingCycle" TEXT NOT NULL DEFAULT 'MONTHLY',
  "amount" DECIMAL(12,2) NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "soldByUserId" TEXT,
  "regionCode" TEXT,
  "startsAt" TIMESTAMP,
  "endsAt" TIMESTAMP,
  "notes" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "VendorLegalProfile" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT UNIQUE NOT NULL,
  "companyType" TEXT NOT NULL DEFAULT 'SOLE',
  "legalTitle" TEXT NOT NULL DEFAULT '',
  "address" TEXT NOT NULL DEFAULT '',
  "phone" TEXT NOT NULL DEFAULT '',
  "email" TEXT NOT NULL DEFAULT '',
  "authorizedName" TEXT NOT NULL DEFAULT '',
  "taxNumber" TEXT,
  "taxOffice" TEXT,
  "kycStatus" TEXT NOT NULL DEFAULT 'NOT_STARTED',
  "reviewNotes" TEXT,
  "submittedAt" TIMESTAMP,
  "reviewedAt" TIMESTAMP,
  "reviewedByUserId" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "VendorKycDocument" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "docType" TEXT NOT NULL,
  "fileName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "contentBase64" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "reviewNotes" TEXT,
  "reviewedByUserId" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "GibInvoice" (
  "id" TEXT PRIMARY KEY,
  "number" TEXT UNIQUE NOT NULL,
  "direction" TEXT NOT NULL DEFAULT 'OUTGOING',
  "partyName" TEXT NOT NULL,
  "partyTaxNo" TEXT,
  "vendorId" TEXT,
  "dealId" TEXT,
  "description" TEXT NOT NULL,
  "subTotal" DECIMAL(12,2) NOT NULL,
  "taxTotal" DECIMAL(12,2) NOT NULL,
  "grandTotal" DECIMAL(12,2) NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'TRY',
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "gibUuid" TEXT,
  "gibStatus" TEXT NOT NULL DEFAULT 'NOT_SENT',
  "dueDate" TIMESTAMP,
  "issuedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "createdByUserId" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "FinanceLedgerEntry" (
  "id" TEXT PRIMARY KEY,
  "accountCode" TEXT NOT NULL,
  "accountName" TEXT NOT NULL,
  "vendorId" TEXT,
  "invoiceId" TEXT,
  "debit" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "credit" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "memo" TEXT NOT NULL DEFAULT '',
  "postedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "FinanceDebt" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT,
  "partyName" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "amount" DECIMAL(12,2) NOT NULL,
  "dueDate" TIMESTAMP NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'OPEN',
  "installment" INTEGER NOT NULL DEFAULT 1,
  "notes" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "InventorySku" (
  "id" TEXT PRIMARY KEY,
  "sku" TEXT UNIQUE NOT NULL,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'GENEL',
  "quantity" INTEGER NOT NULL DEFAULT 0,
  "unit" TEXT NOT NULL DEFAULT 'adet',
  "unitCost" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "warehouse" TEXT NOT NULL DEFAULT 'Merkez',
  "reorderAt" INTEGER NOT NULL DEFAULT 5,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "HrEmployee" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT,
  "fullName" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "desk" "OpsDesk",
  "department" TEXT NOT NULL,
  "salaryGross" DECIMAL(12,2) NOT NULL,
  "startDate" TIMESTAMP NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'ACTIVE',
  "regionCode" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "PayrollPeriod" (
  "id" TEXT PRIMARY KEY,
  "period" TEXT UNIQUE NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "employeeCount" INTEGER NOT NULL DEFAULT 0,
  "totalGross" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "totalNet" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "notes" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "CrmParty" (
  "id" TEXT PRIMARY KEY,
  "kind" TEXT NOT NULL DEFAULT 'PROSPECT',
  "name" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "city" TEXT,
  "regionCode" TEXT,
  "vendorId" TEXT,
  "coupleUserId" TEXT,
  "ownerUserId" TEXT,
  "score" INTEGER NOT NULL DEFAULT 40,
  "source" TEXT NOT NULL DEFAULT 'MANUAL',
  "notes" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "CrmDeal" (
  "id" TEXT PRIMARY KEY,
  "partyId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "amount" DECIMAL(12,2) NOT NULL,
  "stage" TEXT NOT NULL DEFAULT 'LEAD',
  "paymentTerms" TEXT NOT NULL DEFAULT 'PEŞİN',
  "installmentCount" INTEGER NOT NULL DEFAULT 1,
  "regionCode" TEXT,
  "ownerUserId" TEXT,
  "needsRegionApproval" BOOLEAN NOT NULL DEFAULT true,
  "approvedByUserId" TEXT,
  "lostReason" TEXT,
  "packageId" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "CrmActivity" (
  "id" TEXT PRIMARY KEY,
  "partyId" TEXT,
  "dealId" TEXT,
  "type" TEXT NOT NULL DEFAULT 'NOTE',
  "body" TEXT NOT NULL,
  "at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "authorUserId" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "VendorOpsRequest" (
  "id" TEXT PRIMARY KEY,
  "vendorId" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'SUPPORT',
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'OPEN',
  "assigneeUserId" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "SupportCase" (
  "id" TEXT PRIMARY KEY,
  "source" TEXT NOT NULL DEFAULT 'ANONYMOUS',
  "channel" TEXT NOT NULL DEFAULT 'FORM',
  "name" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'OPEN',
  "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
  "slaMinutes" INTEGER NOT NULL DEFAULT 240,
  "assigneeUserId" TEXT,
  "relatedDesk" "OpsDesk" NOT NULL DEFAULT 'CRM',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "SupportCaseMessage" (
  "id" TEXT PRIMARY KEY,
  "caseId" TEXT NOT NULL,
  "author" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "OpsTask" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "details" TEXT NOT NULL DEFAULT '',
  "desk" "OpsDesk" NOT NULL,
  "assigneeUserId" TEXT,
  "creatorUserId" TEXT NOT NULL,
  "priority" "OpsTaskPriority" NOT NULL DEFAULT 'MEDIUM',
  "status" "OpsTaskStatus" NOT NULL DEFAULT 'OPEN',
  "dueAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "OpsChannel" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "desk" "OpsDesk",
  "isPrivate" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "OpsChatMessage" (
  "id" TEXT PRIMARY KEY,
  "channelId" TEXT NOT NULL,
  "authorUserId" TEXT NOT NULL,
  "authorName" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "OpsCalendarEvent" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "details" TEXT NOT NULL DEFAULT '',
  "startsAt" TIMESTAMP NOT NULL,
  "endsAt" TIMESTAMP NOT NULL,
  "location" TEXT,
  "meetUrl" TEXT,
  "desk" "OpsDesk",
  "ownerUserId" TEXT NOT NULL,
  "attendees" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "OpsPulseEvent" (
  "id" TEXT PRIMARY KEY,
  "desk" "OpsDesk",
  "category" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "actor" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "IntegrationCredential" (
  "key" TEXT PRIMARY KEY,
  "label" TEXT NOT NULL,
  "value" TEXT NOT NULL DEFAULT '',
  "isEnabled" BOOLEAN NOT NULL DEFAULT false,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE "Vendor" ADD COLUMN IF NOT EXISTS "companyType" TEXT;
ALTER TABLE "Vendor" ADD COLUMN IF NOT EXISTS "kycStatus" TEXT DEFAULT 'NOT_STARTED';
ALTER TABLE "Vendor" ADD COLUMN IF NOT EXISTS "activePackageCode" TEXT;
