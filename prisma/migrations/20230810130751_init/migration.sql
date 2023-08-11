-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imgProfile" TEXT NOT NULL,
    "departament" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productLine" TEXT NOT NULL,
    "productImage" TEXT NOT NULL,
    "composition" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isValidated" BOOLEAN NOT NULL DEFAULT false,
    "qrCodeIsActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stamps" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "nameStamp" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Stamps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsValidated" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "validatorId" TEXT NOT NULL,
    "validationDate" TIMESTAMP(3) NOT NULL,
    "productAccepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProductsValidated_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructions" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "whatIAm" TEXT NOT NULL,
    "modeOfUse" TEXT NOT NULL,
    "Precaution" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isValidated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Instructions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructionsValidate" (
    "id" TEXT NOT NULL,
    "idInstruction" TEXT NOT NULL,
    "validatorId" TEXT NOT NULL,
    "validationDate" TIMESTAMP(3) NOT NULL,
    "instructionAccept" BOOLEAN NOT NULL,

    CONSTRAINT "InstructionsValidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsDisabled" (
    "id" TEXT NOT NULL,
    "idProduct" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "disabledDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "ProductsDisabled_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructionsDisabled" (
    "id" TEXT NOT NULL,
    "idInstruction" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "disabledDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "InstructionsDisabled_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "productOrInstruction" BOOLEAN NOT NULL,
    "itemName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginEvents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "activeData" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "drawn" BOOLEAN NOT NULL DEFAULT false,
    "drawnClient" TEXT NOT NULL,

    CONSTRAINT "LoginEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientEvents" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "news" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ClientEvents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stamps" ADD CONSTRAINT "Stamps_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductsValidated" ADD CONSTRAINT "ProductsValidated_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductsValidated" ADD CONSTRAINT "ProductsValidated_validatorId_fkey" FOREIGN KEY ("validatorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructions" ADD CONSTRAINT "Instructions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Instructions" ADD CONSTRAINT "Instructions_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructionsValidate" ADD CONSTRAINT "InstructionsValidate_idInstruction_fkey" FOREIGN KEY ("idInstruction") REFERENCES "Instructions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InstructionsValidate" ADD CONSTRAINT "InstructionsValidate_validatorId_fkey" FOREIGN KEY ("validatorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsDisabled" ADD CONSTRAINT "ProductsDisabled_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProductsDisabled" ADD CONSTRAINT "ProductsDisabled_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructionsDisabled" ADD CONSTRAINT "InstructionsDisabled_idInstruction_fkey" FOREIGN KEY ("idInstruction") REFERENCES "Instructions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InstructionsDisabled" ADD CONSTRAINT "InstructionsDisabled_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
