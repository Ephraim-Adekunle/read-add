const initialTransfers = [
  {name:'Chika Nwosu', initials:'CN', ref:'TRX-2849-001', date:'Today, 10:42 AM', amount:850000, status:'Completed', tone:''},
  {name:'Emeka Obi', initials:'EO', ref:'TRX-2849-002', date:'Today, 9:18 AM', amount:320000, status:'Processing', tone:'alt1'},
  {name:'Amara Eze', initials:'AE', ref:'TRX-2848-019', date:'Nov 1, 3:56 PM', amount:1250000, status:'Completed', tone:'alt2'},
  {name:'Tunde Bakare', initials:'TB', ref:'TRX-2848-018', date:'Nov 1, 1:24 PM', amount:475000, status:'Completed', tone:'alt3'},
  {name:'Ngozi Okeke', initials:'NO', ref:'TRX-2848-014', date:'Oct 31, 4:09 PM', amount:210000, status:'Processing', tone:'alt1'}
];
let transfers = [...initialTransfers];
const fmt = n => '₦' + Number(n).toLocaleString('en-NG', {minimumFractionDigits:2, maximumFractionDigits:2});
function tableRows(list){return list.map(t=>`<tr><td><div class="recipient"><span class="recipient-avatar ${t.tone||''}">${escapeHtml(t.initials)}</span>${escapeHtml(t.name)}</div></td><td><span class="ref">${escapeHtml(t.ref)}</span></td><td>${escapeHtml(t.date)}</td><td><span class="amount">${fmt(t.amount)}</span></td><td><span class="status ${t.status.toLowerCase()}">${t.status}</span></td></tr>`).join('')}
function mobileCards(list){return list.map(t=>`<article class="transfer-card"><div class="transfer-card-top"><div class="recipient"><span class="recipient-avatar ${t.tone||''}">${escapeHtml(t.initials)}</span>${escapeHtml(t.name)}</div><span class="status ${t.status.toLowerCase()}">${t.status}</span></div><div class="transfer-card-bottom"><span class="date">${escapeHtml(t.date)} · ${escapeHtml(t.ref)}</span><span class="amount">${fmt(t.amount)}</span></div></article>`).join('')}
function renderTransfers(){document.querySelector('#transferRows').innerHTML=tableRows(transfers.slice(0,5));document.querySelector('#mobileTransferList').innerHTML=mobileCards(transfers.slice(0,5));document.querySelector('#allTransferRows').innerHTML=tableRows(transfers);document.querySelector('#allMobileTransferList').innerHTML=mobileCards(transfers)}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
renderTransfers();
const modal=document.querySelector('#modal');
function openModal(){modal.hidden=false;document.body.style.overflow='hidden';setTimeout(()=>modal.querySelector('input').focus(),30)}
function closeModal(){modal.hidden=true;document.body.style.overflow=''}
document.querySelector('#newTransfer').addEventListener('click',openModal);
document.querySelector('#newTransferAlt').addEventListener('click',openModal);
document.querySelector('#closeModal').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal()});
document.querySelector('#transferForm').addEventListener('submit',e=>{
  e.preventDefault(); const data=new FormData(e.currentTarget); const name=String(data.get('recipient')).trim(); const amount=Number(data.get('amount'));
  const initials=name.split(/\s+/).slice(0,2).map(p=>p[0]).join('').toUpperCase();
  transfers.unshift({name,initials,ref:'DEMO-'+Math.random().toString(36).slice(2,8).toUpperCase(),date:'Just now',amount,status:'Processing',tone:'alt2'});
  renderTransfers(); e.currentTarget.reset(); closeModal(); showToast('Simulated transfer added to your activity.');
});
document.querySelector('#dismissBanner').addEventListener('click',()=>document.querySelector('.banner').remove());
let toastTimer;function showToast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),3000)}
const views={overview:['Overview',''],transfers:['Transfers','Review and manage your settlement activity.'],beneficiaries:['Beneficiaries','Manage recipients for your sample workspace.'],activity:['Activity','A timeline of recent workspace updates.']};
function showView(name){const isOverview=name==='overview';document.querySelector('#overviewView').hidden=!isOverview;document.querySelector('#secondaryView').hidden=isOverview;document.querySelector('#crumbTitle').textContent=views[name][0];document.querySelector('#secondaryTitle').textContent=views[name][0];document.querySelector('#secondarySubhead').textContent=views[name][1];document.querySelector('#listTitle').textContent=name==='beneficiaries'?'Recent recipients':'All transfers';document.querySelectorAll('.nav-link').forEach(a=>a.classList.toggle('active',a.dataset.view===name));document.querySelector('#sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-view]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showView(a.dataset.view)}));
document.querySelector('#mobileMenu').addEventListener('click',()=>document.querySelector('#sidebar').classList.toggle('open'));
document.addEventListener('click',e=>{const side=document.querySelector('#sidebar');if(side.classList.contains('open')&&!side.contains(e.target)&&!e.target.closest('#mobileMenu'))side.classList.remove('open')});
document.querySelector('.range-button').addEventListener('click',()=>showToast('Showing the last 30 days.'));
document.querySelector('.icon-button').addEventListener('click',()=>showToast('You’re all caught up.'));
document.querySelector('.more').addEventListener('click',()=>showToast('Sample workspace profile'));
document.querySelector('.dots').addEventListener('click',()=>showToast('Activity is up to date.'));
