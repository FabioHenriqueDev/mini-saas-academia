import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Puxa a URL que está definida no seu arquivo .env
    url: process.env.DATABASE_URL, 
  },
})