/*
  Warnings:

  - You are about to alter the column `created_by` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `fees` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

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
    "fees" INTEGER,
    "currency" TEXT,
    "description" TEXT,
    "employee_id" INTEGER,
    "photo_url" TEXT,
    "status" TEXT NOT NULL DEFAULT 'UPCOMING',
    "is_publish" BOOLEAN NOT NULL DEFAULT false,
    "created_by" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Course_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("created_at", "created_by", "currency", "description", "duration", "employee_id", "end_date", "fees", "id", "is_publish", "name", "photo_url", "start_date", "status", "updated_at") SELECT "created_at", "created_by", "currency", "description", "duration", "employee_id", "end_date", "fees", "id", "is_publish", "name", "photo_url", "start_date", "status", "updated_at" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");
CREATE UNIQUE INDEX "Course_employee_id_key" ON "Course"("employee_id");
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date_of_birth" DATETIME,
    "gender" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT ' ',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Student" ("createdAt", "date_of_birth", "email", "gender", "id", "name", "status", "updatedAt") SELECT "createdAt", "date_of_birth", "email", "gender", "id", "name", "status", "updatedAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
