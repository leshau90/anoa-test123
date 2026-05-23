
// ══════════════════════════════════════
// VIEW / NAV
// ══════════════════════════════════════
let currentView='public';
function showView(v){
  document.querySelectorAll('.view').forEach(el=>el.classList.remove('active'));
  const el=document.getElementById('view-'+v);
  if(el)el.classList.add('active');
  currentView=v;
  if(v==='admin')renderAdmin();
}
function goLogin(){showView('login'); document.getElementById('login-err').style.display='none'; document.getElementById('l-user').value=''; document.getElementById('l-pass').value='';}
function doLogin(){
  const u=document.getElementById('l-user').value.trim();
  const p=document.getElementById('l-pass').value;
  const pw=load('password')||DEF.password;
  if(u==='admin'&&p===pw){
    document.getElementById('last-login-time').textContent=new Date().toLocaleString('id-ID');
    showView('admin');
  } else {document.getElementById('login-err').style.display='block'}
}
function doLogout(){showView('login')}

// ══════════════════════════════════════
// PUBLIC NAV
// ══════════════════════════════════════


// ══════════════════════════════════════
// RENDER PUBLIC
// ══════════════════════════════════════
const BG_COLORS=['nt1','nt2','nt3','nt4','nt5','nt6'];
const CAT_COLORS={'Kabar YKL':'cb-g','Liputan Media':'cb-r','Artikel':'cb-b','Acara':'cb-r'};
const PUB_ICONS={svg:'<svg viewBox="0 0 40 40" fill="none" stroke="white" stroke-width="1.5"><rect x="7" y="4" width="26" height="32" rx="2"/><path d="M13 13h14M13 18h14M13 23h10"/></svg>'};

function setText(id,val){const el=document.getElementById(id);if(el)el.textContent=val;}
function setHTML(id,val){const el=document.getElementById(id);if(el)el.innerHTML=val;}
function renderBeranda(){
  const S=DB.settings;
  setText('hero-tagline-display',S.tagline||DEF.settings.tagline);
  setText('about-short-display',S.aboutShort||DEF.settings.aboutShort);
  setText('stat-pohon',S.statPohon||'548');
  setText('stat-mitra',S.statMitra||'9+');
  setText('stat-angg',S.statAngg||'16');
  const visi=S.visi||DEF.settings.visi;
  setText('visi-display',visi);
  setText('visi-display-2',visi);
  const aboutLong=S.aboutLong||DEF.settings.aboutLong;
  setHTML('about-long-display',aboutLong);
  const misiLines=(S.misi||DEF.settings.misi).split('\n').filter(l=>l.trim());
  ['misi-display','misi-display-2'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.innerHTML=misiLines.map(l=>`<li>${l}</li>`).join('');
  });
  setText('kontak-quote-display',S.quote||DEF.settings.quote);
  setText('kontak-alamat-display',S.alamat||DEF.settings.alamat);
  setText('kontak-telp-display',S.telp||DEF.settings.telp);
  setText('kontak-email-display',S.email||DEF.settings.email);

  const beritaEl=document.getElementById('berita-display-beranda');
  if(beritaEl){const berita=DB.berita.filter(b=>b.status==='published').slice(0,3);beritaEl.innerHTML=berita.map(b=>newsCardHTML(b)).join('');}

  const mitraEl=document.getElementById('mitra-display');
  if(mitraEl)mitraEl.innerHTML=DB.mitra.map(m=>`<span class="ptag">${m}</span>`).join('');

  renderProgDisplay('prog-display-beranda');
}
function renderBeritaFull(filter=''){
  const el=document.getElementById('berita-display-full');
  let berita=DB.berita.filter(b=>b.status==='published');
  if(filter)berita=berita.filter(b=>b.kategori===filter);
  el.innerHTML=berita.length?berita.map(b=>newsCardHTML(b)).join(''):'<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg><p>Belum ada berita.</p></div>';
}
function renderPubFull(){
  const el=document.getElementById('pub-display');
  const pub=DB.publikasi;
  el.innerHTML=pub.length?pub.map(p=>`<div class="pub-card"><div class="pub-cov ${p.warna||'pc1'}">${PUB_ICONS.svg}</div><div class="pub-body"><p class="pub-type">${p.tipe}</p><h4>${p.judul}</h4><p class="pub-yr">${p.tahun}</p></div></div>`).join(''):'<div class="empty-state"><p>Belum ada publikasi.</p></div>';
}
function renderProgDisplay(elId){
  const el=document.getElementById(elId);
  if(!el)return;
  const progs=DB.program;
  const cls=['pca','pcb','pcc','pcd'];
  el.innerHTML=progs.map((p,i)=>{
    const poin=p.poin?p.poin.split('\n').filter(l=>l.trim()).map(l=>`<li>${l}</li>`).join(''):'';
    return`<div class="prog-card ${cls[i%4]}"><div class="prog-ltr">${p.kode}</div><div class="prog-ttl">${p.judul}</div><ul class="prog-ul">${poin}</ul></div>`;
  }).join('');
}
function renderProgFull(){renderProgDisplay('prog-display-full')}
function newsCardHTML(b){
  const cat=CAT_COLORS[b.kategori]||'cb-g';
  return`<div class="news-card"><div class="news-thumb ${b.warna||'nt1'}"><span class="cat-badge ${cat}">${b.kategori}</span></div><div class="news-body"><h3>${b.judul}</h3><p>${b.ringkasan||''}</p><div class="news-dt">${b.tanggal}</div></div></div>`;
}
function filterBerita(btn,cat){
  document.querySelectorAll('.filter-row .fb').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderBeritaFull(cat);
}

