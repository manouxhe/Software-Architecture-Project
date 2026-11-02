'use client'

import {useState, SubmitEvent} from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        console.log({email, password, rememberMe});
    };

    return(
        <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#d5d7d8] shadow-xs overflow-hidden">
        
        {/* En-tête de la carte */}
        <div className="bg-[#F8FAFC] p-3 border-b border-[#d5d7d8]">
          <h3 className="bg-white text-[#253e84] font-semibold py-2.5 px-4 rounded-xl text-center border border-slate-200">
            Se connecter
          </h3>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Champ Email */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="text-sm font-semibold text-slate-900">
                Email institutionnel
              </label>
              <span className="text-xs font-semibold text-[#253e84] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                @ecam.be requis
              </span>
            </div>
            <input
              type="email"
              id="email"
              placeholder="matricule@ecam.be"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 text-sm text-slate-900 border border-[#d5d7d8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#253e84]"
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="pwd" className="text-sm font-semibold text-slate-900">
                Mot de passe
              </label>
              <a href="#" className="text-xs font-semibold text-[#253e84] hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
            <input
              type="password"
              id="pwd"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 text-sm text-slate-900 border border-[#d5d7d8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#253e84]"
            />
          </div>

          {/* Checkbox */}
          <label htmlFor="cb" className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              id="cb"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded accent-[#253e84] cursor-pointer"
            />
            Rester connecté
          </label>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-[#253e84] hover:bg-[#1d3169] text-white font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
          >
            Connexion →
          </button>

          {/* Note de bas de carte */}
          <p className="pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
            ⓘ Accès réservé aux étudiants (BA1 à MA2), délégués de promotion et membres autorisés de la communauté académique ECAM.
          </p>

        </form>
      </div>
    </main>
    );

}