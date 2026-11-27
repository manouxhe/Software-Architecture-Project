'use client';

import { useState } from 'react';

type ReactionKey = 'like' | 'love' | 'light' | 'party';

const REACTIONS: { key: ReactionKey; emoji: string; label: string }[] = [
  { key: 'like', emoji: '👍', label: "J'aime" },
  { key: 'love', emoji: '❤️', label: "J'adore" },
  { key: 'light', emoji: '💡', label: 'Bonne idée' },
  { key: 'party', emoji: '🎉', label: 'Bravo' },
];

const DEFAULT_REACTIONS: Record<ReactionKey, number> = {
  like: 38,
  love: 14,
  light: 45,
  party: 8,
};

const STATUS_STYLES = {
  active: { label: 'Active', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  pending: { label: 'En attente', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  archived: { label: 'Archivée', className: 'bg-slate-100 text-slate-500 border-slate-200' },
} as const;

interface PostProps {
  username?: string;
  /** Afficher l'auteur dans les métadonnées (inutile sur son propre profil) */
  showAuthor?: boolean;
  pubdate: string;
  academicyear: string;
  pubtag: string;
  pubtitle: string;
  pubcontent: string;
  initialVotes?: number;
  /** Seules les réactions présentes dans l'objet sont affichées */
  initialReactions?: Partial<Record<ReactionKey, number>>;
  commentsCount?: number;
  status?: keyof typeof STATUS_STYLES;
  /** Bandeau d'avertissement (ex. inactivité) affiché en haut de la carte */
  warning?: string;
  /** Actions modérateur (Modifier catégories / Supprimer l'idée) */
  isAdmin?: boolean;
  /** Actions auteur (Relancer / Supprimer ma publication) */
  isOwner?: boolean;
  onDelete?: () => void;
  /** Si fourni, affiche le bouton « Relancer l'idée » */
  onRelaunch?: () => void;
}

export default function PostContainer({
  username,
  showAuthor = true,
  pubdate,
  academicyear,
  pubtag,
  pubtitle,
  pubcontent,
  initialVotes = 0,
  initialReactions = DEFAULT_REACTIONS,
  commentsCount,
  status,
  warning,
  isAdmin = true,
  isOwner = false,
  onDelete,
  onRelaunch,
}: PostProps) {
  // Votes
  const [votes, setVotes] = useState(initialVotes);
  const [uservote, setUservote] = useState<'up' | 'down' | null>(null);

  // Réactions
  const [reactions, setReactions] = useState(initialReactions);

  const vote = (direction: 'up' | 'down') => {
    const value = direction === 'up' ? 1 : -1;
    if (uservote === direction) {
      // Annuler son vote
      setVotes((v) => v - value);
      setUservote(null);
    } else {
      // Nouveau vote (ou changement de sens : on retire l'ancien)
      const previous = uservote === null ? 0 : uservote === 'up' ? 1 : -1;
      setVotes((v) => v - previous + value);
      setUservote(direction);
    }
  };

  const react = (key: ReactionKey) =>
    setReactions((r) => ({ ...r, [key]: (r[key] ?? 0) + 1 }));

  const statusStyle = status ? STATUS_STYLES[status] : null;

  return (
    <article
      className={`rounded-2xl border shadow-2xs text-slate-900 ${
        warning ? 'bg-amber-50/30 border-amber-300' : 'bg-white border-ecam-gray'
      }`}
    >
      {/* Bandeau d'avertissement */}
      {warning && (
        <div className="mx-4 mt-4 sm:mx-5 sm:mt-5 flex items-start gap-2.5 px-3.5 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm font-semibold text-amber-800">
          <svg className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>{warning}</p>
        </div>
      )}

      <div className="p-4 sm:p-5 flex gap-3 sm:gap-5">
        {/* Colonne de vote */}
        <div className="flex flex-col items-center bg-white border border-slate-200/80 rounded-xl py-3 px-1.5 sm:px-2.5 gap-1.5 self-stretch min-w-[44px] sm:min-w-[56px]">
          <button
            type="button"
            onClick={() => vote('up')}
            aria-label="Voter pour"
            aria-pressed={uservote === 'up'}
            className={`p-1 rounded-lg transition-colors cursor-pointer ${
              uservote === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>

          <span
            className={`text-base sm:text-lg font-bold select-none tabular-nums ${
              votes > 0 ? 'text-emerald-500' : votes < 0 ? 'text-red-500' : 'text-slate-500'
            }`}
          >
            {votes > 0 ? `+${votes}` : votes}
          </span>

          <button
            type="button"
            onClick={() => vote('down')}
            aria-label="Voter contre"
            aria-pressed={uservote === 'down'}
            className={`p-1 rounded-lg transition-colors cursor-pointer ${
              uservote === 'down' ? 'text-red-600 bg-red-50' : 'text-slate-400 hover:text-red-600 hover:bg-slate-100'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Colonne principale */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Métadonnées */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs mb-2.5">
            <span className="bg-[#EEF2FF] text-ecam-blue border border-blue-200 font-bold px-2 py-0.5 rounded-md">
              {academicyear}
            </span>
            <span className="bg-[#F1F5F9] text-slate-600 border border-slate-200 font-semibold px-2 py-0.5 rounded-md">
              {pubtag}
            </span>
            {showAuthor && username && (
              <>
                <span className="text-slate-400">•</span>
                <span className="font-bold text-slate-900">{username}</span>
              </>
            )}
            <span className="text-slate-500">• {pubdate}</span>

            {statusStyle && (
              <span
                className={`ml-auto inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${statusStyle.className}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {statusStyle.label}
              </span>
            )}
          </div>

          {/* Contenu */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{pubtitle}</h2>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{pubcontent}</p>

          {/* Pied : réactions, commentaires, actions */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3.5 border-t border-slate-200/80">
            {REACTIONS.filter((r) => reactions[r.key] !== undefined).map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => react(r.key)}
                aria-label={`${r.label} (${reactions[r.key]})`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                <span aria-hidden="true">{r.emoji}</span>
                <span className="tabular-nums">{reactions[r.key]}</span>
              </button>
            ))}

            {commentsCount !== undefined && (
              <span className="flex items-center gap-1.5 px-1.5 text-sm text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {commentsCount} <span className="hidden sm:inline">commentaires</span>
              </span>
            )}

            {(isOwner || isAdmin) && (
              <div className="w-full sm:w-auto sm:ml-auto flex flex-wrap items-center justify-end gap-2">
                {isOwner && onRelaunch && (
                  <button
                    type="button"
                    onClick={onRelaunch}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-ecam-gray rounded-lg transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Relancer l&apos;idée
                  </button>
                )}

                {isAdmin && !isOwner && (
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-ecam-gray rounded-lg transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Modifier catégories
                  </button>
                )}

                <button
                  type="button"
                  onClick={onDelete}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-red-600 bg-white hover:bg-red-50 border border-red-200 rounded-lg transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  {isOwner ? 'Supprimer ma publication' : "Supprimer l'idée"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}