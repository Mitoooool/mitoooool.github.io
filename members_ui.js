(() => {
  const cards = [...document.querySelectorAll('.member-card')];
  const search = document.getElementById('member-search');
  const college = document.getElementById('college-filter');
  const year = document.getElementById('year-filter');
  const stageButtons = [...document.querySelectorAll('[data-stage-filter]')];
  const tabs = [...document.querySelectorAll('[data-people-view]')];
  const panels = {
    members: document.getElementById('view-members'),
    collaborations: document.getElementById('view-collaborations')
  };
  let stage = 'all';
  cards.forEach(card => {
    card.dataset.search += ' ' + [...card.querySelectorAll('.education-history strong')].map(node => node.textContent).join(' ');
  });
  function filter() {
    const needle = search.value.trim().toLocaleLowerCase();
    let count = 0;
    cards.forEach(card => {
      const matchStage = stage === 'all' || card.dataset.stages.split(' ').includes(stage);
      const matchCollege = college.value === 'all' || card.dataset.affiliation === college.value;
      const matchYear = year.value === 'all' || card.dataset.years.split(' ').includes(year.value);
      const matchText = !needle || card.dataset.search.toLocaleLowerCase().includes(needle);
      card.hidden = !(matchStage && matchCollege && matchYear && matchText);
      if (!card.hidden) count++;
    });
    document.getElementById('member-count').textContent = `显示${count}位研究参与者`;
    document.getElementById('no-members').hidden = count > 0;
    document.getElementById('alphabetical-roster').hidden = count === 0;
  }
  function activateView(view, updateHash = false) {
    if (!panels[view]) return;
    for (const [key, panel] of Object.entries(panels)) panel.hidden = key !== view;
    tabs.forEach(tab => {
      const selected = tab.dataset.peopleView === view;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    if (updateHash) history.replaceState(null, '', '#' + panels[view].id);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateView(tab.dataset.peopleView, true));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[target].focus();
      activateView(tabs[target].dataset.peopleView, true);
    });
  });
  stageButtons.forEach(button => button.addEventListener('click', () => {
    stage = button.dataset.stageFilter;
    stageButtons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    filter();
  }));
  search.addEventListener('input', filter);
  college.addEventListener('change', filter);
  year.addEventListener('change', filter);
  function resetFilters() {
    stage = 'all';
    search.value = '';
    college.value = 'all';
    year.value = 'all';
    stageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.stageFilter === 'all')));
    filter();
  }
  function openLinkedProfile() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (id === 'view-collaborations' || id === 'research-collaborations') {
      activateView('collaborations');
      return;
    }
    if (id === 'view-members') {
      activateView('members');
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    if (target.closest('#view-members')) {
      activateView('members');
      if (target.classList.contains('member-card')) resetFilters();
    } else if (target.closest('#view-collaborations')) {
      activateView('collaborations');
    }
    const details = target.querySelector('details');
    if (details) details.open = true;
    requestAnimationFrame(() => target.scrollIntoView({block: 'start', behavior: 'instant'}));
  }
  addEventListener('hashchange', openLinkedProfile);
  filter();
  activateView('members');
  openLinkedProfile();
})();
