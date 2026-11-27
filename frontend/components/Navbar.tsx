'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface NavbarProps {
  username?: string;
  initials?: string;
  role?: string;
  onOpenCreateModal?: () => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

function SearchIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function SearchInput({
  value,
  onChange,
  inputRef,
  onEscape,
}: {
  value: string;
  onChange?: (value: string) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  onEscape?: () => void;
}) {
  return (
    <div className="relative w-full">
      <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && onEscape?.()}
        placeholder="Rechercher une idée..."
        aria-label="Rechercher une idée"
        className="w-full pl-10 pr-4 py-2 text-sm text-slate-900 bg-[#F8FAFC] border border-slate-200/90 rounded-xl placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ecam-blue focus:border-transparent transition-colors"
      />
    </div>
  );
}

export default function Navbar({
  username = 'Ingé_Anon42',
  initials = 'IA',
  role = 'MODÉRATEUR',
  onOpenCreateModal,
  searchQuery = '',
  onSearchChange,
}: NavbarProps) {
  // Sur mobile, la recherche est repliée derrière une icône loupe
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mobileSearchOpen) mobileInputRef.current?.focus();
  }, [mobileSearchOpen]);

  // Si une recherche est en cours, on garde le champ visible sur mobile
  const showMobileSearch = mobileSearchOpen || searchQuery.length > 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-ecam-gray text-slate-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 text-ecam-blue hover:opacity-90 transition-opacity shrink-0 min-w-0"
          >
            <div className="w-8 h-8 rounded-lg border-2 border-ecam-blue flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight truncate max-[359px]:hidden">
              ClickUp <span className="hidden min-[420px]:inline">ECAM</span>
            </span>
          </Link>

          {/* Recherche intégrée à la rangée (md et +) */}
          <div className="hidden md:block flex-1 max-w-xl mx-auto">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
          </div>

          {/* Actions de droite */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto md:ml-0 shrink-0">
            {/* Loupe (mobile uniquement) */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen((o) => !o)}
              aria-label={showMobileSearch ? 'Fermer la recherche' : 'Ouvrir la recherche'}
              aria-expanded={showMobileSearch}
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl border transition-colors cursor-pointer ${
                showMobileSearch
                  ? 'bg-[#EEF2FF] border-ecam-blue/30 text-ecam-blue'
                  : 'bg-[#F8FAFC] border-slate-200/90 text-slate-500 hover:bg-slate-100'
              }`}
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* Profil */}
            <Link
              href="/profile"
              aria-label={`Profil de ${username}`}
              className="flex items-center gap-2.5 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200/90 rounded-xl p-1 lg:px-3 lg:py-1.5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-ecam-blue text-white flex items-center justify-center text-xs font-bold shrink-0">
                {initials}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-slate-900">{username}</span>
                <span className="mt-0.5 inline-block px-1.5 py-0.5 rounded bg-[#EEF2FF] text-[10px] font-extrabold text-ecam-blue uppercase tracking-wider">
                  {role}
                </span>
              </div>
            </Link>

            {/* Soumettre une idée : bouton complet en lg+, simple "+" en dessous */}
            <button
              type="button"
              onClick={onOpenCreateModal}
              aria-label="Soumettre une idée"
              title="Soumettre une idée"
              className="flex items-center justify-center gap-1.5 w-10 h-10 lg:w-auto lg:h-auto lg:px-4 lg:py-2.5 bg-ecam-blue hover:bg-ecam-blue-dark text-white text-sm font-semibold rounded-xl shadow-2xs transition-colors cursor-pointer shrink-0"
            >
              <svg className="w-5 h-5 lg:w-4 lg:h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden lg:inline">Soumettre une idée</span>
            </button>
          </div>
        </div>

        {/* Recherche dépliée sous la barre (mobile) */}
        {showMobileSearch && (
          <div className="md:hidden pt-3">
            <SearchInput
              value={searchQuery}
              onChange={onSearchChange}
              inputRef={mobileInputRef}
              onEscape={() => {
                onSearchChange?.('');
                setMobileSearchOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </header>
  );
}
