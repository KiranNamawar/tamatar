-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "isRevoked" BOOL NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "user_id_index" ON "Session"("userId");
