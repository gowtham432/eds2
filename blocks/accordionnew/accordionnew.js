export default function decorate(block) {
  const fields = {};
  const items = [];
  let inItems = false;

  const rows = [...block.children];
  rows.forEach((row) => {
    const [keyCell, valueCell] = [...row.children];
    const key = keyCell?.textContent?.trim()?.toLowerCase();
    const value = valueCell?.textContent?.trim();

    if (!key && !value) {
      return;
    }

    // Detect multifield rows by presence of item keys.
    if (key === 'question' || key === 'answer') {
      inItems = true;
    }

    if (!inItems) {
      if (key && value) {
        fields[key] = value;
      }
    } else {
      // Multifield parsing: each item is a set of key/value rows separated by an empty row.
      // We rebuild items using the required multifield algorithm.
    }
  });

  // Required multifield parsing algorithm (items are separated by empty rows).
  const groups = [];
  let current = {};
  [...block.children].forEach((row) => {
    const [keyCell, valueCell] = [...row.children];
    const key = keyCell?.textContent?.trim()?.toLowerCase();
    const value = valueCell?.textContent?.trim();
    if (!key && !value) {
      if (Object.keys(current).length) { groups.push(current); current = {}; }
    } else {
      if (key) current[key] = value;
    }
  });
  if (Object.keys(current).length) groups.push(current);

  // Split top-level fields from multifield groups.
  // Top-level fields are known: title.
  // Multifield groups contain question/answer.
  groups.forEach((g) => {
    if (g.question || g.answer) items.push({ question: g.question, answer: g.answer });
  });

  // Also parse title using the key-value pattern.
  // (We do this after multifield parsing to avoid mixing.)
  const titleRows = [...block.children].filter((row) => {
    const [keyCell, valueCell] = [...row.children];
    const key = keyCell?.textContent?.trim()?.toLowerCase();
    return key === 'title';
  });
  titleRows.forEach((row) => {
    const [keyCell, valueCell] = [...row.children];
    const key = keyCell?.textContent?.trim()?.toLowerCase();
    const value = valueCell?.textContent?.trim();
    if (key && value) fields[key] = value;
  });

  block.innerHTML = '';

  const root = document.createElement('div');
  root.className = 'accordionnew';

  if (fields.title) {
    const heading = document.createElement('h2');
    heading.className = 'accordionnew-heading';
    heading.textContent = fields.title;
    root.appendChild(heading);
  }

  const list = document.createElement('div');
  list.className = 'accordionnew-list';

  const uidBase = `acc-${Math.random().toString(16).slice(2)}`;

  items.forEach((item, index) => {
    const q = item.question?.trim();
    const a = item.answer?.trim();
    if (!q || !a) return;

    const itemId = `${uidBase}-${index}`;

    const accItem = document.createElement('div');
    accItem.className = 'accordionnew-item';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'accordionnew-heading';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', itemId);
    btn.id = `${itemId}-btn`;
    btn.textContent = q;

    const panel = document.createElement('div');
    panel.className = 'accordionnew-panel';
    panel.id = itemId;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', `${itemId}-btn`);
    panel.hidden = true;

    const answer = document.createElement('div');
    answer.className = 'accordionnew-answer';
    answer.textContent = a;

    panel.appendChild(answer);

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
      if (!expanded) {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      } else {
        panel.style.maxHeight = '0px';
      }
    });

    accItem.appendChild(btn);
    accItem.appendChild(panel);
    list.appendChild(accItem);
  });

  root.appendChild(list);
  block.appendChild(root);
}
