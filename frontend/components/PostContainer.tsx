'use client';

import { useState } from 'react';

interface PostProps {
  username: string;
  pubdate: string;
  academicyear: string;
  pubtag: string;
  pubtitle: string;
  pubcontent: string;
  initialVotes?: number;
  isAdmin?: boolean;
}

export default function PostContainer({
  username,
  pubdate,
  academicyear,
  pubtag,
  pubtitle,
  pubcontent,
  initialVotes = 0,
  isAdmin = true,
}: PostProps) {
  // Votes
  const [votes, setVotes] = useState(initialVotes);
  const [uservote, setUservote] = useState<'up' | 'down' | null>(null);

  // Réactions
  const [like, setLike] = useState(38);
  const [love, setLove] = useState(14);
  const [light, setLight] = useState(45);
  const [party, setParty] = useState(8);

  const handleUpvote = () => {
    
  };

  const handleDownvote = () => {
    
  };

  return (
    <article className="bg-white border border-[#d5d7d8] rounded-2xl p-5 flex gap-5 shadow-2xs text-slate-900">
      {/* Colonne de vote à gauche */}
      <div className="flex flex-col items-center justify-start bg-[#F1F5F9]/80 border border-slate-200/80 rounded-xl py-3 px-2.5 gap-2 self-stretch min-w-[52px]">
        <button
          type="button"
          onClick={handleUpvote}
          aria-label="Voter pour"
          className={`p-1 rounded-lg transition-colors cursor-pointer ${
            uservote === 'up'
              ? 'text-[#253e84] bg-blue-100'
              : 'text-[#253e84] hover:bg-slate-200/70'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>

        <span className="text-sm font-bold text-[#253e84] select-none">
          {votes}
        </span>

        <button
          type="button"
          onClick={handleDownvote}
          aria-label="Voter contre"
          className={`p-1 rounded-lg transition-colors cursor-pointer ${
            uservote === 'down'
              ? 'text-red-600 bg-red-100'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/70'
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Colonne principale à droite */}
      <div className="flex-1 flex flex-col">
        {/* Métadonnées (Auteur, date, badges) */}
        <div className="flex flex-wrap items-center gap-2 text-xs mb-2.5">
          <span className="font-bold text-slate-900 text-sm">{username}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">{pubdate}</span>
          <span className="text-slate-400">•</span>
          <span className="bg-[#EEF2FF] text-[#253e84] border border-blue-200 font-bold px-2 py-0.5 rounded-md">
            {academicyear}
          </span>
          <span className="bg-[#F1F5F9] text-slate-600 border border-slate-200 font-medium px-2.5 py-0.5 rounded-md">
            {pubtag}
          </span>
        </div>

        {/* Contenu de l'idée */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 leading-snug">
            {pubtitle}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {pubcontent}
          </p>

          {/* Réactions */}
          <div className="flex flex-wrap items-center gap-2 pt-3">
            <button
              type="button"
              onClick={() => setLike(like + 1)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <span>👍</span>
              <span>{like}</span>
            </button>

            <button
              type="button"
              onClick={() => setLove(love + 1)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <span>❤️</span>
              <span>{love}</span>
            </button>

            <button
              type="button"
              onClick={() => setLight(light + 1)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF2FF] hover:bg-blue-100/70 border border-blue-200 text-[#253e84] transition-colors cursor-pointer"
            >
              <span>💡</span>
              <span>{light}</span>
            </button>

            <button
              type="button"
              onClick={() => setParty(party + 1)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <span>🎉</span>
              <span>{party}</span>
            </button>
          </div>
        </div>

        {/* Actions modérateur / auteur */}
        {isAdmin && (
          <div className="flex items-center justify-end gap-3 mt-4 pt-3.5 border-t border-slate-200/80">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-[#d5d7d8] rounded-lg transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              Modifier catégories
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-red-600 bg-white hover:bg-red-50 border border-red-200 rounded-lg transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Supprimer l&apos;idée
            </button>
          </div>
        )}
      </div>
    </article>
  );
}