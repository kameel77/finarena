import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const DEMO_ENTITIES_OPTIONS = ['1', '2–3', '4–10', '10+'] as const;
const DEMO_USERS_OPTIONS = ['do 10', '11–50', '51–200', '200+'] as const;
const DEMO_HOSTING_OPTIONS = ['Chmura', 'Dedykowany VPS', 'Własny serwer', 'Nie wiem'] as const;

const BETA_INDUSTRY_OPTIONS = [
  'Elektryka',
  'HVAC',
  'Sanitarne',
  'Automatyka i BMS',
  'Fit-out',
  'Inna',
] as const;
const BETA_TEAM_OPTIONS = ['1–4', '5–15', '16–50', '50+'] as const;
const BETA_PAIN_OPTIONS = [
  'Aneksy',
  'Odbiory',
  'Fakturowanie etapów',
  'Kaucje',
  'Dokumentacja zdjęciowa',
  'Spory',
] as const;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { ok: false, message: 'Nieprawidłowy format zapytania JSON.' },
        { status: 400 }
      );
    }

    // 1. Honeypot protection
    const honeypot = String(body.website || body.companyWebsite || '').trim();
    if (honeypot.length > 0) {
      return NextResponse.json({ ok: true, message: 'Zgłoszenie przyjęte.' }, { status: 200 });
    }

    // 2. Common fields validation
    const productSlug = String(body.productSlug || 'groupos').trim();
    const formType = body.formType === 'beta' ? 'beta' : body.formType === 'demo' ? 'demo' : null;
    const h1Variant = body.h1Variant === 'b' ? 'b' : 'a';

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim();
    const company = String(body.company || '').trim();
    const rodoConsent = Boolean(body.rodoConsent);

    if (!formType) {
      return NextResponse.json(
        { ok: false, message: 'Wybierz wariant formularza (Demo GroupOS lub Beta dla podwykonawców).' },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        { ok: false, message: 'Podaj imię (minimum 2 znaki).' },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email) || email.length > 180) {
      return NextResponse.json(
        { ok: false, message: 'Podaj poprawny służbowy adres e-mail.' },
        { status: 400 }
      );
    }

    if (company.length < 2 || company.length > 160) {
      return NextResponse.json(
        { ok: false, message: 'Podaj nazwę firmy lub grupy spółek.' },
        { status: 400 }
      );
    }

    if (!rodoConsent) {
      return NextResponse.json(
        { ok: false, message: 'Wymagana jest zgoda na przetwarzanie danych osobowych (RODO).' },
        { status: 400 }
      );
    }

    // 3. Variant-specific validation
    let variantDetailsHtml = '';
    let subjectPrefix = '';

    if (formType === 'demo') {
      const entitiesCount = String(body.entitiesCount || '').trim();
      const usersCount = String(body.usersCount || '').trim();
      const hostingPreference = String(body.hostingPreference || '').trim();
      const currentTools = String(body.currentTools || '').trim().slice(0, 1000);

      if (!DEMO_ENTITIES_OPTIONS.includes(entitiesCount as (typeof DEMO_ENTITIES_OPTIONS)[number])) {
        return NextResponse.json(
          { ok: false, message: 'Wybierz liczbę spółek w grupie.' },
          { status: 400 }
        );
      }
      if (!DEMO_USERS_OPTIONS.includes(usersCount as (typeof DEMO_USERS_OPTIONS)[number])) {
        return NextResponse.json(
          { ok: false, message: 'Wybierz orientacyjną liczbę użytkowników.' },
          { status: 400 }
        );
      }
      if (!DEMO_HOSTING_OPTIONS.includes(hostingPreference as (typeof DEMO_HOSTING_OPTIONS)[number])) {
        return NextResponse.json(
          { ok: false, message: 'Wybierz preferowany model hostingu.' },
          { status: 400 }
        );
      }

      subjectPrefix = `[GroupOS Demo] ${company} (${entitiesCount} spółek, ${hostingPreference})`;
      variantDetailsHtml = `
        <h3>Szczegóły wariantu: Demo GroupOS</h3>
        <ul>
          <li><strong>Liczba spółek:</strong> ${escapeHtml(entitiesCount)}</li>
          <li><strong>Liczba użytkowników:</strong> ${escapeHtml(usersCount)}</li>
          <li><strong>Preferowany hosting:</strong> ${escapeHtml(hostingPreference)}</li>
          <li><strong>Czego dziś używają:</strong> ${escapeHtml(currentTools || 'Nie podano')}</li>
        </ul>
      `;
    } else {
      const industry = String(body.industry || '').trim();
      const teamSize = String(body.teamSize || '').trim();
      const rawPainPoints: string[] = Array.isArray(body.painPoints)
        ? body.painPoints.map((x: unknown) => String(x).trim())
        : [];
      const painPoints = rawPainPoints.filter((p) =>
        BETA_PAIN_OPTIONS.includes(p as (typeof BETA_PAIN_OPTIONS)[number])
      );
      const notes = String(body.currentTools || body.notes || '').trim().slice(0, 1000);

      if (!BETA_INDUSTRY_OPTIONS.includes(industry as (typeof BETA_INDUSTRY_OPTIONS)[number])) {
        return NextResponse.json(
          { ok: false, message: 'Wybierz branżę wykonawczą.' },
          { status: 400 }
        );
      }
      if (!BETA_TEAM_OPTIONS.includes(teamSize as (typeof BETA_TEAM_OPTIONS)[number])) {
        return NextResponse.json(
          { ok: false, message: 'Wybierz liczbę osób w firmie.' },
          { status: 400 }
        );
      }
      if (painPoints.length === 0) {
        return NextResponse.json(
          { ok: false, message: 'Zaznacz przynajmniej jeden obszar, który boli najbardziej.' },
          { status: 400 }
        );
      }

      subjectPrefix = `[GroupOS Beta Podwykonawcy] ${company} (${industry}, ${teamSize} osób)`;
      variantDetailsHtml = `
        <h3>Szczegóły wariantu: Beta dla podwykonawców</h3>
        <ul>
          <li><strong>Branża:</strong> ${escapeHtml(industry)}</li>
          <li><strong>Liczba osób:</strong> ${escapeHtml(teamSize)}</li>
          <li><strong>Co boli najbardziej:</strong> ${painPoints.map(escapeHtml).join(', ')}</li>
          ${notes ? `<li><strong>Dodatkowy kontekst:</strong> ${escapeHtml(notes)}</li>` : ''}
        </ul>
      `;
    }

    const utmSource = String(body.utmSource || '').trim().slice(0, 120);
    const utmMedium = String(body.utmMedium || '').trim().slice(0, 120);
    const utmCampaign = String(body.utmCampaign || '').trim().slice(0, 120);
    const referrer = String(body.referrer || '').trim().slice(0, 300);

    const htmlBody = `
      <h2>Nowe zgłoszenie ze strony produktu: ${escapeHtml(productSlug.toUpperCase())}</h2>
      <p><strong>Wariant formularza:</strong> ${formType === 'demo' ? 'Demo GroupOS' : 'Beta dla podwykonawców'}</p>
      <p><strong>Imię:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail służbowy:</strong> ${escapeHtml(email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone || 'Nie podano')}</p>
      <p><strong>Firma / grupa:</strong> ${escapeHtml(company)}</p>
      <p><strong>Zgoda RODO:</strong> Tak</p>
      ${variantDetailsHtml}
      <hr />
      <h4>Metadane analityczne</h4>
      <ul>
        <li><strong>Wariant nagłówka H1:</strong> ${escapeHtml(h1Variant.toUpperCase())}</li>
        <li><strong>UTM source / medium / campaign:</strong> ${escapeHtml(utmSource || '-')} / ${escapeHtml(utmMedium || '-')} / ${escapeHtml(utmCampaign || '-')}</li>
        <li><strong>Referrer:</strong> ${escapeHtml(referrer || 'bezpośrednie wejście')}</li>
      </ul>
    `;

    const isDryRunHeader = req.headers.get('x-test-dry-run') === '1';
    const hasSmtpCredentials = Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

    if (isDryRunHeader) {
      return NextResponse.json(
        {
          ok: true,
          message: 'Zgłoszenie zostało przyjęte (tryb testowy dry-run).',
          formType,
          h1Variant,
          delivery: 'dry-run-header',
        },
        { status: 200 }
      );
    }

    if (!hasSmtpCredentials) {
      console.error(
        '[products/lead] Błąd krytyczny: brak konfiguracji SMTP (GMAIL_USER / GMAIL_APP_PASSWORD). Formularz nie może wysłać leada:',
        {
          subjectPrefix,
          name,
          email,
          company,
          formType,
          h1Variant,
        }
      );
      return NextResponse.json(
        {
          ok: false,
          message:
            'Serwer pocztowy jest chwilowo niedostępny. Prosimy o bezpośredni kontakt mailowy na adres hello@finarena.pl.',
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const targetEmail =
      process.env.GROUPOS_LEAD_RECEIVER ||
      process.env.GMAIL_RECEIVER ||
      process.env.GMAIL_USER ||
      'hello@finarena.pl';

    const senderName = process.env.GMAIL_SENDER_NAME || 'GroupOS · Finarena';

    await transporter.sendMail({
      from: `"${senderName}" <${process.env.GMAIL_USER}>`,
      to: targetEmail,
      replyTo: email,
      subject: subjectPrefix,
      html: htmlBody,
    });

    return NextResponse.json(
      {
        ok: true,
        message: 'Zgłoszenie zostało wysłane.',
        formType,
        h1Variant,
        delivery: 'smtp',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[products/lead] Błąd podczas obsługi zgłoszenia:', error);
    return NextResponse.json(
      {
        ok: false,
        message: 'Wystąpił błąd podczas wysyłania formularza. Napisz bezpośrednio na hello@finarena.pl.',
      },
      { status: 500 }
    );
  }
}
