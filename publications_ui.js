(() => {
 const cards=[...document.querySelectorAll('.catalog-paper')],years=[...document.querySelectorAll('.catalog-year')],people=[...document.querySelectorAll('[data-person]')];
 const search=document.getElementById('publication-search'),year=document.getElementById('publication-year'),kind=document.getElementById('publication-kind'),status=document.getElementById('publication-status'),all=document.getElementById('all-teachers');
 const teacherNames={'niu-gengyun':'Niu Gengyun（牛耕耘）','shi-haihe':'Shi Haihe（石海鹤）','wei-meicai':'Wei Meicai（魏美才）'};
 let person='all';
 function filter(){
  document.querySelectorAll('.citation-author').forEach(a=>{const selected=a.dataset.author===person;a.classList.toggle('is-highlighted',selected);a.textContent=selected?a.dataset.highlight:a.dataset.original;});
  const tokens=search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);let count=0,published=0,preprints=0,accepted=0;
  for(const card of cards){const d=card.dataset;const visible=(person==='all'||d.teachers.split(' ').includes(person))&&(year.value==='all'||d.year===year.value)&&(kind.value==='all'||d.kind===kind.value)&&(status.value==='all'||d.status===status.value)&&tokens.every(t=>d.search.toLocaleLowerCase().includes(t));card.hidden=!visible;if(visible){count++;if(d.status==='preprint')preprints++;else if(d.status==='accepted')accepted++;else if(d.kind==='article'&&d.status==='published')published++;}}
  for(const section of years){const visible=[...section.querySelectorAll('.catalog-paper')].filter(c=>!c.hidden);section.hidden=!visible.length;section.querySelector('.year-count').textContent=visible.length+' 条';}
  people.forEach(a=>{if(a.dataset.person===person)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
  all.setAttribute('aria-pressed',String(person==='all'));
  document.getElementById('publication-count').textContent=`${person==='all'?'全部教师':teacherNames[person]} · 显示 ${count} 条记录${published||preprints||accepted?`（已发表论文 ${published} 篇${preprints?'；预印本 '+preprints+' 篇':''}${accepted?'；接收稿 '+accepted+' 篇':''}）`:''}`;
  document.getElementById('publication-empty').hidden=count!==0;
 }
 function fromHash(){const hash=location.hash.slice(1);person=Object.hasOwn(teacherNames,hash)&&people.some(p=>p.dataset.person===hash)?hash:(document.body.dataset.defaultTeacher||'all');filter();}
 search.addEventListener('input',filter);[year,kind,status].forEach(el=>el.addEventListener('change',filter));
 people.forEach(a=>a.addEventListener('click',event=>{event.preventDefault();person=a.dataset.person;history.replaceState(null,'','#'+person);filter();}));
 all.addEventListener('click',()=>{person='all';history.replaceState(null,'',location.pathname+location.search);filter();});
 document.getElementById('reset-publications').addEventListener('click',()=>{search.value='';year.value=kind.value=status.value='all';filter();});
 window.addEventListener('hashchange',fromHash);fromHash();
})();
