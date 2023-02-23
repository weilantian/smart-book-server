-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('AVAILABLE', 'FULL', 'ENDED');

-- CreateEnum
CREATE TYPE "SlotStatus" AS ENUM ('AVAILABLE', 'FULL', 'CANCELLED');

-- CreateTable
CREATE TABLE "Invites" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "inviterId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Invites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" TEXT NOT NULL,
    "availableParticipatorNum" INTEGER NOT NULL,
    "hostId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "SlotStatus" NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_hostEvents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_participateEvents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_participateSlots" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_hostEvents_AB_unique" ON "_hostEvents"("A", "B");

-- CreateIndex
CREATE INDEX "_hostEvents_B_index" ON "_hostEvents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_participateEvents_AB_unique" ON "_participateEvents"("A", "B");

-- CreateIndex
CREATE INDEX "_participateEvents_B_index" ON "_participateEvents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_participateSlots_AB_unique" ON "_participateSlots"("A", "B");

-- CreateIndex
CREATE INDEX "_participateSlots_B_index" ON "_participateSlots"("B");

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hostEvents" ADD CONSTRAINT "_hostEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hostEvents" ADD CONSTRAINT "_hostEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participateEvents" ADD CONSTRAINT "_participateEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participateEvents" ADD CONSTRAINT "_participateEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participateSlots" ADD CONSTRAINT "_participateSlots_A_fkey" FOREIGN KEY ("A") REFERENCES "Slot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participateSlots" ADD CONSTRAINT "_participateSlots_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
