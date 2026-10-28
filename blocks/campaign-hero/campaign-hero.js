/** Decorate the reviewed two-cell DA campaign hero contract. */
export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  const [text, image] = [...row.children];
  row.classList.add('campaign-hero-layout');
  if (text) {
    text.classList.add('campaign-hero-copy');
    const heading = text.querySelector('h1, h2');
    const intro = text.querySelector('p');
    const paragraphs = [...text.querySelectorAll('p, h1, h2')];
    if (intro && heading && paragraphs.indexOf(intro) < paragraphs.indexOf(heading)) {
      intro.classList.add('campaign-hero-eyebrow');
    }
    const link = text.querySelector('a');
    if (link) link.classList.add('campaign-hero-cta');
  }
  if (image) image.classList.add('campaign-hero-image');
}
