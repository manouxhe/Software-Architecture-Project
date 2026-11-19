'use client';

import { useState } from "react";
import PostContainer from "@/components/PostContainer";
import CreatePost from "@/components/CreatePost";
import DeletePost from "@/components/DeletePost";

export default function Home() {
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-6 space-y-6">
      <PostContainer
        username="usertest"
        pubdate="il y a 3j"
        academicyear="BA2"
        pubtag="Student life"
        pubtitle="Première pub sur notre site!"
        pubcontent="Bonjour à tous, voici la première publication sur notre site, n'hésitez pas à donner votre avis et à éventuellement corriger si c'est nécessaire."
        initialVotes={142}
      />

      {/* Boutons de test en bas */}
      <div className="flex items-center gap-3 pt-4">
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#253e84] hover:bg-[#1d3169] rounded-lg cursor-pointer"
        >
          Tester : Créer une idée
        </button>

        <button
          type="button"
          onClick={() => setShowDelete(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#DC2626] hover:bg-red-700 rounded-lg cursor-pointer"
        >
          Tester : Supprimer une idée
        </button>
      </div>

      {/* Affichage conditionnel des modales */}
      {showCreate && <CreatePost username="usertest" />}
      {showDelete && <DeletePost />}

      {/* Bouton temporaire au-dessus de l'overlay (z-[60]) pour refermer le test */}
      {(showCreate || showDelete) && (
        <button
          type="button"
          onClick={() => {
            setShowCreate(false);
            setShowDelete(false);
          }}
          className="fixed bottom-5 right-5 z-[60] px-4 py-2 text-xs font-bold text-slate-900 bg-amber-300 hover:bg-amber-400 rounded-full shadow-lg cursor-pointer"
        >
          ✕ Fermer la modale (Test)
        </button>
      )}
    </main>
  );
}