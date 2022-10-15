/*
  Warnings:

  - Added the required column `categoryType` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_type_key" ON "Category"("type");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryType_fkey" FOREIGN KEY ("categoryType") REFERENCES "Category"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
