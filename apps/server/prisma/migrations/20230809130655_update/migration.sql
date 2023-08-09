/*
  Warnings:

  - You are about to drop the column `attendeeBookingRefrenceCode` on the `BookedSlot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookedSlot" DROP COLUMN "attendeeBookingRefrenceCode",
ADD COLUMN     "attendeeBookingReferenceCode" TEXT NOT NULL DEFAULT '';
