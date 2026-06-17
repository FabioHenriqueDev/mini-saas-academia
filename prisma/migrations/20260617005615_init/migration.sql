-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "personal" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" SERIAL NOT NULL,
    "exercise_name" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_personal" INTEGER NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_id_personal_fkey" FOREIGN KEY ("id_personal") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
