import { readFileSync } from 'fs';
import { execSync } from 'child_process';

// Load .env.local
const envFile = readFileSync('.env.local', 'utf-8');
const envVars = {};
for (const line of envFile.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
}

const env = { ...process.env, ...envVars };

// Generate Prisma client
console.log('→ prisma generate...');
execSync('npx prisma generate', { stdio: 'inherit', env });

// Run seed
console.log('→ running seed...');
execSync('node scripts/reset-and-seed.mjs', { stdio: 'inherit', env });
