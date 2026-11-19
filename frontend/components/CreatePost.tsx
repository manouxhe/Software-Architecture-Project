'use client';

interface CreatePostProps {
  username: string;
  blocYear?: string[];
  categories?: string[];
}

export default function CreatePost({
  username,
  blocYear = ['BA1', 'BA2', 'BA3', 'MA1', 'MA2'],
  categories = ['Vie étudiante', 'Infrastructure', 'Vie académique', 'Événements'],
}: CreatePostProps) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-[#d5d7d8] shadow-xl overflow-hidden text-slate-900 my-auto">
        
        {/* En-tête de la modale */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] text-[#253e84] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-slate-900">
              Déposer une idée dans l&apos;urne
            </h1>
          </div>

          <button
            type="button"
            aria-label="Fermer"
            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Corps du formulaire */}
        <form className="p-6 space-y-5">
          
          {/* Titre de l'idée */}
          <div>
            <label htmlFor="post-title" className="block text-sm font-semibold text-slate-900 mb-1.5">
              Titre de l&apos;idée <span className="text-red-500">*</span>
            </label>
            <input
              id="post-title"
              type="text"
              placeholder="Ajouter des prises électriques dans les salles de TP informatique"
              className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-[#d5d7d8] rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#253e84] focus:border-transparent"
            />
          </div>

          {/* Sélecteurs côte à côte sur PC, empilés sur mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="year-select" className="block text-sm font-semibold text-slate-900 mb-1.5">
                Public visé
              </label>
              <select
                id="year-select"
                className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-[#d5d7d8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#253e84] focus:border-transparent cursor-pointer"
              >
                {blocYear.map((blocy, index) => (
                  <option key={index} value={blocy}>
                    {blocy}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category-select" className="block text-sm font-semibold text-slate-900 mb-1.5">
                Catégorie &amp; Sous-catégorie
              </label>
              <select
                id="category-select"
                className="w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-[#d5d7d8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#253e84] focus:border-transparent cursor-pointer"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contenu détaillé */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="post-content" className="text-sm font-semibold text-slate-900">
                Contenu détaillé de la proposition
              </label>
              <span className="text-xs font-medium text-slate-500">
                Markdown supporté
              </span>
            </div>

            <div className="relative">
              <textarea
                id="post-content"
                rows={4}
                maxLength={500}
                placeholder="Décrivez votre proposition en détail..."
                className="w-full px-3.5 py-2.5 pb-8 text-sm text-slate-900 bg-white border border-[#d5d7d8] rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#253e84] focus:border-transparent resize-y"
              />
              <span className="absolute bottom-2.5 right-3 text-[11px] font-semibold text-[#253e84] bg-[#EEF2FF] px-2 py-0.5 rounded-md pointer-events-none">
                0 / 500 caractères
              </span>
            </div>
          </div>

          {/* Encadré règles de caractères */}
          <div className="flex items-start sm:items-center gap-3 p-3.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl text-xs text-slate-600 leading-relaxed">
            <svg className="w-4 h-4 text-slate-500 shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              Les caractères spéciaux non autorisés (@, #, $, %, ^, &amp;, *) sont bloqués.
            </p>
          </div>

          {/* Encadré rappel de confidentialité */}
          <div className="flex items-start sm:items-center gap-3 p-3.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl text-xs text-slate-600 leading-relaxed">
            <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#253e84] shrink-0 mt-0.5 sm:mt-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p>
              Rappel de confidentialité : Votre publication sera enregistrée sous votre pseudo anonyme{' '}
              <span className="inline-block bg-white border border-slate-200 text-[#253e84] font-bold px-2 py-0.5 rounded-md mx-0.5">
                {username}
              </span>
              .
            </p>
          </div>

        </form>

        {/* Pied de la modale avec boutons */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-t border-slate-200/80 flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-[#d5d7d8] rounded-xl transition-colors cursor-pointer"
          >
            Annuler
          </button>

          <button
            type="button"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#253e84] hover:bg-[#1d3169] rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Soumettre l&apos;idée
          </button>
        </div>

      </div>
    </div>
  );
}