-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `etat` VARCHAR(191) NOT NULL,
    `prix` INTEGER NOT NULL,
    `poids` INTEGER NOT NULL,
    `tailes` INTEGER NOT NULL,
    `daten` DATETIME(3) NOT NULL,
    `condition` BOOLEAN NOT NULL,
    `images` VARCHAR(191) NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `trackCode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_trackCode_key`(`trackCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userdash` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(191) NOT NULL,
    `passwd` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `userdash_user_key`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
