import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';
import path from 'path';

// .env.local dosyasındaki değişkenleri yüklüyoruz
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // db push ve migration için DIRECT_URL (Port 5432) kullanılır
    url: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  },
});