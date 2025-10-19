/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "start_date" DATETIME,
    "end_date" DATETIME,
    "duration" TEXT,
    "fees" BIGINT,
    "currency" TEXT,
    "description" TEXT,
    "employee_id" INTEGER,
    "photo_url" TEXT,
    "status" TEXT NOT NULL DEFAULT 'UPCOMING',
    "is_publish" BOOLEAN NOT NULL DEFAULT false,
    "created_by" BIGINT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Course_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("created_at", "created_by", "currency", "description", "duration", "employee_id", "end_date", "fees", "id", "is_publish", "name", "photo_url", "start_date", "status", "updated_at") SELECT "created_at", "created_by", "currency", "description", "duration", "employee_id", "end_date", "fees", "id", "is_publish", "name", "photo_url", "start_date", "status", "updated_at" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");
CREATE UNIQUE INDEX "Course_employee_id_key" ON "Course"("employee_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
