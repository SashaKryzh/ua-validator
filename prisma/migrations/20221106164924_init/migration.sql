-- CreateTable
CREATE TABLE "ViewOnWar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Nationality" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Nickname" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    CONSTRAINT "Nickname_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TargetResource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    CONSTRAINT "TargetResource_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TargetReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "review_comment" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "targetId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TargetReview_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Target" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "realName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "nationalityId" TEXT NOT NULL,
    "viewOnWarId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Target_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "Nationality" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Target_viewOnWarId_fkey" FOREIGN KEY ("viewOnWarId") REFERENCES "ViewOnWar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Target_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "resume" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Evidence_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Evidence_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EvidenceReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "review_comment" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "evidenceId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EvidenceReview_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "Evidence" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EvidenceUrl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "evidenceId" TEXT NOT NULL,
    CONSTRAINT "EvidenceUrl_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "Evidence" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EvidenceImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "evidenceId" TEXT NOT NULL,
    CONSTRAINT "EvidenceImage_evidenceId_fkey" FOREIGN KEY ("evidenceId") REFERENCES "Evidence" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TargetJob" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TargetJob_A_fkey" FOREIGN KEY ("A") REFERENCES "Job" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TargetJob_B_fkey" FOREIGN KEY ("B") REFERENCES "Target" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Creator_email_key" ON "Creator"("email");

-- CreateIndex
CREATE INDEX "Creator_email_idx" ON "Creator"("email");

-- CreateIndex
CREATE INDEX "Nickname_value_idx" ON "Nickname"("value");

-- CreateIndex
CREATE UNIQUE INDEX "TargetReview_targetId_key" ON "TargetReview"("targetId");

-- CreateIndex
CREATE INDEX "Target_realName_idx" ON "Target"("realName");

-- CreateIndex
CREATE UNIQUE INDEX "EvidenceReview_evidenceId_key" ON "EvidenceReview"("evidenceId");

-- CreateIndex
CREATE UNIQUE INDEX "_TargetJob_AB_unique" ON "_TargetJob"("A", "B");

-- CreateIndex
CREATE INDEX "_TargetJob_B_index" ON "_TargetJob"("B");
