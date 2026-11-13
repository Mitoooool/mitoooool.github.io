window.archivePeriod = 0;
window.renderAnnualChart = function(current) {
  const host = document.getElementById('annual-chart');
  const papers = current.filter(r => r.kind === 'article' && r.status === 'published');
  const keys = ['sci', 'non'];
  const palette=getComputedStyle(document.body);
  const colors=[palette.getPropertyValue('--sci').trim(),palette.getPropertyValue('--non').trim()];
  const grid=palette.getPropertyValue('--chart-grid').trim()||'#e3e9e6';
  const years = Array.from({length: window.archivePeriod ? 5 : 20}, (_, i) => (window.archivePeriod || 2007) + i);
  const bins = years.map(year => ({year, counts: keys.map(k => papers.filter(r => r.year === year && r.sci_class === k).length)}));
  const max = Math.max(5,...bins.map(b => b.counts.reduce((a,b)=>a+b,0)));
  const ceiling = Math.ceil(max/5)*5;
  const left=44, top=30, height=200, width=1040, plot=976, step=plot/years.length, bw=Math.min(40,step*.66);
  let svg=`<svg viewBox="0 0 ${width} 278" role="img" aria-label="年度正式论文数量，分SCI和非SCI两类">`;
  for(let t=0;t<=ceiling;t+=5){const y=top+height-height*t/ceiling;svg+=`<line x1="${left}" x2="1024" y1="${y}" y2="${y}" stroke="${grid}"/><text x="${left-14}" y="${y+4}" text-anchor="end" class="tick">${t}</text>`;}
  bins.forEach((b,i)=>{
    const x=left+step*i+(step-bw)/2,total=b.counts.reduce((a,b)=>a+b,0);let stacked=0;
    const desc=`${b.year}年：正式论文${total}篇，SCI ${b.counts[0]}篇，非SCI ${b.counts[1]}篇`;
    svg+=`<g class="annual-bar" tabindex="0" role="button" aria-label="${desc}；点击筛选此年" data-year="${b.year}"><title>${desc}</title><rect x="${left+step*i}" y="8" width="${step}" height="253" fill="transparent"/>`;
    b.counts.forEach((n,k)=>{if(!n)return;const h=n/ceiling*height,y=top+height-(stacked+n)/ceiling*height;svg+=`<rect x="${x}" y="${y}" width="${bw}" height="${h}" fill="${colors[k]}"/>`;stacked+=n;});
    if(total)svg+=`<text x="${x+bw/2}" y="${top+height-total/ceiling*height-8}" text-anchor="middle" class="bar-total">${total}</text>`;
    svg+=`<text x="${x+bw/2}" y="254" text-anchor="middle" class="tick">${b.year}</text></g>`;
  });svg+='</svg>';host.innerHTML=svg;
  document.getElementById('chart-totals').textContent=`当前范围：正式论文 ${papers.length} 篇 · SCI ${papers.filter(r=>r.sci_class==='sci').length} · 非 SCI ${papers.filter(r=>r.sci_class==='non').length}`;
  document.getElementById('chart-empty').hidden=papers.length>0;
  host.querySelectorAll('[data-year]').forEach(g=>{const action=()=>{const select=document.getElementById('year-filter');select.value=String(g.dataset.year);select.dispatchEvent(new Event('change',{bubbles:true}));document.getElementById('result-count').scrollIntoView({behavior:'smooth',block:'center'});};g.onclick=action;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();action();}};});
  const visible=new Set(current.filter(r=>r.kind==='article').map(r=>r.id));
  const rows=window.RESEARCH_ARCHIVE.filter(r=>visible.has(r.id)&&r.status==='published');
  document.getElementById('annual-table-body').innerHTML=bins.map(b=>`<tr><td>${b.year}</td>${b.counts.map(n=>`<td>${n}</td>`).join('')}<td>${b.counts.reduce((a,b)=>a+b,0)}</td></tr>`).join('');
};
document.querySelectorAll('[data-period]').forEach(button=>button.addEventListener('click',()=>{window.archivePeriod=Number(button.dataset.period);document.querySelectorAll('[data-period]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.getElementById('year-filter').value='';document.getElementById('year-filter').dispatchEvent(new Event('change',{bubbles:true}));}));
document.getElementById('reset-filters').addEventListener('click',()=>{window.archivePeriod=0;document.querySelectorAll('[data-period]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.period==='0')));});
document.getElementById('export-annual').addEventListener('click',()=>{
  const rows=[['年份','SCI','非SCI','正式论文总数'],...[...document.querySelectorAll('#annual-table-body tr')].map(tr=>[...tr.cells].map(td=>td.textContent))];
  const url=URL.createObjectURL(new Blob(['\ufeff'+rows.map(r=>r.join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='年度发文量.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);
});
