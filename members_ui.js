(() => {
  const cards = [...document.querySelectorAll('.member-card')];
  const groups = [...document.querySelectorAll('[data-roster-group]')];
  const search = document.getElementById('member-search');
  const team = document.getElementById('team-filter');
  const buttons = [...document.querySelectorAll('[data-stage-filter]')];
  let stage = 'all';
  cards.forEach(card => {
    card.dataset.search += ' ' + [...card.querySelectorAll('.education-history strong')].map(node => node.textContent).join(' ');
  });
  function filter() {
    const needle = search.value.trim().toLocaleLowerCase();
    let count = 0;
    cards.forEach(card => {
      const matchStage = stage === 'all' || card.dataset.stages.split(' ').includes(stage);
      const matchTeam = team.value === 'all' || card.dataset.group === team.value;
      const matchText = !needle || card.dataset.search.toLocaleLowerCase().includes(needle);
      card.hidden = !(matchStage && matchTeam && matchText);
      if (!card.hidden) count++;
    });
    groups.forEach(group => {
      const visible = [...group.querySelectorAll('.member-card')].filter(card => !card.hidden).length;
      group.hidden = visible === 0;
      group.querySelector('.roster-group-count').textContent = `${visible} 位`;
    });
    document.getElementById('member-count').textContent = `显示${count}位成员与合作者`;
    document.getElementById('no-members').hidden = count > 0;
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    stage = button.dataset.stageFilter;
    buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    filter();
  }));
  search.addEventListener('input', filter);
  team.addEventListener('change', filter);
  function openLinkedProfile() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    if (target.classList.contains('member-card')) {
      stage = 'all';
      search.value = '';
      team.value = 'all';
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.stageFilter === 'all')));
      filter();
    }
    const details = target.querySelector('details');
    if (details) details.open = true;
    requestAnimationFrame(() => target.scrollIntoView({block: 'start', behavior: 'instant'}));
  }
  addEventListener('hashchange', openLinkedProfile);
  filter();
  openLinkedProfile();
})();
