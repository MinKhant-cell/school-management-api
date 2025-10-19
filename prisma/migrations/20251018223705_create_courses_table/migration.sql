-- CreateTable
CREATE TABLE "Course" (
    "id" BIGINT NOT NULL PRIMARY KEY,
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

-- CreateIndex
CREATE UNIQUE INDEX "Course_employee_id_key" ON "Course"("employee_id");
