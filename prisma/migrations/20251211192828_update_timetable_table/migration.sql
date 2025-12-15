/*
  Warnings:

  - You are about to drop the column `classroom_id` on the `Timetable` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Timetable" DROP CONSTRAINT "Timetable_classroom_id_fkey";

-- AlterTable
ALTER TABLE "Timetable" DROP COLUMN "classroom_id";
