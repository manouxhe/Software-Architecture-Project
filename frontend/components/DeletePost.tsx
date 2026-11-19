'use client';

interface DeletePostProps {
  postId?: string;
  postTitle?: string;
  username?: string;
}

const DELETION_REASONS = [
  {
    id: 'hors-charte',
    title: 'Hors charte',
    description: 'Non conforme ECAM',
  },
  {
    id: 'doublon',
    title: 'Doublon',
    description: 'Sujet déjà existant',
  },
  {
    id: 'inapproprie',
    title: 'Propos inappropriés',
    description: 'Manque de respect',
  },
  {
    id: 'autre',
    title: 'Autre',
    description: 'Précisé ci-dessous',
  },
];

export default function DeletePost({
  postId = '#PUB-8942',
  postTitle = 'Installation de micro-ondes supplémentaires et réaménagement...',
  username = 'Tech_Bruxelles',
}: DeletePostProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-[#d5d7d8] border-t-4 border-t-[#DC2626] shadow-xl overflow-hidden text-slate-900 my-auto">
        
        {/* En-tête de la modale */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 text-[#DC2626] flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-wider text-[#DC2626] uppercase">
                Action de modération
              </p>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Supprimer cette publication
              </h1>
            </div>
          </div>

          <button
            type="button"
            aria-label="Fermer"
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Corps du formulaire */}
        <form className="p-6 space-y-5">
          
          {/* Encadré de la publication ciblée */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <svg
                  className="w-3.5 h-3.5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Publication ciblée</span>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                {postId}
              </span>
            </div>

            <p className="text-sm font-bold text-slate-900 leading-snug">
              {postTitle}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-0.5">
              <span className="flex items-center gap-1 font-semibold text-[#253e84]">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {username}
              </span>
              <span className="text-slate-300">•</span>
              <span>ID publication : {postId}</span>
            </div>
          </div>

          {/* Motif principal de suppression */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-900">
                Motif principal de suppression <span className="text-[#DC2626]">*</span>
              </label>
              <span className="text-xs font-medium text-slate-400">
                Requis
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DELETION_REASONS.map((reason, index) => (
                <label
                  key={reason.id}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white has-checked:border-[#253e84] has-checked:bg-[#EEF2FF]/40 hover:bg-slate-50/70 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="deletion-reason"
                    value={reason.id}
                    defaultChecked={index === 0}
                    className="mt-1 w-4 h-4 accent-[#253e84] cursor-pointer shrink-0"
                  />
                  <div className="leading-tight">
                    <span className="block text-sm font-bold text-slate-900">
                      {reason.title}
                    </span>
                    <span className="block text-xs text-slate-500 mt-0.5">
                      {reason.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Justification détaillée envoyée par email */}
          <div>
            <label
              htmlFor="deletion-message"
              className="block text-sm font-semibold text-slate-900 mb-1"
            >
              Précisez la raison de la suppression <span className="text-[#DC2626]">*</span>
            </label>

            <div className="flex items-start sm:items-center gap-2 text-xs text-slate-500 mb-2">
              <svg
                className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 sm:mt-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>
                (ce message sera envoyé automatiquement par email à l&apos;étudiant @ecam.be)
              </span>
            </div>

            <div className="relative">
              <textarea
                id="deletion-message"
                rows={4}
                placeholder={`Bonjour ${username},\n\nVotre proposition ne rentre pas dans le cadre des compétences de la boîte à idées étudiante ECAM. Nous vous invitons à consulter la charte communautaire...`}
                className="w-full px-3.5 py-2.5 pb-7 text-sm text-slate-900 bg-white border border-[#d5d7d8] rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#253e84] focus:border-transparent resize-y"
              />
              <span className="absolute bottom-2.5 right-3 text-[11px] font-medium text-slate-400 pointer-events-none">
                Min. 20 caractères
              </span>
            </div>
          </div>

          {/* Encadré d'avertissement irréversible */}
          <div className="flex items-start sm:items-center gap-3 p-3.5 bg-red-50/70 border border-red-200/80 rounded-xl text-xs text-red-900 leading-relaxed">
            <svg
              className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 sm:mt-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p>
              Cette action est irréversible et archivera définitivement l&apos;idée de la boîte à idées.
            </p>
          </div>

        </form>

        {/* Pied de la modale avec boutons */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-t border-slate-200/80 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-[#d5d7d8] rounded-xl transition-colors cursor-pointer"
          >
            Annuler
          </button>

          <button
            type="button"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#DC2626] hover:bg-red-700 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
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
            Confirmer la suppression et envoyer l&apos;email
          </button>
        </div>

      </div>
    </div>
  );
}