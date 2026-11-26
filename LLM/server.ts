import express from "express";                    //gere les requetes web
import { analyserIdee } from "./Filter_LLM.js";

const app = express();     // app est notre serveur
app.use(express.json());   // permet de lire le corps JSON de la requête

app.post("/analyse", async (req, res) => {  //fct qui se lance quand on envoie une requete POST à l'adresse /analyse
  const texte = req.body?.texte;

  if (typeof texte !== "string" || texte.trim() === "") {
    res.status(400).json({ erreur: "Le champ 'texte' est requis" });
    return;
  }

  const resultat = await analyserIdee(texte);
  res.json(resultat);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Filtre LLM à l'écoute sur le port ${PORT}`));