export default function decorate(block) {
  // Get all rows from the block table
  const rows = [...block.children];

  // Row 1 - Heading
  const headingRow = rows[0];
  headingRow.classList.add('banner-heading');

  // Row 2 - Description
  if (rows[1]) {
    rows[1].classList.add('banner-description');
  }

  // Row 3 - Button
  if (rows[2]) {
    rows[2].classList.add('banner-button');
  }

  // Wrap everything in a container
  const container = document.createElement('div');
  container.classList.add('banner-container');

  // Move all rows into container
  while (block.firstChild) {
    container.appendChild(block.firstChild);
  }

  block.appendChild(container);
}