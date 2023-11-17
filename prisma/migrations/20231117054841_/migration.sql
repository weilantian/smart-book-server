-- DropForeignKey
ALTER TABLE "BookedSlot" DROP CONSTRAINT "BookedSlot_bookableId_fkey";

-- AlterTable
ALTER TABLE "BookedSlot" ALTER COLUMN "bookableId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BookedSlot" ADD CONSTRAINT "BookedSlot_bookableId_fkey" FOREIGN KEY ("bookableId") REFERENCES "Bookable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
