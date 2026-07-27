import { config } from 'dotenv';

// Next.js .env.local dosyasını yükle
config({ path: '.env.local' });

export default {
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
