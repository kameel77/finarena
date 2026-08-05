import { Hero } from '@/components/sections/Hero';
import { LogoTicker } from '@/components/sections/LogoTicker';
import { CredibilityStrip } from '@/components/sections/CredibilityStrip';
import { Paths } from '@/components/sections/Paths';
import { Sectors } from '@/components/sections/Sectors';
import { Delivery } from '@/components/sections/Delivery';
import { People } from '@/components/sections/People';
import { Manifest } from '@/components/sections/Manifest';
import { Stats } from '@/components/sections/Stats';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoTicker />
      <Paths />
      <CredibilityStrip />
      <Sectors />
      <Delivery />
      <People />
      <Manifest />
      <Stats />
      <ContactSection />
    </>
  );
}
