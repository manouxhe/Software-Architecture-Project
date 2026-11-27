'use client';

interface ProfileProps {
  username?: string;
  initials?: string;
  roleLabel?: string;
  memberSince?: string;
  academicYear?: string;
  email?: string;
  ideasCount?: number;
  ideasWeeklyDelta?: number;
  upvotesCount?: number;
  upvotesWeeklyDelta?: number;
  reactionsCount?: number;
  reactionsWeeklyDelta?: number;
  semester?: string;
}

export default function Profile({
  username = 'Ingé_Anon42',
  initials = 'IA',
  roleLabel = 'Étudiant (Vérifié ECAM)',
  memberSince = 'Octobre 2023',
  academicYear = 'BA2 (Sciences Industrielles)',
  email = '22000@ecam.be',
  ideasCount = 3,
  ideasWeeklyDelta = 1,
  upvotesCount = 154,
  upvotesWeeklyDelta = 24,
  reactionsCount = 62,
  reactionsWeeklyDelta = 18,
  semester = 'Semestre 2',
}: ProfileProps) {
  return (
    <div className="w-full bg-white border border-[#d5d7d8] rounded-2xl shadow-xs overflow-hidden text-slate-900">
      
      {/* 1. EN-TÊTE DU PROFIL */}
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-4">
          {/* Avatar carré arrondi avec badge vérifié */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-[#253e84] border-4 border-slate-100 shadow-xs flex items-center justify-center text-white text-2xl font-bold select-none">
              {initials}
            </div>
            <div
              title="Compte vérifié ECAM"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>

          {/* Pseudo, badge et date d'inscription */}
          <div className="space-y-1.5 min-w-0">
            <h1 className="text-xl font-bold text-slate-900 truncate">
              {username}
            </h1>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
              <svg
                className="w-3.5 h-3.5 shrink-0"
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
              <span>{roleLabel}</span>
            </div>

            <p className="text-xs text-slate-500">
              Membre depuis {memberSince}
            </p>
          </div>
        </div>

        {/* Encadré de chiffrement */}
        <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl text-xs text-slate-600 leading-relaxed">
          <svg
            className="w-4 h-4 text-slate-500 shrink-0"
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
          <p>Identité confidentielle protégée par chiffrement ECAM</p>
        </div>
      </div>

      {/* 2. SECTION IDENTITÉ PUBLIQUE */}
      <div className="px-6 py-5 border-t border-slate-100 space-y-4">
        <h2 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
          Identité publique
        </h2>

        {/* Pseudonyme */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Pseudonyme sur la plateforme
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm text-slate-700 min-w-0">
              <span className="text-slate-400 select-none">@</span>
              <span className="truncate font-medium">{username}</span>
            </div>
            <button
              type="button"
              className="px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-[#d5d7d8] rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Modifier le profil
            </button>
          </div>
        </div>

        {/* Année d'études */}
        <div className="space-y-1.5">
          <label
            htmlFor="profile-year"
            className="block text-xs font-semibold text-slate-700"
          >
            Mon année d&apos;études
          </label>
          <select
            id="profile-year"
            defaultValue={academicYear}
            className="w-full px-3.5 py-2.5 text-sm font-medium text-slate-800 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#253e84] focus:border-transparent cursor-pointer"
          >
            <option value="BA1 (Sciences Industrielles)">BA1 (Sciences Industrielles)</option>
            <option value="BA2 (Sciences Industrielles)">BA2 (Sciences Industrielles)</option>
            <option value="BA3 (Sciences Industrielles)">BA3 (Sciences Industrielles)</option>
            <option value="MA1 (Ingénierie Informatique)">MA1 (Ingénierie Informatique)</option>
            <option value="MA2 (Ingénierie Informatique)">MA2 (Ingénierie Informatique)</option>
          </select>
          <p className="text-[11px] text-slate-500">
            Utilisé pour personnaliser vos filtres par défaut
          </p>
        </div>
      </div>

      {/* 3. SECTION INFORMATIONS PRIVÉES & SÉCURITÉ */}
      <div className="px-6 py-5 border-t border-slate-100 space-y-3.5">
        <div className="flex items-center gap-2 text-slate-900">
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="text-xs font-bold tracking-wider uppercase">
            Informations privées &amp; sécurité
          </h2>
        </div>

        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-700">
              Adresse email institutionnelle
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-500">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Verrouillé
            </span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2.5 bg-white border border-slate-200/80 rounded-lg text-sm text-slate-500">
            <svg
              className="w-4 h-4 text-slate-400 shrink-0"
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
            <span className="truncate">{email}</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Votre email garantit que vous êtes étudiant à l&apos;ECAM mais reste strictement confidentiel. Il n&apos;est jamais divulgué publiquement.
          </p>
        </div>
      </div>

      {/* 4. SECTION MON IMPACT CAMPUS */}
      <div className="px-6 py-5 border-t border-slate-100 space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
            Mon impact campus
          </h2>
          <span className="text-xs font-semibold text-[#253e84]">
            {semester}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {/* Stat 1 : Idées proposées */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3 text-center flex flex-col justify-between">
            <span className="text-[11px] font-medium text-slate-500 truncate">
              Idées proposées
            </span>
            <span className="text-2xl font-extrabold text-[#253e84] my-1.5">
              {ideasCount}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 leading-tight">
              +{ideasWeeklyDelta} cette semaine
            </span>
          </div>

          {/* Stat 2 : Upvotes reçus */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3 text-center flex flex-col justify-between">
            <span className="text-[11px] font-medium text-slate-500 truncate">
              Upvotes reçus
            </span>
            <span className="text-2xl font-extrabold text-emerald-500 my-1.5">
              {upvotesCount}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 leading-tight">
              +{upvotesWeeklyDelta} cette semaine
            </span>
          </div>

          {/* Stat 3 : Réactions reçues */}
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3 text-center flex flex-col justify-between">
            <span className="text-[11px] font-medium text-slate-500 truncate">
              Réactions reçues
            </span>
            <span className="text-2xl font-extrabold text-slate-900 my-1.5">
              {reactionsCount}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 leading-tight">
              +{reactionsWeeklyDelta} cette semaine
            </span>
          </div>
        </div>
      </div>

      {/* 5. BOUTONS D'ACTION EN BAS */}
      <div className="px-6 py-5 border-t border-slate-100 space-y-2.5">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 border border-[#d5d7d8] rounded-xl text-sm font-semibold text-slate-800 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2.5">
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            Changer mon mot de passe
          </span>
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50/40 hover:bg-red-50 border border-red-200 rounded-xl text-sm font-semibold text-[#DC2626] transition-colors cursor-pointer"
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Se déconnecter
        </button>
      </div>

    </div>
  );
}