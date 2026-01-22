/*
  Warnings:

  - You are about to drop the `Grade` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_enrollmentId_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_evaluationId_fkey";

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Grade";

-- CreateTable
CREATE TABLE "EvaluationGrade" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "evaluationId" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvaluationGrade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EvaluationGrade_enrollmentId_idx" ON "EvaluationGrade"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationGrade_enrollmentId_evaluationId_key" ON "EvaluationGrade"("enrollmentId", "evaluationId");

-- AddForeignKey
ALTER TABLE "EvaluationGrade" ADD CONSTRAINT "EvaluationGrade_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationGrade" ADD CONSTRAINT "EvaluationGrade_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
