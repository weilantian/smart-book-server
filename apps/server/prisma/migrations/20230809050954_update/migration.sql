-- AlterTable
ALTER TABLE "Bookable" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 3600;

-- AlterTable
ALTER TABLE "BookedSlot" ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 3600;
