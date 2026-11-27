'use client';

import { useState } from 'react';

export interface FeedFiltersProps {
  selectedCategory?: string | null;
  onSelectCategory?: (category: string | null) => void;
  selectedPromo?: string;
  onSelectPromo?: (promo: string) => void;
  selectedSort?: string;
  onSelectSort?: (sort: string) => void;
}

const CATEGORIES = [
  {
    id: 'Vie académique',
    label: 'Vie académique',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    id: 'Événements',
    label: 'Événements',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'Infrastructure',
    label: 'Infrastructure',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'Services',
    label: 'Services',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a8 8 0 00-8 8h16a8 8 0 00-8-8zm-9 11h18" />
      </svg>
    ),
  },
  {
    id: 'Bien-être et sécurité',
    label: 'Bien-être et sécurité',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 'Autre',
    label: 'Autre',
    icon: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    ),
  },
];

const PROMOS = ['Tous', 'BA1', 'BA2', 'BA3', 'MA1', 'MA2'];

const SORT_OPTIONS = [
  { id: 'popular', label: 'Plus populaires', emoji: '🔥' },
  { id: 'unpopular', label: 'Moins populaires', emoji: null },
  { id: 'newest', label: 'Plus récentes', emoji: '✨' },
  { id: 'oldest', label: 'Moins récentes', emoji: null },
];

export default function FeedFilters({
  selectedCategory: controlledCategory,
  onSelectCategory,
  selectedPromo: controlledPromo,
  onSelectPromo,
  selectedSort: controlledSort,
  onSelectSort,
}: FeedFiltersProps) {
  // États internes par défaut si le composant est utilisé sans Props de contrôle
  const [internalCategory, setInternalCategory] = useState<string | null>('Vie académique');
  const [internalPromo, setInternalPromo] = useState<string>('Tous');
  const [internalSort, setInternalSort] = useState<string>('popular');

  const activeCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;
  const activePromo = controlledPromo !== undefined ? controlledPromo : internalPromo;
  const activeSort = controlledSort !== undefined ? controlledSort : internalSort;

  const handleCategoryClick = (categoryId: string) => {
    const nextValue = activeCategory === categoryId ? null : categoryId;
    setInternalCategory(nextValue);
    onSelectCategory?.(nextValue);
  };

  const handlePromoClick = (promo: string) => {
    setInternalPromo(promo);
    onSelectPromo?.(promo);
  };

  const handleSortClick = (sortId: string) => {
    setInternalSort(sortId);
    onSelectSort?.(sortId);
  };

  return (
    <section className="w-full bg-white border border-[#d5d7d8] rounded-2xl text-slate-900 overflow-hidden">
      
      {/* 1. RANGÉE CATÉGORIES */}
      <div className="px-4 sm:px-5 py-3.5 border-b border-slate-100 flex items-center gap-3 overflow-x-auto">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 pr-3 border-r border-slate-200 shrink-0">
          <svg className="w-4 h-4 text-[#253e84]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Catégories</span>
        </div>

        <div className="flex items-center gap-2">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#EEF2FF] border-[#253e84]/40 text-[#253e84]'
                    : 'bg-[#F8FAFC] border-slate-200/80 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className={isActive ? 'text-[#253e84]' : 'text-slate-500'}>
                  {category.icon}
                </span>
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. RANGÉE PROMO */}
      <div className="px-4 sm:px-5 py-3 border-b border-slate-100 flex items-center gap-2.5 overflow-x-auto">
        <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mr-1 shrink-0">
          Promo :
        </span>

        <div className="flex items-center gap-2">
          {PROMOS.map((promo) => {
            const isActive = activePromo === promo;
            return (
              <button
                key={promo}
                type="button"
                onClick={() => handlePromoClick(promo)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#253e84] border-[#253e84] text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {promo}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. RANGÉE TRI */}
      <div className="px-4 sm:px-5 py-3 flex items-center gap-2.5 overflow-x-auto">
        <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mr-1 shrink-0">
          Tri :
        </span>

        <div className="flex items-center gap-2">
          {SORT_OPTIONS.map((option) => {
            const isActive = activeSort === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSortClick(option.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#EEF2FF] border-[#253e84]/30 text-[#253e84]'
                    : 'bg-[#F8FAFC] border-slate-200/80 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {option.emoji && <span>{option.emoji}</span>}
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
}