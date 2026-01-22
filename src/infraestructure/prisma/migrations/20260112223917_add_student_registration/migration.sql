/*
  Warnings:

  - You are about to drop the column `registration` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registrationNumber]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registrationNumber` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "registration",
ADD COLUMN     "registrationNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_registrationNumber_key" ON "Student"("registrationNumber");
