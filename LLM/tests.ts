import { analyserIdee } from "./Filter_LLM.js";

const phrases = [
  "Mettre plus de poubelles de tri dans la cour",
  "salut",
  "Avoir des cours de Thermodynamique en 1er année",
];

for (const phrase of phrases) {
  console.log(`\n"${phrase}"\n->`, await analyserIdee(phrase));
}

//npx tsx --env-file=.env LLM/tests.ts

// pour lancer avec docker : 
// docker compose exec llm-service npx tsx tests.ts