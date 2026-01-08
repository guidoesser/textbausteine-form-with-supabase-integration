# Textbausteine Manager

## Vercel Deployment Setup

### 1. Environment Variables in Vercel Dashboard setzen:

Gehe zu: **Vercel Dashboard → Dein Projekt → Settings → Environment Variables**

Füge hinzu:
```
VITE_SUPABASE_URL=https://jomqawzcxcsrnsisxupo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvbXFhd3pjeGNzcm5zaXN4dXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3ODE0NjcsImV4cCI6MjA4MzM1NzQ2N30.KyNCEbuLn2FZWsUFZfl2HRPSt70ZiJXSKdCXyKPlQ0o
```

**WICHTIG:** Setze beide für **Production**, **Preview** und **Development**!

### 2. Nach dem Setzen der Environment Variables:

- Gehe zu **Deployments**
- Klicke auf die drei Punkte beim letzten Deployment
- Wähle **Redeploy**
- Wähle **Use existing Build Cache** NICHT aus

### 3. Build Logs prüfen:

Wenn immer noch weiße Seite:
1. Öffne Vercel Dashboard → Dein Projekt → Deployments
2. Klicke auf das letzte Deployment
3. Gehe zu **Build Logs** Tab
4. Suche nach Fehlern (rot markiert)

### 4. Runtime Logs prüfen:

1. Öffne die deployed URL in Chrome
2. Drücke F12 (Developer Tools)
3. Gehe zu **Console** Tab
4. Schaue nach Fehlermeldungen

### 5. Häufige Probleme:

- ❌ Environment Variables nicht gesetzt → Weiße Seite
- ❌ Environment Variables nur für Production gesetzt → Preview funktioniert nicht
- ❌ Build Cache Problem → Redeploy ohne Cache
- ❌ Base Path falsch → 404 Fehler

## Local Development

```bash
npm install
npm run dev
```

## Build Test (lokal)

```bash
npm run build
npm run preview
```

Wenn `preview` funktioniert, sollte auch Vercel funktionieren!
