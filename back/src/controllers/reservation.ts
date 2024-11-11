import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createReservation = async (req: Request, res: Response) => {
  const {
    userId,
    nom,
    numero,
    etat,
    prix,
    poids,
    tailes,
    daten,
    condition,
    quantite,
    images,
    service,
    typec,
  } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Créer la réservation
    const reservation = await prisma.reservation.create({
      data: {
        nom,
        numero,
        etat,
        prix,
        poids,
        tailes,
        daten: new Date(daten),
        condition,
        quantite,
        images,
        service,
        typec,

        user: { connect: { id: userId } },
      },
    });

    return res.status(201).json({
      message: "Réservation créée avec succès",
      reservation,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la réservation :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getReservationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // console.log(id);

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const data = await prisma.reservation.findMany({
      where: {
        userId: parseInt(id),
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error("Erreur lors de la création de la réservation :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getReservationById2 = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // console.log(id);

    const data = await prisma.reservation.findMany({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error("Erreur lors de la création de la réservation :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
