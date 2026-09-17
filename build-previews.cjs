const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
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
  const image = `assets/previews/${slug}.png`;
  const input = !sourceImage || sourceImage.endsWith('.webp') ? image : sourceImage;
  execFileSync('sips', ['-Z', '1200', path.join(root, input), '--out', path.join(root, image)], {stdio: 'pipe'});
  const url = `${origin}/projects/${slug}/`;
  const metadata = `
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Federico D'Andrea | Portfolio" />
    <meta property="og:title" content="${escape(title)} | Federico D'Andrea" />
    <meta property="og:description" content="${escape(detail)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${origin}/${image}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content="${escape(title)}: ${escape(data[title][1][0])}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)} | Federico D'Andrea" />
    <meta name="twitter:description" content="${escape(detail)}" />
    <meta name="twitter:image" content="${origin}/${image}" />`;
  const page = html
    .replace('<head>', `<head>\n    <base href="/" />\n    <script>if (location.pathname.startsWith('/projects/')) { const destination = new URL('/', location.origin); destination.search = location.search; destination.searchParams.set('project', ${JSON.stringify(slug)}); if (!destination.searchParams.has('lg')) destination.searchParams.set('lg', 'es'); destination.hash = location.hash; location.replace(destination.href); }</script>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)} | Federico D'Andrea</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(detail)}" />`)
    .replace('</head>', `${metadata}\n  </head>`);
  const directory = path.join(root, 'projects', slug);
  fs.mkdirSync(directory, {recursive: true});
  fs.writeFileSync(path.join(directory, 'index.html'), page);
}
console.log(`Built ${Object.keys(slugs).length} project preview pages.`);
const images = [...new Map(Object.entries(data).flatMap(([title, project]) =>
  (project[6] || []).map((src, index) => [src, {src, alt: `${title}: ${project[1][index] || title}`}])
)).values()];
const galleryDirectory = path.join(root, 'gallery');
fs.mkdirSync(galleryDirectory, {recursive: true});
fs.writeFileSync(path.join(galleryDirectory, 'index.html'), `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Galería | Federico D'Andrea</title><link rel="stylesheet" href="gallery.css"></head>
<body><a class="back" href="/" aria-label="Volver">&#8592;</a><main class="gallery">
${images.map(({src, alt}) => `<button class="tile" type="button" aria-label="${escape(alt)}"><img src="/${src}" alt="${escape(alt)}" loading="lazy" decoding="async" draggable="false"></button>`).join('\n')}
</main><dialog><button class="close" aria-label="Cerrar" type="button">&#215;</button><img alt=""></dialog>
<script src="gallery.js"></script></body></html>`);
