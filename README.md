# Finarena - Next.js + Ghost CMS

Nowoczesna strona firmy doradczej Finarena zbudowana na Next.js 14 i Ghost CMS.

## 🚀 Szybki start z Coolify

### 1. Wymagania wstępne

- **Coolify** zainstalowany na VPS (Hetzner)
- **Domena**: finarena.pl z konfiguracją DNS w Cloudflare
- **Git repository** z tym kodem

### 2. Instalacja Ghost CMS

W Coolify UI:
1. Kliknij **"New Resource"**
2. Wybierz **"Ghost"** z listy
3. Skonfiguruj:
   - **Name**: `finarena-ghost`
   - **Domain**: `https://cms.finarena.pl`
   - **Image**: `ghost:5`
   - Kliknij "Deploy"
4. Po instalacji:
   - Przejdź do `https://cms.finarena.pl/ghost`
   - Utwórz konto admina
   - Przejdź do **Settings → Integrations**
   - Dodaj nową integrację i skopiuj **Content API Key**

### 3. Wdrożenie Next.js (Frontend)

#### Opcja A: Przez Git Repository (rekomendowane)

1. W Coolify kliknij **"New Resource"**
2. Wybierz **"Application"**
3. Wybierz **Git Repository** i podaj URL tego repo
4. Skonfiguruj:
   - **Build Pack**: `Docker Compose`
   - **Docker Compose Location**: `./docker-compose.yml`
   - **Port**: `3000`
5. W zakładce **Environment Variables** dodaj:
   ```
   GHOST_URL=https://cms.finarena.pl
   GHOST_CONTENT_API_KEY=<twój_api_key_z_ghost>
   NEXT_PUBLIC_SITE_URL=https://finarena.pl
   NEXT_PUBLIC_SITE_NAME=Finarena
   CONTACT_FORM_ENDPOINT=<opcjonalnie>
   ```
6. Kliknij **"Deploy"**

#### Opcja B: Przez Docker Compose

1. Sklonuj repo na VPS:
   ```bash
   git clone <repo-url> /var/www/finarena
   cd /var/www/finarena
   ```

2. Utwórz `.env`:
   ```bash
   cp .env.example .env
   nano .env
   # Edytuj zmienne
   ```

3. W Coolify:
   - New Resource → Docker Compose
   - Wybierz folder `/var/www/finarena`
   - Coolify automatycznie wykryje `docker-compose.yml`

### 4. Konfiguracja DNS (Cloudflare)

Dodaj rekordy A:
```
Type: A
Name: @
Content: <IP_twojego_VPS>
Proxy status: Proxied (pomarańczowa chmurka)

Type: A
Name: cms
Content: <IP_twojego_VPS>
Proxy status: DNS only (szara chmurka) lub Proxied
```

### 5. SSL / HTTPS

W Coolify:
- Przejdź do resource → Settings
- Włącz **"SSL Certificate"**
- Coolify automatycznie wygeneruje Let's Encrypt

## 🔧 Zarządzanie zmiennymi środowiskowymi

### W Coolify UI:

1. Przejdź do swojego resource (Next.js)
2. Kliknij zakładkę **"Environment Variables"**
3. Dodaj/Edytuj zmienne:
   - `GHOST_URL` - URL do Ghost CMS
   - `GHOST_CONTENT_API_KEY` - Klucz API z Ghost
   - `NEXT_PUBLIC_SITE_URL` - Główna domena (np. https://finarena.pl)
   - `NEXT_PUBLIC_SITE_NAME` - Nazwa firmy

### Ważne:

- **NEXT_PUBLIC_*** - zmienne publiczne (widoczne po stronie klienta)
- Zmienne bez prefixu - prywatne (tylko serwer)
- Po zmianie zmiennych **NEXT_PUBLIC_*** wymagany jest redeploy
- Inne zmienne działają od razu po restarcie kontenera

## 📁 Struktura projektu

```
finarena/
├── docker-compose.yml      # Konfiguracja Coolify
├── Dockerfile              # Build Next.js
├── next.config.js          # Konfiguracja Next.js + ENV
├── .env.example            # Przykładowe zmienne
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── page.tsx       # Strona główna
│   │   ├── layout.tsx     # Layout z Schema.org
│   │   ├── uslugi/        # Strona usług
│   │   ├── gallup/        # Gallup Strengths
│   │   ├── kontakt/       # Kontakt
│   │   └── api/           # API routes
│   ├── components/        # React komponenty
│   ├── lib/               # Utilities
│   │   ├── ghost.ts       # Ghost API client
│   │   └── schema/        # Schema.org generators
│   └── styles/            # CSS
└── public/                # Static assets
```

## 🐛 Debugowanie

### Sprawdź czy zmienne są załadowane:

```bash
# Wejdź do kontenera
docker exec -it finarena-nextjs sh

# Sprawdź zmienne
env | grep GHOST
env | grep NEXT
```

### Logi w Coolify:

1. Przejdź do resource
2. Kliknij **"Logs"**
3. Sprawdź czy nie ma błędów

### Health check:

Odwiedź: `https://finarena.pl/api/health`

Powinien zwrócić:
```json
{ "status": "ok", "timestamp": "..." }
```

## 🔄 Aktualizacja

### Aktualizacja kodu:

Jeśli używasz Git:
1. Push zmian do repo
2. Coolify automatycznie zbuduje i wdroży (jeśli włączony auto-deploy)

Jeśli lokalnie:
1. `git pull`
2. Coolify → Resource → Redeploy

### Aktualizacja Ghost:

W Coolify:
1. Resource → finarena-ghost
2. Change version (np. `ghost:5` → `ghost:5.75`)
3. Deploy

## 📞 Wsparcie

- **Coolify Docs**: https://coolify.io/docs/
- **Ghost Docs**: https://ghost.org/docs/
- **Next.js Docs**: https://nextjs.org/docs

## 📝 TODO

- [ ] Skonfigurować Ghost CMS
- [ ] Dodać Content API Key do Coolify
- [ ] Przetestować połączenie Next.js ↔ Ghost
- [ ] Dodać treści (blog, case studies)
- [ ] Skonfigurować SSL
- [ ] Przetestować formularz kontaktowy
