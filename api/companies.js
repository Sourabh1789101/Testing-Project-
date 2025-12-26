'use strict';

const fs = require('fs');
const path = require('path');

// For Vercel, use __dirname to get the correct path
const dataFilePath = path.join(__dirname, '..', 'data', 'companies.json');

function normalizeCompany(rawCompany) {
  const name = (rawCompany.company_name || rawCompany['company name'] || rawCompany.name || '').toString().trim();
  const phone = (rawCompany.customer_care_number || rawCompany['customer care number'] || rawCompany.phone || '').toString().trim();
  const email = (rawCompany.email || rawCompany.mail || '').toString().trim();
  const logo = (rawCompany.logo_url || rawCompany.logo || rawCompany.logoUrl || '').toString().trim();

  return {
    name,
    phone,
    email,
    logo,
    service: rawCompany.service ? String(rawCompany.service) : ''
  };
}

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const rawCompanies = JSON.parse(fileContent);
    const companies = rawCompanies
      .map(normalizeCompany)
      .filter(c => c.name && (c.email || c.phone));

    companies.sort((a, b) => a.name.localeCompare(b.name));

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json(companies);
  } catch (error) {
    console.error('Failed to load companies:', error);
    res.status(500).json({ error: 'Failed to load companies' });
  }
};


