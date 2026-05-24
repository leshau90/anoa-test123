/* ================================================================
   JEJAK ANOA — Shared interactions
   ================================================================ */
(() => {
  // -- nav scrolled state ----------------------------------------
  const nav = document.getElementById('topNav');
  if (nav){
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // -- decorative hoof trail ------------------------------------
  document.querySelectorAll('[data-hoof-trail]').forEach(host => {
    const steps = parseInt(host.dataset.hoofTrail,10) || 12;
    for (let i=0; i<steps; i++){
      const t = i/(steps-1);
      const x = 4 + t*88 + Math.sin(t*Math.PI*1.4)*4;
      const y = 88 - t*70 + Math.cos(t*Math.PI*2.2)*2.5;
      const rot = (i%2===0?-12:12) + (Math.random()*8-4);
      const el = document.createElement('div');
      el.className = 'hp';
      el.style.left = x + '%';
      el.style.top = y + '%';
      el.style.setProperty('--r', rot + 'deg');
      el.style.setProperty('--d', (0.3 + i*0.07) + 's');
      el.innerHTML = `<svg viewBox="0 0 24 30"><path d="M5 4c2-2 5-2 5 2 0 4-1 9-2 13s-3 6-4 6-2-2-2-5 1-13 3-16z"/><path d="M19 4c-2-2-5-2-5 2 0 4 1 9 2 13s3 6 4 6 2-2 2-5-1-13-3-16z"/></svg>`;
      host.appendChild(el);
    }
  });

  // -- marquee content -------------------------------------------
  const mq = document.querySelector('[data-marquee]');
  if (mq){
    const phrases = (mq.dataset.marquee || 'Alam Lestari|Kearifan Nusantara|Anoa · Bubalus depressicornis|Endemik Sulawesi|Konservasi · Komunitas|Sejak 2023').split('|');
    const hoofSvg = '<svg class="hoof" viewBox="0 0 24 30" fill="currentColor"><path d="M5 4c2-2 5-2 5 2 0 4-1 9-2 13s-3 6-4 6-2-2-2-5 1-13 3-16z"/><path d="M19 4c-2-2-5-2-5 2 0 4 1 9 2 13s3 6 4 6 2-2 2-5-1-13-3-16z"/></svg>';
    let html='';
    for (let g=0; g<2; g++){
      phrases.forEach((p,i) => {
        html += `<div class="marquee-item">${p}<span class="dot"></span></div>`;
        if ((i+1)%3===0) html += `<div class="marquee-item" style="color:var(--leaf)">${hoofSvg}</div>`;
      });
    }
    const track = document.createElement('div');
    track.className = 'marquee-track';
    track.innerHTML = html;
    mq.appendChild(track);
  }

  // -- reveal on scroll ------------------------------------------
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e => {
        if (e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  // -- counter animation ----------------------------------------
  const formatNum = (n) => Math.round(n).toLocaleString('id-ID');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;
    const dur = 1400;
    const start = performance.now();
    const suffix = el.querySelector('.pct,.unit');
    const suffixHTML = suffix ? suffix.outerHTML : '';
    const ease = (t) => 1 - Math.pow(1-t, 3);
    const tick = (now) => {
      const t = Math.min(1, (now-start)/dur);
      el.innerHTML = formatNum(target * ease(t)) + suffixHTML;
      if (t<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window){
    const cio = new IntersectionObserver((entries)=>{
      entries.forEach(e => {
        if (e.isIntersecting){
          animateCount(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold:.5 });
    document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));
  }

  // -- magnetic buttons -----------------------------------------
  if (window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.btn-mag, .donate-btn, .nav-btn, [data-magnet]').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        btn.style.transform = `translate(${x*0.18}px, ${y*0.22}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  // -- subtle parallax for any [data-parallax] within hero ------
  document.querySelectorAll('[data-parallax-host]').forEach(host => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const target = host.querySelector('[data-parallax]');
    if (!target) return;
    host.addEventListener('mousemove', (e) => {
      const r = host.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - .5;
      const y = (e.clientY - r.top)/r.height - .5;
      target.style.transform = `translate(${x*-14}px, ${y*-10}px)`;
    });
  });
})();
