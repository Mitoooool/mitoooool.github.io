(() => {
 const cards=[...document.querySelectorAll('.member-card')];
 // Index only the dates actually recorded; never infer missing education years.
 cards.forEach(card=>{card.dataset.search+=' '+[...card.querySelectorAll('.education-history strong')].map(n=>n.textContent).join(' ');});
 const search=document.getElementById('member-search');
 const buttons=[...document.querySelectorAll('[data-stage-filter]')];
 let stage='all';
 function filter(){
  const needle=search.value.trim().toLocaleLowerCase();let count=0;
  cards.forEach(card=>{const matchStage=stage==='all'||card.dataset.stages.split(' ').includes(stage);const matchText=!needle||card.dataset.search.toLocaleLowerCase().includes(needle);card.hidden=!(matchStage&&matchText);if(!card.hidden)count++;});
  document.getElementById('member-count').textContent=`显示${count}位成员`;
  document.getElementById('no-members').hidden=count>0;
 }
 buttons.forEach(button=>button.addEventListener('click',()=>{stage=button.dataset.stageFilter;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filter();}));
 search.addEventListener('input',filter);
 function openLinkedProfile(){
  let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
  const target=document.getElementById(id);
  if(!target)return;
  if(target.classList.contains('member-card')){
   stage='all';search.value='';buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.stageFilter==='all')));filter();
  }
  const details=target.querySelector('details');if(details)details.open=true;
  requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));
 }
 addEventListener('hashchange',openLinkedProfile);openLinkedProfile();
})();
