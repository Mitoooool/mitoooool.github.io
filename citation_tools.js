(() => {
  'use strict';

  // Use immutable citation text, so teacher-name highlighting never changes a reference.
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Some browsers deny Clipboard API access; try the local fallback.
      }
    }
    const box = document.createElement('textarea');
    box.value = text;
    box.setAttribute('aria-label', '待复制的完整引文');
    box.style.cssText = 'position:fixed;left:0;top:0;opacity:0';
    const active = document.activeElement;
    document.body.append(box);
    box.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    } finally {
      box.remove();
      if (active instanceof HTMLElement) active.focus({preventScroll: true});
    }
    return copied;
  }

  document.querySelectorAll('.reference-copy').forEach(button => {
    button.addEventListener('click', async () => {
      const tools = button.closest('.reference-tools');
      const status = tools.querySelector('.reference-status');
      const text = button.dataset.citation;
      button.disabled = true;
      try {
        if (await copyText(text)) {
          status.textContent = '已复制';
        } else {
          const card = button.closest('article');
          const citation = card.querySelector('.citation-text') || card.querySelector('.catalog-citation');
          const details = citation.closest('details');
          if (details) details.open = true;
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(citation);
          selection.removeAllRanges();
          selection.addRange(range);
          status.textContent = '请按 Ctrl+C（Mac：⌘C）复制已选引文';
        }
      } finally {
        button.disabled = false;
      }
    });
  });
})();
