/*
  Warnings:

  - You are about to drop the column `name` on the `Evaluation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[classId,type]` on the table `Evaluation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Evaluation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EvaluationType" AS ENUM ('AV1', 'AV2', 'FINAL', 'SUBSTITUTIVE', 'OTHER');

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_classId_fkey";

-- AlterTable
ALTER TABLE "Evaluation" DROP COLUMN "name",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" "EvaluationType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_classId_type_key" ON "Evaluation"("classId", "type");

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
