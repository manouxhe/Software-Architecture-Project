'use client';

import { useState } from "react";
import Navbar from "@/components/Navbar";
import PostContainer from "@/components/PostContainer";
import CreatePost from "@/components/CreatePost";
import DeletePost from "@/components/DeletePost";
import ProfilePage from "@/components/Profile";

export default function Home() {
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar
        username="usertest"
        initials="UT"
        role="MODÉRATEUR"
        onOpenCreateModal={() => setShowCreate(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="min-h-screen bg-[#F8FAFC] p-6 space-y-6 max-w-7xl mx-auto">
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
        <div className="flex flex-wrap items-center gap-3 pt-4">
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

          <button
            type="button"
            onClick={() => setShowProfile(!showProfile)}
            className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-[#d5d7d8] rounded-lg cursor-pointer"
          >
            {showProfile ? "Masquer : Profil" : "Tester : Profil"}
          </button>
        </div>

        {/* Affichage du composant Profile sous les boutons */}
        {showProfile && (
          <div className="pt-4">
            <ProfilePage />
          </div>
        )}

        {/* Affichage conditionnel des modales */}
        {showCreate && <CreatePost username="usertest" />}
        {showDelete && <DeletePost />}

        {/* Bouton temporaire au-dessus de l'overlay pour refermer les modales */}
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
    </>
  );
}