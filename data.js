// ══════════════════════════════════════
// DATA STORE (localStorage)
// ══════════════════════════════════════
const DEF = {
  berita:[
    {id:1,judul:'Penanaman 548 Pohon MPTS di Hulu Sub DAS Ciampea',kategori:'Kabar YKL',tanggal:'15 Maret 2026',ringkasan:'Penanaman pohon durian dan alpukat dengan sistem geotagging di Kabupaten Bogor bersama masyarakat Desa Benteng, Ciampea.',status:'published',warna:'nt1'},
    {id:2,judul:'Jejak Anoa di Suaka Margasatwa Buton Utara',kategori:'Liputan Media',tanggal:'2 Maret 2026',ringkasan:'Inisiasi konservasi Anoa di kawasan Suaka Margasatwa Buton Utara bersama BKSDA Sulawesi Tenggara.',status:'published',warna:'nt2'},
    {id:3,judul:'Rehabilitasi Mangrove Berbasis Masyarakat di Buton Utara',kategori:'Artikel',tanggal:'18 Februari 2026',ringkasan:'Kolaborasi dengan KTH dan Pemerintah Desa di enam desa untuk inisiasi rehabilitasi mangrove.',status:'published',warna:'nt3'},
    {id:4,judul:'Kolaborasi Program Bersama PILI Indonesia',kategori:'Kabar YKL',tanggal:'10 Februari 2026',ringkasan:'Penandatanganan dokumen kolaborasi program antara PILI dan Yayasan Jejak Anoa Indonesia.',status:'published',warna:'nt4'},
    {id:5,judul:'Workshop Agroforestri Bersama Petani Desa Benteng',kategori:'Acara',tanggal:'28 Januari 2026',ringkasan:'Diskusi dan pelatihan teknik agroforestri berbasis kemitraan masyarakat di Kabupaten Bogor.',status:'published',warna:'nt5'},
    {id:6,judul:'Pemodelan Distribusi Spesies Anoa di Sulawesi Tenggara',kategori:'Artikel',tanggal:'15 Januari 2026',ringkasan:'Laporan hasil penelitian keanekaragaman hayati dan pemodelan distribusi spesies endemik Sulawesi.',status:'published',warna:'nt6'},
  ],
  program:[
    {id:1,kode:'A',judul:'Pelestarian Lingkungan Hidup',poin:'Pendidikan lingkungan\nPenghijauan dan penanaman pohon\nRehabilitasi lahan\nKonservasi tanah dan air\nKonservasi keanekaragaman hayati'},
    {id:2,kode:'B',judul:'Pemberdayaan Sosial & Masyarakat',poin:'Pendampingan dan pelatihan masyarakat\nPengembangan mata pencaharian berkelanjutan\nFasilitasi kemitraan sosial dan lingkungan'},
    {id:3,kode:'C',judul:'Pendidikan & Penelitian',poin:'Penelitian di bidang ilmu pengetahuan dan lingkungan hidup\nPendidikan formal dan nonformal\nStudi banding dan pengembangan kapasitas masyarakat'},
    {id:4,kode:'D',judul:'Kegiatan Kemanusiaan',poin:'Bantuan sosial bagi masyarakat terdampak bencana\nKegiatan kemanusiaan sesuai tujuan yayasan'},
  ],
  publikasi:[
    {id:1,judul:'Pemodelan Distribusi Spesies Anoa Sulawesi Tenggara',tipe:'Laporan Riset',tahun:'2025',warna:'pc1'},
    {id:2,judul:'Panduan Penanaman MPTS dengan Sistem Geotagging',tipe:'Panduan Teknis',tahun:'2025',warna:'pc2'},
    {id:3,judul:'Rekomendasi Konservasi Anoa di SM Buton Utara',tipe:'Policy Brief',tahun:'2025',warna:'pc3'},
    {id:4,judul:'Laporan Tahunan Yayasan Jejak Anoa Indonesia 2024',tipe:'Laporan Program',tahun:'2024',warna:'pc4'},
    {id:5,judul:'Rehabilitasi Mangrove Berbasis Masyarakat di Buton Utara',tipe:'Studi Kasus',tahun:'2024',warna:'pc1'},
    {id:6,judul:'Modul Agroforestri & Rehabilitasi Lahan Masyarakat',tipe:'Modul Pelatihan',tahun:'2024',warna:'pc2'},
    {id:7,judul:'Keanekaragaman Hayati Sub DAS Ciampea, Kab. Bogor',tipe:'Laporan Riset',tahun:'2023',warna:'pc3'},
    {id:8,judul:'Profil Lembaga Yayasan Jejak Anoa Indonesia',tipe:'Dokumentasi',tahun:'2026',warna:'pc4'},
  ],
  mitra:['BKSDA Sultra','KPH Peropae\'a','PILI Indonesia','IPB University','Pemda Buton Utara','KTH Desa Lauki','KTH Desa Pure','GAPOKTAN Benteng','Pemprov Sulawesi','BPDLH Kemenkeu','WWF Indonesia','KEHATI','Yayasan Badak Indonesia'],
  settings:{
    tagline:'Kami berkomitmen mencapai tujuan konservasi alam dan lingkungan, memperkuat upaya adaptasi serta mitigasi perubahan iklim, dan meningkatkan partisipasi aktif masyarakat dalam berbagai aksi konservasi.',
    aboutShort:'Yayasan Jejak Anoa Indonesia merupakan organisasi nirlaba yang bergerak di bidang konservasi lingkungan, pemberdayaan masyarakat, penelitian, dan kegiatan kemanusiaan.',
    aboutLong:'Yayasan Jejak Anoa Indonesia merupakan organisasi nirlaba yang bergerak di bidang konservasi lingkungan, pemberdayaan masyarakat, penelitian, dan kegiatan kemanusiaan. Inisiatif dimulai sejak 2023 dan memperoleh Akta Pendirian pada Januari 2026.',
    visi:'Alam Lestari dan Kearifan Masyarakat Nusantara.',
    misi:'Mendorong pemahaman nilai-nilai konservasi dan kearifan lokal dalam upaya pelestarian lingkungan.\nMengintegrasikan praktik konservasi dan inovasi berbasis kearifan lokal.\nMengembangkan kapasitas masyarakat dalam pengelolaan lingkungan berkelanjutan.\nMenyediakan ruang kolaborasi bersama masyarakat dalam pengelolaan sumber daya alam.\nMelaksanakan aksi mitigasi dan adaptasi terhadap perubahan sosial, budaya, dan lingkungan.',
    statPohon:'548',statMitra:'9+',statAngg:'16',
    alamat:'Perumahan Salak View Blok B No. 11, Ciherang, Dramaga, Bogor, Jawa Barat',
    telp:'+62 812-3424-9652 · +62 853-9429-0401',
    email:'yayasan@jejakanoa.id',
    quote:'«Jejak Anoa berupaya mewujudkan konservasi alam yang bijak dan adil melalui pendekatan holistik berbasis ilmu pengetahuan yang bermanfaat bagi semua.»',
  },
  users:{admin:'jejak2026'},
  password:'jejak2026'
};

function load(k){try{return JSON.parse(localStorage.getItem('ja_'+k))||DEF[k]}catch(e){return DEF[k]}}
function save(k,v){localStorage.setItem('ja_'+k,JSON.stringify(v))}
function initData(){Object.keys(DEF).forEach(k=>{if(!localStorage.getItem('ja_'+k))save(k,DEF[k])})}
initData();

let DB={
  get berita(){return load('berita')},set berita(v){save('berita',v)},
  get program(){return load('program')},set program(v){save('program',v)},
  get publikasi(){return load('publikasi')},set publikasi(v){save('publikasi',v)},
  get mitra(){return load('mitra')},set mitra(v){save('mitra',v)},
  get settings(){return load('settings')},set settings(v){save('settings',v)},
};
