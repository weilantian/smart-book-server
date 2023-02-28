/*
  Warnings:

  - You are about to drop the column `autoStartEndBooking` on the `Slot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "autoStartEndBooking" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "autoStartEndBooking";
