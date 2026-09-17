const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = __dirname;
const source = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
function readObject(name, endMarker) {
  const start = source.indexOf(`const ${name} =`);
  const end = source.indexOf(endMarker, start);
  if (start < 0 || end < 0) throw new Error(`Cannot read ${name}`);
  return vm.runInNewContext(`${source.slice(start, end)}\n${name}`);
}
const data = readObject('projectData', 'const originalCards');
const slugs = readObject('projectSlugs', 'function titleOf');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const origin = 'https://developerportafolio.ifeede.net';
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
for (const [title, slug] of Object.entries(slugs)) {
  const detail = data[title][3];
  const sourceImage = data[title][6]?.[0];
  const image = !sourceImage || sourceImage.endsWith('.webp') ? `assets/previews/${slug}.png` : sourceImage;
  const url = `${origin}/projects/${slug}/`;
  const metadata = `
    <base href="/" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Federico D'Andrea | Portfolio" />
    <meta property="og:title" content="${escape(title)} | Federico D'Andrea" />
    <meta property="og:description" content="${escape(detail)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${origin}/${image}" />
    <meta property="og:image:alt" content="${escape(title)}: ${escape(data[title][1][0])}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)} | Federico D'Andrea" />
    <meta name="twitter:description" content="${escape(detail)}" />
    <meta name="twitter:image" content="${origin}/${image}" />`;
  const page = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)} | Federico D'Andrea</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(detail)}" />`)
    .replace('</head>', `${metadata}\n  </head>`);
  const directory = path.join(root, 'projects', slug);
  fs.mkdirSync(directory, {recursive: true});
  fs.writeFileSync(path.join(directory, 'index.html'), page);
}
console.log(`Built ${Object.keys(slugs).length} project preview pages.`);
