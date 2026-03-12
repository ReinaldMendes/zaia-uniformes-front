function unwrapContentValue(payload) {
  if (payload == null) return '';
  if (typeof payload === 'string') return payload;
  return payload.value ?? payload.content ?? payload.text ?? payload.data ?? '';
}

async function applyContentKey(key, nodes) {
  try {
    const payload = await Api.getContentByKey(key);
    const value = unwrapContentValue(payload);

    nodes.forEach((node) => {
      const attr = node.dataset.contentAttr;
      if (attr) {
        node.setAttribute(attr, value);
      } else {
        node.textContent = value;
      }
    });
  } catch (error) {
    console.warn(`Falha ao carregar conteúdo ${key}:`, error.message);
  }
}

async function loadDynamicContent() {
  const nodes = [...document.querySelectorAll('[data-content-key]')];
  const grouped = nodes.reduce((acc, node) => {
    const key = node.dataset.contentKey;
    if (!acc[key]) acc[key] = [];
    acc[key].push(node);
    return acc;
  }, {});

  await Promise.all(Object.entries(grouped).map(([key, groupedNodes]) => applyContentKey(key, groupedNodes)));
}

document.addEventListener('DOMContentLoaded', loadDynamicContent);
