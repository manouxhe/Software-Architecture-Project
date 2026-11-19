from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

app = FastAPI()
modele = SentenceTransformer("paraphrase-multilingual-mpnet-base-v2")

class Texte(BaseModel):
    texte: str

@app.post("/embed")
def embed(req: Texte):
    vecteur = modele.encode(req.texte, normalize_embeddings=True)   #normalisation des vecteurs
    return {"embedding": vecteur.tolist()}