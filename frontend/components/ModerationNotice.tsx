interface ModerationNoticeProps {
  reference: string;
  postTitle: string;
  reason: string;
  message: string;
}

export default function ModerationNotice({ reference, postTitle, reason, message }: ModerationNoticeProps) {
  return (
    <section className="bg-white border border-ecam-gray rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-red-600">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          Avis de modération de la plateforme
        </h3>
        <span className="px-2 py-0.5 rounded-md border border-slate-200 bg-[#F8FAFC] text-xs font-mono font-semibold text-slate-600">
          Réf: {reference}
        </span>
      </div>

      <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-3.5 sm:p-4 space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <p className="text-sm font-bold text-slate-900">Publication retirée : &quot;{postTitle}&quot;</p>
          <span className="px-2 py-0.5 rounded-md bg-red-50 border border-red-200 text-[11px] font-semibold text-red-700 shrink-0">
            Motif : {reason}
          </span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
      </div>
    </section>
  );
}