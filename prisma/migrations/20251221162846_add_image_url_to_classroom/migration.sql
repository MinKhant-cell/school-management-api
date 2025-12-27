-- CreateEnum
CREATE TYPE "ClassroomStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "description" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "status" "ClassroomStatus" NOT NULL DEFAULT 'AVAILABLE';
