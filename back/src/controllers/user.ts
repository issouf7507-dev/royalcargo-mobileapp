import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const JWT_SECRET =
  process.env.JWT_SECRET || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail", // Remplacez par votre service d'e-mail
  auth: {
    user: "entar225@gmail.com",
    pass: "tffj nqfb insc lyqz",
  },
});

// Inscription
export const createUser = async (req: Request, res: Response) => {
  const { nom, prenoms, tel, email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Valeur invalide" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  const existingUserum = await prisma.user.findUnique({
    where: { tel },
  });

  if (existingUser || existingUserum) {
    return res
      .status(409)
      .json({ error: "Email déjà utilisé ou Numero déjà utilisé" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  try {
    const newUser = await prisma.user.create({
      data: {
        nom,
        tel,
        prenoms,
        email,
        password: hashedPassword,
        verificationCode,
      },
    });

    // Lire le modèle HTML et remplacer le code de vérification
    const emailTemplatePath = path.join(
      __dirname,
      "../views/emailTemplate.html"
    );
    let emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
    emailTemplate = emailTemplate.replace(
      "{{verificationCode}}",
      verificationCode
    );

    await transporter.sendMail({
      from: "entar225@gmail.com",
      to: email,
      subject: "Vérification de votre compte (RoyalCargo)",
      html: emailTemplate, // Utilisez le contenu HTML
    });

    return res.status(201).json({
      message:
        "Utilisateur créé avec succès. Vérifiez votre e-mail pour le code de vérification.",
      email: newUser.email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Oups, il y a un problème." });
  }
};

// Verification du compte
export const verifyUser = async (req: Request, res: Response) => {
  const { email, verificationCode } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.verificationCode !== verificationCode) {
    return res.status(400).json({ error: "Code de vérification incorrect" });
  }

  if (user.isVerified) {
    return res.status(400).json({ error: "Le compte est déjà vérifié" });
  }

  await prisma.user.update({
    where: { email },
    data: { isVerified: true, verificationCode: null },
  });

  return res.status(200).json({ message: "Compte vérifié avec succès" });
};
// log user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Valeur invalide" });
  }

  try {
    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Vérifier si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Vérifier si l'utilisateur est bien vérifié
    if (!user.isVerified) {
      return res.status(403).json({
        error: "Veuillez vérifier votre email avant de vous connecter",
      });
    }

    // Créer un token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Durée de validité du token
    });

    return res.status(200).json({
      message: "Connexion réussie",
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// modification du user
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.userId; // Assurez-vous que req.userId est défini par un middleware d'authentification
  const { nom, prenoms, password } = req.body;

  // Vérifier si au moins un champ est fourni pour la mise à jour
  if (!nom && !prenoms && !password) {
    return res
      .status(400)
      .json({ error: "Aucune donnée fournie pour la mise à jour." });
  }

  try {
    // Initialiser un objet de mise à jour
    const updatedData: any = {};

    // Vérifier les champs fournis et ajouter les données à updatedData si présentes
    if (nom) updatedData.nom = nom;
    if (prenoms) updatedData.prenoms = prenoms;
    if (password) {
      // Hash le nouveau mot de passe avant de le stocker
      updatedData.password = await bcrypt.hash(password, 10);
    }

    // Mise à jour de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    return res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
