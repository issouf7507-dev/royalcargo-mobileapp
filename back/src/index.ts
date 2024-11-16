import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import user from "./routes/user";
import reservation from "./routes/reservation";
import path from "path";

import "dotenv/config";

const app = express();
const port = 9001;
// const imgDir = path.resolve(__dirname, "../public/img");
const imgDir = path.resolve(__dirname, "../public/img");

// middleware
// cors (Cross-Origin Resource Sharing) est un middleware qui permet à votre application de gérer les requêtes provenant de différents domaines (origines).
app.use(cors());

app.use(bodyParser.json());

// Servir les fichiers statiques
// app.use("/api/v01/img", express.static(imgDir));
//

app.use(user);
app.use(reservation);

app.listen(port, () => {
  console.log(`Server running on http://192.168.1.10:${port}`);
});
