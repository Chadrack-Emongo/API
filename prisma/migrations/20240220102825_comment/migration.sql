/*
  Warnings:

  - You are about to drop the column `profile` on the `Post` table. All the data in the column will be lost.
  - Added the required column `boddy` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "profile",
ADD COLUMN     "boddy" TEXT NOT NULL,
ADD COLUMN     "profil" TEXT,
ADD COLUMN     "thumbnailprofiles" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ADD COLUMN     "profil" TEXT;

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "body" TEXT,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comment_email_key" ON "comment"("email");
