'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Profile from '@/components/Profile';
import PostContainer from '@/components/PostContainer';
import ModerationNotice from '@/components/ModerationNotice';

type Tab = 'published' | 'upvoted' | 'notifications';

// Données de démonstration (à remplacer par les appels à l'API)
const MY_POSTS = [
  {
    id: 1,
    academicyear: 'BA2',
    pubtag: 'Infrastructure • Cafétéria',
    pubdate: 'Il y a 3 jours',
    pubtitle: 'Installation de micro-ondes supplémentaires et réaménagement de la cafétéria du bloc B',
    pubcontent:
      "Aux heures de pointe de 12h30, les files d'attente dépassent 20 minutes pour chauffer les plats. L'ajout de 3 nouveaux fours micro-ondes industriels et un îlot central désengorgerait considérablement le couloir.",
    initialVotes: 142,
    initialReactions: { like: 38, love: 14, light: 45, party: 8 },
    commentsCount: 28,
    status: 'active' as const,
  },
  {
    id: 2,
    academicyear: 'Tous',
    pubtag: 'Bien-être et sécurité • Équipements',
    pubdate: 'Il y a 10 jours',
    pubtitle: 'Mise en place de fontaines à eau filtrée à chaque étage',
    pubcontent:
      "Pour réduire l'usage de bouteilles en plastique à usage unique lors des sessions de laboratoire intensives, une fontaine avec eau tempérée et réfrigérée serait idéale dans le hall principal.",
    initialVotes: 12,
    initialReactions: { like: 6, love: 2, light: 7 },
    commentsCount: 4,
    warning: 'Attention : aucune interaction depuis 10j (suppression auto à 14j)',
  },
];

const UPVOTED_POSTS = [
  {
    id: 3,
    username: 'Tech_Bruxelles',
    academicyear: 'MA1',
    pubtag: 'Vie étudiante',
    pubdate: 'Il y a 2 jours',
    pubtitle: 'Ouvrir la bibliothèque jusqu’à 22h pendant le blocus',
    pubcontent:
      'Pendant les sessions, les places manquent en soirée. Une ouverture prolongée avec un système de réservation éviterait de devoir réviser dans les couloirs.',
    initialVotes: 87,
    initialReactions: { like: 21, light: 12 },
    commentsCount: 9,
  },
];

const NOTICES = [
  {
    reference: '#PUB-8812',
    postTitle: 'Soirée intégration inter-filières',
    reason: 'Doublon',
    message:
      "Notification de modération (#PUB-8812) : Votre publication 'Soirée intégration inter-filières' a été retirée par un modérateur pour le motif : 'Doublon'. Une proposition similaire avec plus de 80 votes existe déjà dans la catégorie Vie Étudiante. Un email explicatif détaillé a été transmis à votre adresse @ecam.be.",
  },
];

const TABS: { id: Tab; label: string; shortLabel: string; count: number; icon: string }[] = [
  {
    id: 'published',
    label: 'Mes idées publiées',
    shortLabel: 'Mes idées',
    count: MY_POSTS.length,
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    id: 'upvoted',
    label: 'Idées votées (Upvotes)',
    shortLabel: 'Votées',
    count: 18,
    icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5',
  },
  {
    id: 'notifications',
    label: 'Notifications & Modération',
    shortLabel: 'Notifications',
    count: NOTICES.length,
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>('published');
  const [searchQuery, setSearchQuery] = useState('');

  const notices = NOTICES.map((n) => <ModerationNotice key={n.reference} {...n} />);

  return (
    <>
      <Navbar
        username="Ingé_Anon42"
        initials="IA"
        role="Étudiant"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 w-full bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          {/* En-tête de page */}
          <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span className="px-2.5 py-1 rounded-md bg-[#EEF2FF] text-[11px] font-extrabold tracking-wider uppercase text-ecam-blue">
                  Espace privé campus
                </span>
                <span>• ECAM Brussels Engineering School</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Mon Espace</h1>
              <p className="max-w-2xl text-sm sm:text-base text-slate-500">
                Gérez votre identité anonyme, vos publications et suivez votre impact étudiant sur le campus.
              </p>
            </div>

            <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl shadow-2xs text-sm font-semibold text-slate-800 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Statut : Compte ECAM Actif
            </div>
          </header>

          {/* Contenu : 1 colonne sur mobile / tablette, 2 colonnes à partir de lg */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] gap-6 items-start">
            <aside>
              <Profile username="Ingé_Anon42" initials="IA" email="prenom.nom@ecam.be" />
            </aside>

            <section className="min-w-0 space-y-5">
              {/* Onglets */}
              <nav
                aria-label="Sections du profil"
                className="bg-white border border-ecam-gray rounded-2xl p-1.5 shadow-2xs flex gap-1 overflow-x-auto"
              >
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                        isActive
                          ? 'bg-[#EEF2FF] text-ecam-blue border-ecam-blue'
                          : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                      </svg>
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.shortLabel}</span>
                      {tab.id === 'notifications' ? (
                        <span className="w-2 h-2 rounded-full bg-red-500" aria-label={`${tab.count} nouvelle(s)`} />
                      ) : (
                        <span
                          className={`min-w-5 px-1.5 py-0.5 rounded-full text-[11px] font-bold text-center ${
                            isActive ? 'bg-ecam-blue text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Contenu de l'onglet actif */}
              {activeTab === 'published' && (
                <>
                  {MY_POSTS.map(({ id, ...post }) => (
                    <PostContainer
                      key={id}
                      {...post}
                      showAuthor={false}
                      isAdmin={false}
                      isOwner
                      onRelaunch={post.warning ? () => console.log('Relancer', id) : undefined}
                      onDelete={() => console.log('Supprimer', id)}
                    />
                  ))}
                  {notices}
                </>
              )}

              {activeTab === 'upvoted' &&
                UPVOTED_POSTS.map(({ id, ...post }) => <PostContainer key={id} {...post} isAdmin={false} />)}

              {activeTab === 'notifications' && notices}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}