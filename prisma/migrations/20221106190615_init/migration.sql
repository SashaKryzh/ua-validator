/*
  Warnings:

  - You are about to drop the column `review_comment` on the `TargetReview` table. All the data in the column will be lost.
  - You are about to drop the column `review_comment` on the `EvidenceReview` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Job` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Nationality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `ViewOnWar` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mainEvidenceId` to the `Target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewComment` to the `TargetReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewComment` to the `EvidenceReview` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Target" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "realName" TEXT NOT NULL,
    "nationalityId" TEXT NOT NULL,
    "viewOnWarId" TEXT NOT NULL,
    "mainEvidenceId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Target_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "Nationality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Target_viewOnWarId_fkey" FOREIGN KEY ("viewOnWarId") REFERENCES "ViewOnWar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Target_mainEvidenceId_fkey" FOREIGN KEY ("mainEvidenceId") REFERENCES "Evidence" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Target_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Target" ("createdAt", "creatorId", "deleted", "id", "imageUrl", "nationalityId", "realName", "slug", "updatedAt", "viewOnWarId") SELECT "createdAt", "creatorId", "deleted", "id", "imageUrl", "nationalityId", "realName", "slug", "updatedAt", "viewOnWarId" FROM "Target";
DROP TABLE "Target";
ALTER TABLE "new_Target" RENAME TO "Target";
CREATE UNIQUE INDEX "Target_slug_key" ON "Target"("slug");
CREATE UNIQUE INDEX "Target_mainEvidenceId_key" ON "Target"("mainEvidenceId");
CREATE INDEX "Target_realName_idx" ON "Target"("realName");
CREATE TABLE "new_TargetReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reviewComment" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "targetId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TargetReview_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TargetReview" ("accepted", "createdAt", "id", "targetId", "updatedAt") SELECT "accepted", "createdAt", "id", "targetId", "updatedAt" FROM "TargetReview";
DROP TABLE "TargetReview";
ALTER TABLE "new_TargetReview" RENAME TO "TargetReview";
CREATE UNIQUE INDEX "TargetReview_targetId_key" ON "TargetReview"("targetId");
CREATE TABLE "new_EvidenceReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reviewComment" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "evidenceId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EvidenceReview_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "Evidence" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EvidenceReview" ("accepted", "createdAt", "evidenceId", "id", "updatedAt") SELECT "accepted", "createdAt", "evidenceId", "id", "updatedAt" FROM "EvidenceReview";
DROP TABLE "EvidenceReview";
ALTER TABLE "new_EvidenceReview" RENAME TO "EvidenceReview";
CREATE UNIQUE INDEX "EvidenceReview_evidenceId_key" ON "EvidenceReview"("evidenceId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Job_code_key" ON "Job"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Nationality_code_key" ON "Nationality"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ViewOnWar_code_key" ON "ViewOnWar"("code");
