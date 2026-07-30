import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";
import path from "path";

// .env ve .env.local dosyalarını doğrudan okunabilir hale getir
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || "",
    directUrl: process.env.DIRECT_URL || "",
  },
});