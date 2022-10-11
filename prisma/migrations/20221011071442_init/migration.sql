-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "lat" INTEGER NOT NULL,
    "lon" INTEGER NOT NULL,
    "desc" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
