#!/bin/sh
set -e

echo "🚀 Running Prisma migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database..."
npx prisma db seed || echo "⚠️ No seed script found, skipping."

echo "✅ Starting NestJS app..."
exec npm run start:prod
