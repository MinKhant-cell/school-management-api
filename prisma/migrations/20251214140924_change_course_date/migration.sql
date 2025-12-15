/*
  Warnings:

  - You are about to drop the column `photo_url` on the `Course` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Course_name_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "photo_url",
ADD COLUMN     "image_url" TEXT,
ALTER COLUMN "start_date" SET DATA TYPE TEXT,
ALTER COLUMN "end_date" SET DATA TYPE TEXT;
