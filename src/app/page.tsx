import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { ClientsSection } from '@/components/sections/ClientsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ApproachSection } from '@/components/sections/ApproachSection';
import { ProgramsSection } from '@/components/sections/ProgramsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Finarena - Doradztwo Biznesowe i Transformacja Cyfrowa',
  description: 'Przyspieszamy rozwój firm przez połączenie technologii AI, automatyzacji procesów oraz rozwoju kompetencji i kultury organizacyjnej.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      <ApproachSection />
      <ProgramsSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