// ══════════════════════════════════════
// ADMIN PANELS
// ══════════════════════════════════════
function showPanel(name){
  document.querySelectorAll('.admin-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s=>s.classList.remove('active'));
  document.getElementById('panel-'+name).classList.add('active');
  document.querySelector(`.sidebar-item[onclick="showPanel('${name}')"]`)?.classList.add('active');
  if(name==='dashboard')renderDashboard();
  if(name==='berita')renderTableBerita();
  if(name==='program')renderTableProgram();
  if(name==='publikasi')renderTablePub();
  if(name==='homepage')loadHomepageForm();
  if(name==='tentang-admin')loadTentangForm();
  if(name==='kontak-admin')loadKontakForm();
  if(name==='mitra')renderTableMitra();
}
function renderAdmin(){renderDashboard();updateBadges();}
function updateBadges(){
  const b=DB.berita.length, p=DB.publikasi.length, m=DB.mitra.length;
  document.getElementById('badge-berita').textContent=b;
  document.getElementById('badge-pub').textContent=p;
  document.getElementById('ds-berita').textContent=b;
  document.getElementById('ds-pub').textContent=p;
  document.getElementById('ds-mitra').textContent=m;
}
function renderDashboard(){
  updateBadges();
  const rb=document.getElementById('dash-recent-berita');
  const rp=document.getElementById('dash-recent-pub');
  const berita=DB.berita.slice(-4).reverse();
  const pub=DB.publikasi.slice(-4).reverse();
  rb.innerHTML=berita.length?berita.map(b=>`<div class="dash-item"><div class="di-dot di-g"></div><div class="di-text">${b.judul}</div><div class="di-date">${b.tanggal||''}</div></div>`).join(''):'<p style="font-size:.8rem;color:rgba(0,0,0,.4)">Belum ada berita</p>';
  rp.innerHTML=pub.length?pub.map(p=>`<div class="dash-item"><div class="di-dot di-r"></div><div class="di-text">${p.judul}</div><div class="di-date">${p.tahun||''}</div></div>`).join(''):'<p style="font-size:.8rem;color:rgba(0,0,0,.4)">Belum ada publikasi</p>';
}

function renderTableBerita(){
  const rows=DB.berita;
  const tb=document.getElementById('table-berita');
  tb.innerHTML=rows.length?rows.map(b=>`<tr>
    <td style="max-width:260px">${b.judul}</td>
    <td><span class="td-cat">${b.kategori}</span></td>
    <td>${b.tanggal||'-'}</td>
    <td><span class="status-pill ${b.status==='published'?'sp-pub':'sp-dft'}">${b.status==='published'?'Tayang':'Draft'}</span></td>
    <td><div class="td-actions"><button class="btn-edit" onclick="openModal('berita',${b.id})">Edit</button><button class="btn-del" onclick="confirmDelete('berita',${b.id})">Hapus</button></div></td>
  </tr>`).join(''):`<tr><td colspan="5" style="text-align:center;color:rgba(0,0,0,.4);padding:2rem">Belum ada data</td></tr>`;
}
function renderTableProgram(){
  const rows=DB.program;
  const tb=document.getElementById('table-program');
  tb.innerHTML=rows.map(p=>`<tr>
    <td style="font-family:'Montserrat',sans-serif;font-size:1.6rem;font-weight:700;color:var(--green);width:50px">${p.kode}</td>
    <td>${p.judul}</td>
    <td style="font-size:.78rem;color:rgba(0,0,0,.55);max-width:300px;line-height:1.6">${(p.poin||'').split('\n').filter(l=>l.trim()).join(' · ')}</td>
    <td><div class="td-actions"><button class="btn-edit" onclick="openModal('program',${p.id})">Edit</button><button class="btn-del" onclick="confirmDelete('program',${p.id})">Hapus</button></div></td>
  </tr>`).join('');
}
function renderTablePub(){
  const rows=DB.publikasi;
  const tb=document.getElementById('table-pub');
  tb.innerHTML=rows.length?rows.map(p=>`<tr>
    <td>${p.judul}</td>
    <td><span class="td-cat">${p.tipe}</span></td>
    <td>${p.tahun}</td>
    <td><div class="td-actions"><button class="btn-edit" onclick="openModal('publikasi',${p.id})">Edit</button><button class="btn-del" onclick="confirmDelete('publikasi',${p.id})">Hapus</button></div></td>
  </tr>`).join(''):`<tr><td colspan="4" style="text-align:center;color:rgba(0,0,0,.4);padding:2rem">Belum ada data</td></tr>`;
}
function renderTableMitra(){
  const rows=DB.mitra;
  const tb=document.getElementById('table-mitra');
  tb.innerHTML=rows.length?rows.map((m,i)=>`<tr>
    <td>${m}</td>
    <td><div class="td-actions"><button class="btn-del" onclick="confirmDelete('mitra',${i})">Hapus</button></div></td>
  </tr>`).join(''):`<tr><td colspan="2" style="text-align:center;color:rgba(0,0,0,.4);padding:2rem">Belum ada mitra</td></tr>`;
}

// SETTINGS FORMS
function loadHomepageForm(){const S=DB.settings; document.getElementById('set-tagline').value=S.tagline||DEF.settings.tagline; document.getElementById('set-about-short').value=S.aboutShort||DEF.settings.aboutShort; document.getElementById('set-stat-pohon').value=S.statPohon||'548'; document.getElementById('set-stat-mitra').value=S.statMitra||'9+'; document.getElementById('set-stat-angg').value=S.statAngg||'16';}
function saveHomepage(){const S=DB.settings||{}; S.tagline=document.getElementById('set-tagline').value; S.aboutShort=document.getElementById('set-about-short').value; S.statPohon=document.getElementById('set-stat-pohon').value; S.statMitra=document.getElementById('set-stat-mitra').value; S.statAngg=document.getElementById('set-stat-angg').value; DB.settings=S; toast('Beranda berhasil disimpan!');}
function loadTentangForm(){const S=DB.settings; document.getElementById('set-visi').value=S.visi||DEF.settings.visi; document.getElementById('set-misi').value=S.misi||DEF.settings.misi; document.getElementById('set-about-long').value=S.aboutLong||DEF.settings.aboutLong;}
function saveTentang(){const S=DB.settings||{}; S.visi=document.getElementById('set-visi').value; S.misi=document.getElementById('set-misi').value; S.aboutLong=document.getElementById('set-about-long').value; DB.settings=S; toast('Halaman Tentang berhasil disimpan!');}
function loadKontakForm(){const S=DB.settings; document.getElementById('set-alamat').value=S.alamat||DEF.settings.alamat; document.getElementById('set-telp').value=S.telp||DEF.settings.telp; document.getElementById('set-email').value=S.email||DEF.settings.email; document.getElementById('set-quote').value=S.quote||DEF.settings.quote;}
function saveKontak(){const S=DB.settings||{}; S.alamat=document.getElementById('set-alamat').value; S.telp=document.getElementById('set-telp').value; S.email=document.getElementById('set-email').value; S.quote=document.getElementById('set-quote').value; DB.settings=S; toast('Kontak berhasil disimpan!');}

// ══════════════════════════════════════
// MODAL CRUD
// ══════════════════════════════════════
let modalType='', modalId=null;
function openModal(type, id){
  modalType=type; modalId=id;
  const isEdit=id!==null;
  document.getElementById('modal-title').textContent=(isEdit?'Edit ':'Tambah ')+({berita:'Berita',program:'Program',publikasi:'Publikasi',mitra:'Mitra'}[type]||type);
  const body=document.getElementById('modal-body');
  let item=null;
  if(isEdit){
    if(type==='mitra'){item=DB.mitra[id];}
    else{item=DB[type].find(x=>x.id===id);}
  }

  if(type==='berita'){
    body.innerHTML=`
      <div class="mf-row"><label>Judul Berita *</label><input type="text" id="mf-judul" value="${esc(item?.judul||'')}"></div>
      <div class="mf-2col">
        <div class="mf-row"><label>Kategori</label><select id="mf-kategori"><option ${v(item?.kategori,'Kabar YKL')}>Kabar YKL</option><option ${v(item?.kategori,'Liputan Media')}>Liputan Media</option><option ${v(item?.kategori,'Artikel')}>Artikel</option><option ${v(item?.kategori,'Acara')}>Acara</option></select></div>
        <div class="mf-row"><label>Tanggal</label><input type="text" id="mf-tanggal" value="${esc(item?.tanggal||'')}"></div>
      </div>
      <div class="mf-row"><label>Ringkasan</label><textarea id="mf-ringkasan" rows="3">${esc(item?.ringkasan||'')}</textarea></div>
      <div class="mf-2col">
        <div class="mf-row"><label>Warna Thumbnail</label><select id="mf-warna"><option ${v(item?.warna,'nt1')}>nt1 (Hijau)</option><option ${v(item?.warna,'nt2')}>nt2 (Merah)</option><option ${v(item?.warna,'nt3')}>nt3 (Biru)</option><option ${v(item?.warna,'nt4')}>nt4 (Hijau Muda)</option><option ${v(item?.warna,'nt5')}>nt5 (Cokelat)</option><option ${v(item?.warna,'nt6')}>nt6 (Teal)</option></select></div>
        <div class="mf-row"><label>Status</label><select id="mf-status"><option ${v(item?.status,'published')}>published</option><option ${v(item?.status,'draft')}>draft</option></select></div>
      </div>`;
  } else if(type==='program'){
    body.innerHTML=`
      <div class="mf-2col">
        <div class="mf-row"><label>Kode (A/B/C/D)</label><input type="text" id="mf-kode" maxlength="2" value="${esc(item?.kode||'')}"></div>
        <div class="mf-row"><label>Judul Program *</label><input type="text" id="mf-judul" value="${esc(item?.judul||'')}"></div>
      </div>
      <div class="mf-row"><label>Poin Program (satu baris = satu poin)</label><textarea id="mf-poin" rows="6">${esc(item?.poin||'')}</textarea></div>`;
  } else if(type==='publikasi'){
    body.innerHTML=`
      <div class="mf-row"><label>Judul Dokumen *</label><input type="text" id="mf-judul" value="${esc(item?.judul||'')}"></div>
      <div class="mf-2col">
        <div class="mf-row"><label>Tipe Dokumen</label><select id="mf-tipe"><option ${v(item?.tipe,'Laporan Riset')}>Laporan Riset</option><option ${v(item?.tipe,'Panduan Teknis')}>Panduan Teknis</option><option ${v(item?.tipe,'Policy Brief')}>Policy Brief</option><option ${v(item?.tipe,'Laporan Program')}>Laporan Program</option><option ${v(item?.tipe,'Studi Kasus')}>Studi Kasus</option><option ${v(item?.tipe,'Modul Pelatihan')}>Modul Pelatihan</option><option ${v(item?.tipe,'Dokumentasi')}>Dokumentasi</option></select></div>
        <div class="mf-row"><label>Tahun</label><input type="text" id="mf-tahun" value="${esc(item?.tahun||'2026')}" maxlength="4"></div>
      </div>
      <div class="mf-row"><label>Warna Sampul</label><select id="mf-warna"><option ${v(item?.warna,'pc1')}>pc1 (Hijau Tua)</option><option ${v(item?.warna,'pc2')}>pc2 (Hijau Muda)</option><option ${v(item?.warna,'pc3')}>pc3 (Merah)</option><option ${v(item?.warna,'pc4')}>pc4 (Biru)</option></select></div>`;
  } else if(type==='mitra'){
    body.innerHTML=`<div class="mf-row"><label>Nama Mitra *</label><input type="text" id="mf-nama" value="${esc(isEdit?item:'')}"></div>`;
  }
  document.getElementById('modal-overlay').classList.remove('hidden');
  setTimeout(()=>body.querySelector('input,textarea')?.focus(),100);
}
function closeModal(e){if(!e||e.target===document.getElementById('modal-overlay'))document.getElementById('modal-overlay').classList.add('hidden');}
function saveModal(){
  const type=modalType, isEdit=modalId!==null;
  if(type==='berita'){
    const judul=document.getElementById('mf-judul').value.trim();
    if(!judul){toast('Judul berita wajib diisi!','error');return;}
    const item={id:isEdit?modalId:Date.now(),judul,kategori:document.getElementById('mf-kategori').value,tanggal:document.getElementById('mf-tanggal').value,ringkasan:document.getElementById('mf-ringkasan').value,warna:document.getElementById('mf-warna').value,status:document.getElementById('mf-status').value};
    let arr=DB.berita;
    if(isEdit){const i=arr.findIndex(x=>x.id===modalId);if(i>=0)arr[i]=item;}else arr.push(item);
    DB.berita=arr;
    renderTableBerita();
  } else if(type==='program'){
    const kode=document.getElementById('mf-kode').value.trim();
    const judul=document.getElementById('mf-judul').value.trim();
    if(!judul){toast('Judul program wajib diisi!','error');return;}
    const item={id:isEdit?modalId:Date.now(),kode,judul,poin:document.getElementById('mf-poin').value};
    let arr=DB.program;
    if(isEdit){const i=arr.findIndex(x=>x.id===modalId);if(i>=0)arr[i]=item;}else arr.push(item);
    DB.program=arr;
    renderTableProgram();
  } else if(type==='publikasi'){
    const judul=document.getElementById('mf-judul').value.trim();
    if(!judul){toast('Judul dokumen wajib diisi!','error');return;}
    const item={id:isEdit?modalId:Date.now(),judul,tipe:document.getElementById('mf-tipe').value,tahun:document.getElementById('mf-tahun').value,warna:document.getElementById('mf-warna').value};
    let arr=DB.publikasi;
    if(isEdit){const i=arr.findIndex(x=>x.id===modalId);if(i>=0)arr[i]=item;}else arr.push(item);
    DB.publikasi=arr;
    renderTablePub();
  } else if(type==='mitra'){
    const nama=document.getElementById('mf-nama').value.trim();
    if(!nama){toast('Nama mitra wajib diisi!','error');return;}
    let arr=DB.mitra;
    if(isEdit)arr[modalId]=nama;else arr.push(nama);
    DB.mitra=arr;
    renderTableMitra();
  }
  updateBadges();
  document.getElementById('modal-overlay').classList.add('hidden');
  toast((isEdit?'Data berhasil diperbarui!':'Data berhasil ditambahkan!'));
}

// ══════════════════════════════════════
// DELETE
// ══════════════════════════════════════
let _delType='',_delId=null;
function confirmDelete(type,id){
  _delType=type;_delId=id;
  document.getElementById('confirm-text').textContent='Yakin ingin menghapus item ini? Tindakan tidak dapat dibatalkan.';
  document.getElementById('confirm-overlay').classList.remove('hidden');
  document.getElementById('confirm-btn').onclick=()=>{execDelete(_delType,_delId);document.getElementById('confirm-overlay').classList.add('hidden');};
}
function execDelete(type,id){
  if(type==='mitra'){const arr=DB.mitra;arr.splice(id,1);DB.mitra=arr;renderTableMitra();}
  else{let arr=DB[type];arr=arr.filter(x=>x.id!==id);DB[type]=arr;if(type==='berita')renderTableBerita();else if(type==='program')renderTableProgram();else if(type==='publikasi')renderTablePub();}
  updateBadges();toast('Item berhasil dihapus!','error');
}

// ══════════════════════════════════════
// PASSWORD CHANGE
// ══════════════════════════════════════
function changePassword(){
  const old=document.getElementById('pw-old').value;
  const nw=document.getElementById('pw-new').value;
  const cfm=document.getElementById('pw-cfm').value;
  const cur=load('password')||DEF.password;
  if(old!==cur){toast('Password lama salah!','error');return;}
  if(nw.length<6){toast('Password minimal 6 karakter!','error');return;}
  if(nw!==cfm){toast('Konfirmasi password tidak cocok!','error');return;}
  save('password',nw);
  document.getElementById('pw-old').value='';document.getElementById('pw-new').value='';document.getElementById('pw-cfm').value='';
  toast('Password berhasil diubah!');
}

// ══════════════════════════════════════
// DONASI
// ══════════════════════════════════════
function fmtRp(n){return'Rp '+n.toLocaleString('id-ID')}
function setDon(val,btn){document.getElementById('don-amount').value=val;document.querySelectorAll('.nom-grid .nb').forEach(b=>b.classList.remove('active'));btn.classList.add('active');updateDonTotal();}
function updateDonTotal(){const v=parseInt(document.getElementById('don-amount').value)||0;document.getElementById('don-total').textContent=fmtRp(v);document.querySelectorAll('.nom-grid .nb').forEach(b=>b.classList.remove('active'));}
function submitDonasi(){
  const amount=parseInt(document.getElementById('don-amount').value)||0;
  const pay=document.querySelector('input[name="pay"]:checked');
  const nm=document.getElementById('d-nm').value.trim();
  const em=document.getElementById('d-em').value.trim();
  const ph=document.getElementById('d-ph').value.trim();
  if(amount<10000){alert('Nominal donasi minimal Rp 10.000');return;}
  if(!pay){alert('Silakan pilih metode pembayaran');return;}
  if(!nm||!em||!ph){alert('Mohon lengkapi data profil donatur');return;}
  alert('Terima kasih, '+nm+'!\nDonasi sebesar '+fmtRp(amount)+' via '+pay.value.toUpperCase()+' sedang diproses.\nKami akan menghubungi Anda di '+em+'.');
}

// ══════════════════════════════════════
// HELPERS
// ══════════════════════════════════════
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function v(cur,val){return cur===val?'selected':'';}
let _toastT=null;
function toast(msg,type='success'){
  const el=document.getElementById('toast');
  el.textContent=msg;el.className='toast'+(type==='error'?' error':'');
  clearTimeout(_toastT);
  _toastT=setTimeout(()=>el.classList.add('hidden'),3000);
}
window.addEventListener('scroll',()=>{
  const nb=document.getElementById('navbar');
  if(nb)nb.style.borderBottomColor=window.scrollY>30?'rgba(155,29,32,.55)':'rgba(155,29,32,.35)';
});


// ══════════════════════════════════════
// MULTI-PAGE INIT
// ══════════════════════════════════════
function initPage() {
  const page = document.body.dataset.page;
  // initData() is called in data.js automatically
  if (page === 'beranda')   { renderBeranda(); }
  if (page === 'tentang')   { /* nothing dynamic needed */ }
  if (page === 'program')   { renderProgFull(); }
  if (page === 'berita')    { renderBeritaFull(); }
  if (page === 'publikasi') { renderPubFull(); }
  if (page === 'kontak')    { renderBeranda(); }
  if (page === 'admin')     { showPanel('dashboard'); }
}

window.addEventListener('DOMContentLoaded', initPage);
