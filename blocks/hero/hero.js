/**
 * Hero Block
 *
 * Supported variants: (add as class in table header)
 *   - default  : full-width centered hero
 *   - split    : image left, text right
 *
 * Supported fields (key-value rows):
 *   - heading      : Main headline text
 *   - subheading   : Secondary headline
 *   - description  : Body paragraph text
 *   - image        : Hero image (url or da.live image)
 *   - button-text  : CTA button label
 *   - button-link  : CTA button href
 *   - badge        : Small label shown above heading
 *
 * Example (default):
 * | hero | |
 * | heading | Welcome to our platform |
 * | description | We build amazing things |
 * | button-text | Get Started |
 * | button-link | /contact |
 *
 * Example (split variant):
 * | hero (split) | |
 * | heading | Welcome to our platform |
 * | image | /path/to/image.jpg |
 * | button-text | Learn More |
 * | button-link | /about |
 */

export default function decorate(block) {
  // Parse key-value rows into a map
  const fields = {};
  [...block.children].forEach((row) => {
    const [keyCell, valueCell] = [...row.children];
    if (keyCell && valueCell) {
      const key = keyCell.textContent.trim().toLowerCase();
      fields[key] = valueCell;
    }
  });

  // Detect variant from block classes
  const isSplit = block.classList.contains('split');

  // Clear block content
  block.innerHTML = '';

  // Build hero wrapper
  const wrapper = document.createElement('div');
  wrapper.classList.add('hero-wrapper');

  if (isSplit) {
    // Split layout
    const imageCol = document.createElement('div');
    imageCol.classList.add('hero-image-col');

    const textCol = document.createElement('div');
    textCol.classList.add('hero-text-col');

    if (fields.image) {
      const img = fields.image.querySelector('img') || fields.image;
      imageCol.appendChild(img);
    }

    if (fields.badge) {
      const badge = document.createElement('span');
      badge.classList.add('hero-badge');
      badge.textContent = fields.badge.textContent.trim();
      textCol.appendChild(badge);
    }

    if (fields.heading) {
      const h1 = document.createElement('h1');
      h1.classList.add('hero-heading');
      h1.textContent = fields.heading.textContent.trim();
      textCol.appendChild(h1);
    }

    if (fields.subheading) {
      const h2 = document.createElement('h2');
      h2.classList.add('hero-subheading');
      h2.textContent = fields.subheading.textContent.trim();
      textCol.appendChild(h2);
    }

    if (fields.description) {
      const p = document.createElement('p');
      p.classList.add('hero-description');
      p.textContent = fields.description.textContent.trim();
      textCol.appendChild(p);
    }

    if (fields['button-text'] && fields['button-link']) {
      const a = document.createElement('a');
      a.classList.add('hero-btn');
      a.textContent = fields['button-text'].textContent.trim();
      a.href = fields['button-link'].textContent.trim();
      textCol.appendChild(a);
    }

    wrapper.appendChild(imageCol);
    wrapper.appendChild(textCol);
  } else {
    // Default centered layout
    const content = document.createElement('div');
    content.classList.add('hero-content');

    if (fields.badge) {
      const badge = document.createElement('span');
      badge.classList.add('hero-badge');
      badge.textContent = fields.badge.textContent.trim();
      content.appendChild(badge);
    }

    if (fields.heading) {
      const h1 = document.createElement('h1');
      h1.classList.add('hero-heading');
      h1.textContent = fields.heading.textContent.trim();
      content.appendChild(h1);
    }

    if (fields.subheading) {
      const h2 = document.createElement('h2');
      h2.classList.add('hero-subheading');
      h2.textContent = fields.subheading.textContent.trim();
      content.appendChild(h2);
    }

    if (fields.description) {
      const p = document.createElement('p');
      p.classList.add('hero-description');
      p.textContent = fields.description.textContent.trim();
      content.appendChild(p);
    }

    if (fields['button-text'] && fields['button-link']) {
      const a = document.createElement('a');
      a.classList.add('hero-btn');
      a.textContent = fields['button-text'].textContent.trim();
      a.href = fields['button-link'].textContent.trim();
      content.appendChild(a);
    }

    wrapper.appendChild(content);
  }

  block.appendChild(wrapper);
}
