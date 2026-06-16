# Projectinstructies voor AI-agent

Dit project is een Vite + React app op Netlify met Supabase voor authenticatie.

## Belangrijke projectstructuur

Gebruik alleen deze belangrijke bestanden:

- index.html
- netlify.toml
- package.json
- src/App.jsx
- src/App.css
- src/main.jsx
- src/lib/supabase.js
- public/logos/gdo-logo.png
- public/logos/vskbn-logo.png

## Niet aanpassen

Pas deze mappen nooit handmatig aan:

- node_modules
- dist

Maak geen bestanden aan in node_modules of dist.

## Technische afspraken

- Gebruik Vite + React.
- Gebruik gewone CSS in src/App.css.
- Gebruik geen Tailwind.
- Gebruik geen extra framework.
- Gebruik geen Netlify Identity.
- Gebruik Supabase Auth.
- Behoud deze environment variables exact:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
- Zet nooit Supabase keys hardcoded in de code.
- Gebruik nooit een service role key in frontend-code.

## Build

De app moet altijd werken met:

npm run build

Netlify gebruikt:

- Build command: npm run build
- Publish directory: dist

## UI-afspraken

- Interface is Nederlands.
- Gebruik Open Sans.
- Gebruik de GDO/vSKBN-logo’s uit public/logos.
- Gebruik de bestaande kleurstijl met groen en paars.
- Behoud de bestaande werkende login en logout.

## Werkwijze

Voeg steeds één kleine feature per keer toe.
Controleer na elke wijziging of npm run build werkt.
