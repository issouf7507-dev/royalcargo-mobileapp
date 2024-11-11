// import { PrismaClient } from "@prisma/client";
// import { NextFunction, Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const prisma = new PrismaClient();

// const JWT_SECRET =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxMjE0NDI5OSwiZXhwIjoxNzEyMTQ3ODk5fQ.Uu1Kw5V8jt8sGbHJ1j1z-AS2VIaf6epAtS4YOmx3QLg";

// export const createUser = async (req: Request, res: Response) => {
//   const { user, passwd } = req.body;

//   if (typeof user !== "string" || typeof passwd !== "string") {
//     return res.status(400).json({ error: "Invalid input" });
//   }

//   const hashedPassword = await bcrypt.hash(passwd, 10);
//   try {
//     const newUser = await prisma.userdash.create({
//       data: {
//         user,
//         passwd: hashedPassword,
//       },
//     });
//     res.json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error creating user" });
//   }
// };

// export const connectUser = async (req: Request, res: Response) => {
//   const { user, passwd } = req.body;

//   if (typeof user !== "string" || typeof passwd !== "string") {
//     return res.status(400).json({ error: "Invalid input" });
//   }

//   try {
//     const data = await prisma.userdash.findUnique({
//       where: {
//         user,
//       },
//     });

//     if (!data) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(passwd, data.passwd);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Incorrect password" });
//     }

//     const token = jwt.sign({ userId: data.id }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.cookie("access_connect", token, {
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     });

//     res.json({
//       message: "Login successful",
//       username: data.user,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Error logging in user" });
//   }
// };

// export const getAlluser = async (req: Request, res: Response) => {
//   try {
//     const data = await prisma.userdash.findMany();
//     if (data) {
//       return res.status(200).json(data);
//     }
//     if (!data) {
//       return res.status(404).json({ message: "Oups, y'a un probleme" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: "Oups, y'a un probleme" });
//   }
// };

// export const authenticateUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);
//   try {
//     // Vérifier le token
//     const decodedToken = jwt.verify(token, JWT_SECRET) as { id: string };
//     // Passer à l'étape suivante du middleware
//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ error: "Accès non autorisé. Token invalide." });
//   }
// };
