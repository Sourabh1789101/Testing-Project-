# ConnectCare - Customer Care Hub

A simple web application to search for customer care contact information of popular e-commerce companies.

## 📁 Project Structure

```
Testing-Project-/
├── api/
│   └── companies.js      # Vercel serverless API function
├── data/
│   └── companies.json    # Company data (JSON database)
├── public/               # Static files (served by Vercel)
│   ├── index.html        # Home page with search
│   ├── companyList.html  # Full company listing
│   └── contact.html      # Contact page
├── Frontend/             # Original frontend (kept for reference)
├── server.js             # Local development server
├── package.json          # Project dependencies
├── vercel.json           # Vercel deployment configuration
└── README.md
```

## 🚀 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
vercel
```

### Option 2: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your repository
4. Framework Preset: **Other**
5. No build command needed
6. Click "Deploy"

Vercel will automatically:
- Deploy the API serverless function at `/api/companies`
- Serve static files from `/public`
- Handle routing via `vercel.json`

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/companies` | GET | Returns list of all companies with contact info |

## ✨ Features

- 🔍 Search companies by name
- 📞 View customer care numbers
- 📧 Direct email links
- 🏢 Company logos
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast serverless API

## 🛠️ Tech Stack

- **Frontend:** HTML, Tailwind CSS, Vanilla JavaScript
- **Backend:** Node.js, Express (local) / Vercel Serverless Functions
- **Deployment:** Vercel
- **Data:** JSON file database

## 📝 Notes

- Data source: `data/companies.json`
- Serverless handler: `api/companies.js`
- Local dev server: `server.js` (reuses serverless handler)
- Static files: `public/` folder

