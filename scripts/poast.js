import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { customAlphabet } from 'nanoid';
import { execSync } from 'child_process';

const projectRoot = process.cwd();

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

function getTodayString() {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD format
}

function getTodayISO() {
  const now = new Date();
  const isoDate = now.toISOString().split('T')[0];

  // Get local timezone offset in minutes, then convert to hours
  const offsetMinutes = now.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
  const offsetMins = Math.abs(offsetMinutes) % 60;

  // Format offset as ±HH:MM
  const sign = offsetMinutes <= 0 ? '+' : '-';
  const offsetString = `${sign}${offsetHours.toString().padStart(2, '0')}:${offsetMins.toString().padStart(2, '0')}`;
  const idString = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Format current local time
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `${isoDate}T${hours}:${minutes}:${seconds}${offsetString}[${idString}]`;
}

function main() {
  const args = process.argv.slice(2);
  const title = args.join(' ').trim();

  const datePrefix = getTodayString();
  const publishedAt = getTodayISO();

  let filename;
  if (title) {
    const slug = slugify(title);
    filename = `${datePrefix}-${slug}.md`;
  } else {
    const alphanumericId = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 8);
    filename = `${datePrefix}-${alphanumericId()}.md`;
  }

  const postsDir = join(projectRoot, 'src', 'content', 'posts');
  const filepath = join(postsDir, filename);

  const content = `---
${title ? `title: "${title}"\n` : ''}publishedAt: "${publishedAt}"
---
`;

  // Ensure the directory exists
  mkdirSync(postsDir, { recursive: true });

  // Write the file
  writeFileSync(filepath, content, 'utf8');

  console.log(`Created new post: ${filepath}`);

  // Open the file
  execSync(`vim ${filepath}`, { stdio: 'inherit' });
}

main();
