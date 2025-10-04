-- CreateTable
CREATE TABLE "file" (
    "id" SERIAL NOT NULL,
    "size" INTEGER NOT NULL,
    "new_filename" TEXT NOT NULL,
    "original_filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);
