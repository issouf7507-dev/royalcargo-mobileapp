import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "votre_clé_secrète";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Récupérer le token d'authentification depuis les en-têtes
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentification requise." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    // Attacher l'ID de l'utilisateur décodé à la requête
    req.userId = decoded.userId;

    // Passer à la prochaine fonction ou middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Token invalide ou expiré." });
  }
};
