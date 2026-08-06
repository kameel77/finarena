import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import type { Person } from '@/lib/content';

export function PersonCard({ person, priority = false }: { person: Person; priority?: boolean }) {
  return (
    <article className="border border-hair bg-card rounded overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/5] border-b border-hair bg-gradient-to-br from-paper-2 to-[#E2DDD3]">
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-center px-5 kicker text-ink-faint">
            Zdjęcie — sesja własna
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[20px] font-semibold">{person.name}</h3>
            <div className="text-[13px] text-accent mt-0.5">{person.role} · {person.focus}</div>
          </div>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener"
            aria-label={`LinkedIn — ${person.name}`}
            className="shrink-0 mt-1 text-ink-faint hover:text-accent transition-colors"
          >
            <Linkedin className="w-[18px] h-[18px]" />
          </a>
        </div>
        <p className="text-[14px] text-ink-mute leading-relaxed mt-4">{person.bio}</p>
      </div>
    </article>
  );
}
