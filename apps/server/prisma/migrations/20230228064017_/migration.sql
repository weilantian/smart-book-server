-- CreateEnum
CREATE TYPE "InviteRole" AS ENUM ('HOST', 'PARTICIPATOR');

-- AlterTable
ALTER TABLE "Invites" ADD COLUMN     "expired" BOOLEAN NOT NULL DEFAULT false;
