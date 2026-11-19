# 1. Part d'une image légère qui contient déjà Python
FROM python:3.11-slim

WORKDIR /app

# 2. Installe PyTorch en version CPU uniquement (sinon l'image fait ~8 Go à cause de CUDA)
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu

# 3. Installe le reste des librairies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Télécharge le modèle PENDANT le build, pour qu'il soit inclus dans l'image
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')"

# 5. Copie ton code en dernier
COPY main.py .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]