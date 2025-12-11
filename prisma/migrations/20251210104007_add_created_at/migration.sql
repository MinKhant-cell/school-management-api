-- AlterTable
ALTER TABLE "Timetable" ADD COLUMN "updated_at" DATETIME;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "course_id" INTEGER,
    "teacher_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "Subject_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Subject_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Subject" ("course_id", "description", "id", "image_url", "name", "teacher_id") SELECT "course_id", "description", "id", "image_url", "name", "teacher_id" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
CREATE TABLE "new_Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_Teacher" ("email", "id", "name", "phone") SELECT "email", "id", "name", "phone" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
CREATE TABLE "new_TimetableStudent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timetable_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "TimetableStudent_timetable_id_fkey" FOREIGN KEY ("timetable_id") REFERENCES "Timetable" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TimetableStudent_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TimetableStudent" ("id", "student_id", "timetable_id") SELECT "id", "student_id", "timetable_id" FROM "TimetableStudent";
DROP TABLE "TimetableStudent";
ALTER TABLE "new_TimetableStudent" RENAME TO "TimetableStudent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
