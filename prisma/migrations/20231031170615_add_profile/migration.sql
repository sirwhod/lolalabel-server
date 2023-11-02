-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "PCK";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "PR";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "PS";

-- CreateTable
CREATE TABLE "PR"."Users" (
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
CREATE TABLE "PR"."Products" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productLine" TEXT NOT NULL,
    "productImage" TEXT NOT NULL,
    "composition" TEXT NOT NULL,
    "compositionINCI" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isValidated" BOOLEAN NOT NULL DEFAULT false,
    "qrCodeIsActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PR"."Stamps" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "nameStamp" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Stamps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PR"."ProductsValidated" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "validatorId" TEXT NOT NULL,
    "validationDate" TIMESTAMP(3) NOT NULL,
    "productAccepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProductsValidated_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PR"."Instructions" (
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
CREATE TABLE "PR"."InstructionsValidate" (
    "id" TEXT NOT NULL,
    "idInstruction" TEXT NOT NULL,
    "validatorId" TEXT NOT NULL,
    "validationDate" TIMESTAMP(3) NOT NULL,
    "instructionAccept" BOOLEAN NOT NULL,

    CONSTRAINT "InstructionsValidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PR"."ProductsDisabled" (
    "id" TEXT NOT NULL,
    "idProduct" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "disabledDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "ProductsDisabled_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PR"."InstructionsDisabled" (
    "id" TEXT NOT NULL,
    "idInstruction" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "disabledDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "InstructionsDisabled_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PR"."Log" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "productOrInstruction" BOOLEAN NOT NULL,
    "itemName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PS"."LoginEvents" (
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
CREATE TABLE "PS"."ClientEvents" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "news" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ClientEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PCK"."CK_User" (
    "USid" TEXT NOT NULL,
    "USname" TEXT NOT NULL,
    "USusername" TEXT NOT NULL,
    "USpassword" TEXT NOT NULL,
    "USregistration" BIGINT NOT NULL,
    "USstatus" BOOLEAN NOT NULL,
    "USidProfile" TEXT NOT NULL,
    "USidStore" TEXT NOT NULL,

    CONSTRAINT "CK_User_pkey" PRIMARY KEY ("USid")
);

-- CreateTable
CREATE TABLE "PCK"."CK_Profile" (
    "PRid" TEXT NOT NULL,
    "PRname" TEXT NOT NULL,
    "PRstatus" BOOLEAN NOT NULL,

    CONSTRAINT "CK_Profile_pkey" PRIMARY KEY ("PRid")
);

-- CreateTable
CREATE TABLE "PCK"."CK_Store" (
    "STid" TEXT NOT NULL,
    "STname" TEXT NOT NULL,
    "STstatus" BOOLEAN NOT NULL,

    CONSTRAINT "CK_Store_pkey" PRIMARY KEY ("STid")
);

-- CreateTable
CREATE TABLE "PCK"."CK_Checklist" (
    "CLid" TEXT NOT NULL,
    "CLname" TEXT NOT NULL,
    "CLidStore" TEXT NOT NULL,
    "CLstatus" BOOLEAN NOT NULL,

    CONSTRAINT "CK_Checklist_pkey" PRIMARY KEY ("CLid")
);

-- CreateTable
CREATE TABLE "PCK"."CK_Task" (
    "TKid" TEXT NOT NULL,
    "TKidChecklist" TEXT NOT NULL,
    "TKname" TEXT NOT NULL,
    "TKdescription" TEXT NOT NULL,
    "TKstatus" BOOLEAN NOT NULL,

    CONSTRAINT "CK_Task_pkey" PRIMARY KEY ("TKid")
);

-- CreateTable
CREATE TABLE "PCK"."CK_Fill" (
    "FLid" TEXT NOT NULL,
    "FLidTask" TEXT NOT NULL,
    "FLcreatedAt" TIMESTAMP(3) NOT NULL,
    "FLresponse" TEXT NOT NULL,
    "FLcomment" TEXT NOT NULL,
    "FLidUser" TEXT NOT NULL,
    "FLidChecklistFinished" TEXT NOT NULL,

    CONSTRAINT "CK_Fill_pkey" PRIMARY KEY ("FLid")
);

-- CreateTable
CREATE TABLE "PCK"."CK_ChecklistFinished" (
    "CFid" TEXT NOT NULL,
    "CFidChecklist" TEXT NOT NULL,
    "CFidUser" TEXT NOT NULL,
    "CFfinishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CK_ChecklistFinished_pkey" PRIMARY KEY ("CFid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "PR"."Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "CK_User_USusername_key" ON "PCK"."CK_User"("USusername");

-- CreateIndex
CREATE UNIQUE INDEX "CK_Store_STname_key" ON "PCK"."CK_Store"("STname");

-- AddForeignKey
ALTER TABLE "PR"."Products" ADD CONSTRAINT "Products_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PR"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PR"."Stamps" ADD CONSTRAINT "Stamps_productId_fkey" FOREIGN KEY ("productId") REFERENCES "PR"."Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PR"."ProductsValidated" ADD CONSTRAINT "ProductsValidated_productId_fkey" FOREIGN KEY ("productId") REFERENCES "PR"."Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PR"."ProductsValidated" ADD CONSTRAINT "ProductsValidated_validatorId_fkey" FOREIGN KEY ("validatorId") REFERENCES "PR"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PR"."Instructions" ADD CONSTRAINT "Instructions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "PR"."Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PR"."Instructions" ADD CONSTRAINT "Instructions_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "PR"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PR"."InstructionsValidate" ADD CONSTRAINT "InstructionsValidate_idInstruction_fkey" FOREIGN KEY ("idInstruction") REFERENCES "PR"."Instructions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PR"."InstructionsValidate" ADD CONSTRAINT "InstructionsValidate_validatorId_fkey" FOREIGN KEY ("validatorId") REFERENCES "PR"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PR"."ProductsDisabled" ADD CONSTRAINT "ProductsDisabled_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "PR"."Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PR"."ProductsDisabled" ADD CONSTRAINT "ProductsDisabled_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PR"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PR"."InstructionsDisabled" ADD CONSTRAINT "InstructionsDisabled_idInstruction_fkey" FOREIGN KEY ("idInstruction") REFERENCES "PR"."Instructions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PR"."InstructionsDisabled" ADD CONSTRAINT "InstructionsDisabled_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PR"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PR"."Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PR"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_User" ADD CONSTRAINT "CK_User_USidProfile_fkey" FOREIGN KEY ("USidProfile") REFERENCES "PCK"."CK_Profile"("PRid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_User" ADD CONSTRAINT "CK_User_USidStore_fkey" FOREIGN KEY ("USidStore") REFERENCES "PCK"."CK_Store"("STid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_Checklist" ADD CONSTRAINT "CK_Checklist_CLidStore_fkey" FOREIGN KEY ("CLidStore") REFERENCES "PCK"."CK_Store"("STid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_Task" ADD CONSTRAINT "CK_Task_TKidChecklist_fkey" FOREIGN KEY ("TKidChecklist") REFERENCES "PCK"."CK_Checklist"("CLid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_Fill" ADD CONSTRAINT "CK_Fill_FLidTask_fkey" FOREIGN KEY ("FLidTask") REFERENCES "PCK"."CK_Task"("TKid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_Fill" ADD CONSTRAINT "CK_Fill_FLidUser_fkey" FOREIGN KEY ("FLidUser") REFERENCES "PCK"."CK_User"("USid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_Fill" ADD CONSTRAINT "CK_Fill_FLidChecklistFinished_fkey" FOREIGN KEY ("FLidChecklistFinished") REFERENCES "PCK"."CK_ChecklistFinished"("CFid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_ChecklistFinished" ADD CONSTRAINT "CK_ChecklistFinished_CFidChecklist_fkey" FOREIGN KEY ("CFidChecklist") REFERENCES "PCK"."CK_Checklist"("CLid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCK"."CK_ChecklistFinished" ADD CONSTRAINT "CK_ChecklistFinished_CFidUser_fkey" FOREIGN KEY ("CFidUser") REFERENCES "PCK"."CK_User"("USid") ON DELETE RESTRICT ON UPDATE CASCADE;
