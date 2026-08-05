'use client';

import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

const tracks = ['Build — produkt / wdrożenie', 'Leadership — ludzie', 'Oba tory'];
const phases = ['Pomysł', 'Mam POC', 'Skaluję', 'Ratuję projekt'];

function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`px-4 py-2.5 text-[13.5px] rounded border transition-colors ${
            value === o ? 'bg-ink border-ink text-paper' : 'bg-card border-hair-strong text-ink-soft hover:border-ink'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function LeadForm() {
  const [track, setTrack] = useState(tracks[0]);
  const [phase, setPhase] = useState(phases[0]);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    setError('');
    const fd = new FormData(e.currentTarget);
    const full = String(fd.get('fullName') || '').trim();
    const [firstName, ...rest] = full.split(' ');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName || full,
          lastName: rest.join(' ') || '—',
          email: fd.get('email'),
          phone: fd.get('phone'),
          service: `${track} · etap: ${phase}`,
          message: `${fd.get('message') || '—'}\n\nFirma: ${fd.get('company') || '—'}`,
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || 'Nie udało się wysłać wiadomości.');
      setState('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nie udało się wysłać wiadomości.');
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="border border-hair bg-card rounded p-10">
        <p className="font-serif text-[30px] mb-3">Dziękujemy. Odezwiemy się w 24 h.</p>
        <p className="text-ink-mute text-[14.5px]">
          Jeśli sprawa jest pilna, zadzwoń: <a className="text-accent" href="tel:+48502358645">+48 502 358 645</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6">
        <div className="text-[13.5px] font-medium text-ink-soft mb-3">Który tor Cię interesuje?</div>
        <Chips options={tracks} value={track} onChange={setTrack} />
      </div>
      <div className="mb-6">
        <div className="text-[13.5px] font-medium text-ink-soft mb-3">Na jakim jesteś etapie?</div>
        <Chips options={phases} value={phase} onChange={setPhase} />
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <input name="fullName" className="field" placeholder="Imię i nazwisko" required />
        <input name="email" type="email" className="field" placeholder="E-mail służbowy" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <input name="company" className="field" placeholder="Firma" />
        <input name="phone" className="field" placeholder="Telefon (opcjonalnie)" />
      </div>
      <textarea
        name="message"
        className="field min-h-[92px] resize-y mb-4"
        placeholder="Kilka zdań o sytuacji — im konkretniej, tym lepsza pierwsza rozmowa."
        required
      />

      <button type="submit" className="btn-accent" disabled={state === 'sending'}>
        {state === 'sending' ? (
          <>Wysyłam <Loader2 className="w-3.5 h-3.5 animate-spin" /></>
        ) : (
          <>Wyślij <ArrowRight className="w-3.5 h-3.5" /></>
        )}
      </button>

      {error && <p className="text-[13px] text-accent mt-3">{error}</p>}
      <p className="text-[12px] text-ink-faint mt-3">Dane wykorzystamy wyłącznie do kontaktu w sprawie zapytania.</p>
    </form>
  );
}
