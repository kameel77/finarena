/* eslint-disable @next/next/no-img-element */
import { clientLogos } from '@/lib/content';

export function LogoTicker() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <div className="border-y border-hair bg-paper-2 py-6 overflow-hidden group">
      <div className="flex gap-16 w-max items-center animate-marquee group-hover:[animation-play-state:paused]">
        {row.map((logo, i) => (
          <img
            key={`${logo}-${i}`}
            src={`/images/clients/${logo}`}
            alt=""
            className="h-[25px] max-w-[118px] object-contain grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}
