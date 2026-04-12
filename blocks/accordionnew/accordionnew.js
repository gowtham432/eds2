export default function decorate(block) {
  const fields = {};
  [...(block?.children ?? [])].forEach((row) => {
    const [keyCell, valueCell] = [...(row?.children ?? [])];
    const key = keyCell?.textContent?.trim()?.toLowerCase();
    if (key && valueCell) {
      fields[key] = valueCell;
    }
  });

  const title = fields.title?.textContent?.trim() ?? '';

  const groups = [];
  let current = {};
  [...(block?.children ?? [])].forEach((row) => {
    const [keyCell, valueCell] = [...(row?.children ?? [])];
    const key = keyCell?.textContent?.trim()?.toLowerCase();
    const value = valueCell?.textContent?.trim();

    if (!key && !value) {
      if (Object.keys(current).length) {
        groups.push(current);
        current = {};
      }
    } else {
      if (key) current[key] = value;
    }
  });
  if (Object.keys(current).length) groups.push(current);

  const items = groups
    .map((g) => ({
      question: g?.question ?? '',
      answer: g?.answer ?? ''
    }))
    .filter((it) => (it.question || it.answer));

  if (!block) return;

  block.innerHTML = '';

  const root = document.createElement('div');
  root.className = 'accordionnew';

  if (title) {
    const heading = document.createElement('h2');
    heading.className = 'accordionnew-heading';
    heading.textContent = title;
    root.appendChild(heading);
  }

  const list = document.createElement('div');
  list.className = 'accordionnew-list';

  items?.forEach((it, index) => {
    const itemId = `accnew-${index}-${Math.random().toString(16).slice(2)}`;

    const item = document.createElement('div');
    item.className = 'accordionnew-item';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'accordionnew-question';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', itemId);
    btn.id = `${itemId}-btn`;
    btn.textContent = it?.question || '';

    const panel = document.createElement('div');
    panel.className = 'accordionnew-answer';
    panel.id = itemId;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', `${itemId}-btn`);
    panel.hidden = true;

    const answerWrap = document.createElement('div');
    answerWrap.className = 'accordionnew-answer-content';
    answerWrap.textContent = it?.answer || '';
    panel.appendChild(answerWrap);

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
      item.classList.toggle('is-open', !expanded);
    });

    item.appendChild(btn);
    item.appendChild(panel);
    list.appendChild(item);
  });

  root.appendChild(list);
  block.appendChild(root);
}
