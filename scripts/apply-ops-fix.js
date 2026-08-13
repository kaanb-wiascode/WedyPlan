const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DIRECT_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,
});

const statements = [
  `DO $$ BEGIN CREATE TYPE "OpsDesk" AS ENUM ('SUPER', 'FINANCE', 'SALES', 'REGION', 'CRM'); EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `CREATE TABLE IF NOT EXISTS "AdminStaff" (
    "id" TEXT PRIMARY KEY, "userId" TEXT UNIQUE NOT NULL, "desk" "OpsDesk" NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Uzman', "regionCode" TEXT, "managerUserId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true, "extraPerms" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "revokedPerms" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW())`,
  `CREATE TABLE IF NOT EXISTS "HrEmployee" (
    "id" TEXT PRIMARY KEY, "userId" TEXT, "fullName" TEXT NOT NULL, "title" TEXT NOT NULL,
    "desk" "OpsDesk", "department" TEXT NOT NULL, "salaryGross" DECIMAL(12,2) NOT NULL,
    "startDate" TIMESTAMP NOT NULL, "status" TEXT NOT NULL DEFAULT 'ACTIVE', "regionCode" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW())`,
  `CREATE TABLE IF NOT EXISTS "SupportCase" (
    "id" TEXT PRIMARY KEY, "source" TEXT NOT NULL DEFAULT 'ANONYMOUS', "channel" TEXT NOT NULL DEFAULT 'FORM',
    "name" TEXT NOT NULL, "email" TEXT, "phone" TEXT, "subject" TEXT NOT NULL, "body" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN', "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "slaMinutes" INTEGER NOT NULL DEFAULT 240, "assigneeUserId" TEXT, "relatedDesk" "OpsDesk" NOT NULL DEFAULT 'CRM',
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW())`,
  `CREATE TABLE IF NOT EXISTS "OpsTask" (
    "id" TEXT PRIMARY KEY, "title" TEXT NOT NULL, "details" TEXT NOT NULL DEFAULT '',
    "desk" "OpsDesk" NOT NULL, "assigneeUserId" TEXT, "creatorUserId" TEXT NOT NULL,
    "priority" "OpsTaskPriority" NOT NULL DEFAULT 'MEDIUM', "status" "OpsTaskStatus" NOT NULL DEFAULT 'OPEN',
    "dueAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW())`,
  `CREATE TABLE IF NOT EXISTS "OpsChannel" (
    "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "desk" "OpsDesk", "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW())`,
  `CREATE TABLE IF NOT EXISTS "OpsCalendarEvent" (
    "id" TEXT PRIMARY KEY, "title" TEXT NOT NULL, "details" TEXT NOT NULL DEFAULT '',
    "startsAt" TIMESTAMP NOT NULL, "endsAt" TIMESTAMP NOT NULL, "location" TEXT, "meetUrl" TEXT,
    "desk" "OpsDesk", "ownerUserId" TEXT NOT NULL, "attendees" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW())`,
  `CREATE TABLE IF NOT EXISTS "OpsPulseEvent" (
    "id" TEXT PRIMARY KEY, "desk" "OpsDesk", "category" TEXT NOT NULL, "title" TEXT NOT NULL,
    "actor" TEXT NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW())`,
];

(async () => {
  for (const statement of statements) {
    try {
      await pool.query(statement);
      console.log('OK', statement.slice(0, 50).replace(/\s+/g, ' '));
    } catch (error) {
      console.warn('WARN', error.message);
    }
  }
  await pool.end();
  console.log('OpsDesk tables ready');
})();
