import { ImageResponse } from 'next/og';
import { getProductBySlug } from '@/content/products';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const OG_KPIS = [
  { label: 'Aktywne szanse', value: '38', note: '4 spółki w grupie' },
  { label: 'Projekty', value: '19', note: '14 w terminie' },
  { label: 'Zadania po terminie', value: '5', note: 'Wymaga decyzji' },
  { label: 'Ryzyka', value: '3', note: 'Przypisani właściciele' },
  { label: 'Umowy wygasające w 30 dni', value: '4', note: 'Alerty z wyprzedzeniem' },
] as const;

export default async function ProductOpenGraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  const name = product?.name || 'GroupOS';
  const title =
    product?.seo.ogTitle || 'Cała grupa firm. Jeden system. Każda spółka z osobnymi danymi.';
  const subtitle =
    product?.seo.ogSubtitle ||
    'Relacje z klientami, projekty, zadania, dokumenty i umowy wszystkich spółek w jednym miejscu. W chmurze w UE albo na Twoim własnym serwerze.';
  const bgDark = product?.theme.bgDark || '#0B0F17';
  const accent = product?.theme.accent || '#4F6BFF';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '44px 56px',
          backgroundColor: bgDark,
          color: '#F8FAFC',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Górny pasek marki */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              G
            </div>
            <div style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em' }}>
              {name}
            </div>
            <div
              style={{
                fontSize: '14px',
                color: '#CBD5E1',
                backgroundColor: '#1E293B',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              by Finarena
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: '#172033',
              border: '1px solid #334155',
              fontSize: '16px',
              color: '#CBD5E1',
            }}
          >
            {`finarena.pl/produkty/${product?.slug || 'groupos'}`}
          </div>
        </div>

        {/* Nagłówek i lead */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '1040px' }}>
          <div
            style={{
              fontSize: '42px',
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '20px',
              lineHeight: 1.38,
              color: '#94A3B8',
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Makieta M1: Przełącznik zakresu grupy + 5 kafelków KPI */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            backgroundColor: '#111726',
            border: '1px solid #26324B',
            borderRadius: '16px',
            padding: '18px 20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  backgroundColor: accent,
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  padding: '5px 12px',
                  borderRadius: '8px',
                }}
              >
                Grupa — wszystkie
              </div>
              <div
                style={{
                  backgroundColor: '#1A2337',
                  color: '#CBD5E1',
                  fontSize: '13px',
                  padding: '5px 10px',
                  borderRadius: '8px',
                }}
              >
                Aurora Tech sp. z o.o.
              </div>
              <div
                style={{
                  backgroundColor: '#1A2337',
                  color: '#CBD5E1',
                  fontSize: '13px',
                  padding: '5px 10px',
                  borderRadius: '8px',
                }}
              >
                Nordic Build sp. z o.o.
              </div>
              <div
                style={{
                  backgroundColor: '#1A2337',
                  color: '#CBD5E1',
                  fontSize: '13px',
                  padding: '5px 10px',
                  borderRadius: '8px',
                }}
              >
                Vistula Fleet sp. z o.o.
              </div>
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#6EE7B7',
                backgroundColor: 'rgba(16, 185, 129, 0.14)',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              Izolacja danych aktywna
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            {OG_KPIS.map((kpi) => (
              <div
                key={kpi.label}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#172033',
                  border: '1px solid #2A3754',
                  borderRadius: '10px',
                  padding: '10px 12px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#CBD5E1' }}>{kpi.label}</div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginTop: '4px',
                  }}
                >
                  {kpi.value}
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                  {kpi.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stopka OG */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '16px',
            color: '#94A3B8',
          }}
        >
          <div>Produkt Finarena Sp. z o.o. · Przetwarzanie danych w EOG (UE)</div>
          <div style={{ color: '#A5B4FC', fontWeight: 600 }}>
            Chmura UE · Dedykowany VPS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
