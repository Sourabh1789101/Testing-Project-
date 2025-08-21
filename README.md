ConnectCare - Local Dev and Vercel Deploy

Local development

1. Install Node.js 18+
2. Install deps:
```bash
npm install
```
3. Run dev server:
```bash
npm run dev
```
4. Open `http://localhost:3000`
   - API: `http://localhost:3000/api/companies`

Deploy to Vercel

1. Push to a git repo (GitHub/GitLab/Bitbucket)
2. In Vercel: New Project → Import the repo
3. No build command needed. Framework Preset: Other
4. Done. Visit the assigned URL
   - `/` serves `Frontend/index.html`
   - `/api/companies` serves normalized company data

Notes
- Data source is `data/companies.json`
- Serverless handler defined at `api/companies.js`
- Local dev server in `server.js` reuses the same handler

