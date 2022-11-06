-- CreateTable
CREATE TABLE "CheckInSite" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "checkInId" UUID NOT NULL,
    "creatorId" UUID NOT NULL,
    "tenantId" UUID NOT NULL,

    CONSTRAINT "CheckInSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCheckIn" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "userEntry" TIMESTAMP(3) NOT NULL,
    "userExit" TIMESTAMP(3),
    "checkInSiteId" UUID NOT NULL,

    CONSTRAINT "UserCheckIn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCheckIn" ADD CONSTRAINT "UserCheckIn_checkInSiteId_fkey" FOREIGN KEY ("checkInSiteId") REFERENCES "CheckInSite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
