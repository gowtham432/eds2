/** Decorate repeatable DA image/content rows without embedding opaque HTML. */
export default function decorate(block) {
  const grid = document.createElement('div');
  grid.className = 'campaign-cards-grid';
  [...block.children].forEach((row) => {
    const [first, second] = [...row.children];
    if (!first) return;
    if (!second?.textContent.trim() && !row.querySelector('img')) {
      block.append(...first.childNodes);
      row.remove();
      return;
    }
    const card = document.createElement('article');
    card.className = 'campaign-cards-item';
    [...row.children].forEach((cell) => card.append(...cell.childNodes));
    grid.append(card);
    row.remove();
  });
  block.append(grid);
}
