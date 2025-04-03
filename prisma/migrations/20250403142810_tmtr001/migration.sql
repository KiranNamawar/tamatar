-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "device" STRING;

-- AlterTable
ALTER TABLE "UrlVisit" ADD COLUMN     "browserVersion" STRING;
ALTER TABLE "UrlVisit" ADD COLUMN     "device" STRING;
ALTER TABLE "UrlVisit" ADD COLUMN     "osVersion" STRING;
