const gallery = document.querySelector('.gallery');
const tiles = [...gallery.children];
for (let i = tiles.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
}
gallery.append(...tiles);
const dialog = document.querySelector('dialog');
const preview = dialog.querySelector('img');
gallery.addEventListener('click', event => {
  const tile = event.target.closest('.tile');
  if (!tile) return;
  const image = tile.querySelector('img');
  preview.src = image.src;
  preview.alt = image.alt;
  dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
const lang = new URLSearchParams(location.search).get('lg') || localStorage.getItem('portfolio-language') || 'es';
document.documentElement.lang = lang === 'en' ? 'en' : 'es';
document.querySelector('.back').href = `/?lg=${document.documentElement.lang}`;
if (lang === 'en') {
  document.title = "Gallery | Federico D'Andrea";
  document.querySelector('.back').ariaLabel = 'Back';
  dialog.querySelector('.close').ariaLabel = 'Close';
}
