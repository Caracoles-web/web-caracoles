(()=>{
  const btn=document.querySelector('.mobile-menu-btn');
  const side=document.querySelector('.sidebar');
  if(btn&&side){
    const closeMenu=()=>{
      side.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label',document.documentElement.lang==='en'?'Open menu':'Abrir menú');
      btn.textContent='☰';
      document.body.classList.remove('mobile-menu-open');
    };
    const openMenu=()=>{
      side.classList.add('open');
      btn.setAttribute('aria-expanded','true');
      btn.setAttribute('aria-label',document.documentElement.lang==='en'?'Close menu':'Cerrar menú');
      btn.textContent='×';
      document.body.classList.add('mobile-menu-open');
    };
    btn.addEventListener('click',()=>side.classList.contains('open')?closeMenu():openMenu());
    side.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&side.classList.contains('open'))closeMenu();});
  }
  document.querySelectorAll('[data-wine-slider]').forEach(slider=>{
    const slides=[...slider.querySelectorAll('.wine-slide')];
    if(slides.length<2)return;
    let i=0;
    const show=n=>{i=(n+slides.length)%slides.length;slides.forEach((slide,j)=>slide.classList.toggle('active',j===i));};
    show(0);
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){setInterval(()=>show(i+1),5200);}
  });
  document.querySelectorAll('[data-gallery-slider]').forEach((slider,sliderIndex)=>{
    const slides=[...slider.querySelectorAll('.gallery-slide')];
    if(slides.length<2)return;
    let i=0;
    const delay=Number(slider.dataset.galleryDelay)||5200;
    const show=n=>{i=(n+slides.length)%slides.length;slides.forEach((slide,j)=>slide.classList.toggle('active',j===i));};
    show(0);
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){setTimeout(()=>setInterval(()=>show(i+1),delay),sliderIndex*450);}
  });

  document.querySelectorAll('[data-event-slider]').forEach((slider,sliderIndex)=>{
    const slides=[...slider.querySelectorAll('.eventos-slide')];
    if(slides.length<2)return;
    let i=0;
    const delay=Number(slider.dataset.eventDelay)||5200;
    const show=n=>{i=(n+slides.length)%slides.length;slides.forEach((slide,j)=>slide.classList.toggle('active',j===i));};
    show(0);
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){setTimeout(()=>setInterval(()=>show(i+1),delay),sliderIndex*650);}
  });
  const slider=document.querySelector('[data-slider]');
  if(slider){
    const slides=[...slider.querySelectorAll('.slide')];
    const dots=[...slider.querySelectorAll('.slider-dots button')];
    let i=0,t;
    const show=n=>{i=(n+slides.length)%slides.length;slides.forEach((s,j)=>s.classList.toggle('active',j===i));dots.forEach((d,j)=>d.classList.toggle('active',j===i));};
    const start=()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;t=setInterval(()=>show(i+1),5200)};
    dots.forEach((d,j)=>d.addEventListener('click',()=>{clearInterval(t);show(j);start()}));
    show(0);start();
  }


  // Vídeo común: la portada es local y el iframe de YouTube-nocookie sólo nace tras el clic.
  document.querySelectorAll('.video-poster[data-youtube-id]').forEach(button=>{
    button.addEventListener('click',()=>{
      const id=button.dataset.youtubeId;
      if(!id)return;
      const wrap=document.createElement('div');
      wrap.className='youtube-frame-wrap';
      const iframe=document.createElement('iframe');
      iframe.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
      iframe.title=button.getAttribute('aria-label')||'YouTube video';
      iframe.loading='lazy';
      iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy='strict-origin-when-cross-origin';
      iframe.allowFullscreen=true;
      wrap.appendChild(iframe);
      button.replaceWith(wrap);
    },{once:true});
  });

})();
