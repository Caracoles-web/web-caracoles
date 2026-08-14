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

    // Al cambiar ES ↔ EN desde la cortina móvil, la página de destino
    // recupera el menú abierto para que el usuario pueda seguir navegando.
    side.querySelectorAll('.languages a').forEach(a=>{
      a.addEventListener('click',()=>{
        if(window.matchMedia('(max-width: 820px)').matches && side.classList.contains('open')){
          try{sessionStorage.setItem('caracoles-language-menu-open','1');}catch(e){}
        }
      });
    });
    side.querySelectorAll('a').forEach(a=>{if(!a.closest('.languages'))a.addEventListener('click',closeMenu);});

    let reopenAfterLanguageChange=false;
    try{
      reopenAfterLanguageChange=sessionStorage.getItem('caracoles-language-menu-open')==='1';
      sessionStorage.removeItem('caracoles-language-menu-open');
    }catch(e){}
    if(reopenAfterLanguageChange && window.matchMedia('(max-width: 820px)').matches){
      openMenu();
    }
    // Retira el estado previo al primer pintado una vez que el menú real ya
    // está abierto. Así ES ↔ EN cambia el texto sin cerrar/reabrir la cortina.
    document.documentElement.classList.remove('language-menu-pending');

    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&side.classList.contains('open'))closeMenu();});
  }
  const existingPhoneButton=document.querySelector('.floating-phone-btn');
  if(!existingPhoneButton){
    const callButton=document.createElement('a');
    callButton.className='floating-phone-btn';
    callButton.href='tel:+34947170563';
    callButton.setAttribute('aria-label',document.documentElement.lang==='en'?'Call the restaurant':'Llamar al restaurante');
    callButton.innerHTML=`<svg viewBox="54.321 59.12 201.396 191.463" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill="currentColor" d="M190.133,250.583c-27.383,0-58.9-13.95-87.317-39.267c-33.067-29.45-51.667-67.167-48.05-97.65c1.033-7.75,6.717-45.983,31.517-53.217C117.8,52.183,127.1,84.733,130.2,95.583c3.1,10.85,8.267,29.45-2.583,41.85l0,0c-3.1,3.617-7.233,5.683-11.367,7.233c4.65,11.367,12.4,21.183,22.217,28.417c8.267,8.783,19.117,15.5,30.483,19.117v-0.517c0.517-4.65,2.583-8.783,5.683-12.4c11.367-12.4,31-8.783,41.333-7.233c10.333,1.55,29.45,4.65,36.683,19.633l0,0c3.1,6.2,3.617,12.917,2.583,19.633c-5.683,26.35-44.95,36.167-49.083,37.2C200.983,249.55,195.817,250.583,190.133,250.583L190.133,250.583z M96.1,73.883L96.1,73.883c-2.067,0-4.133,0.517-6.2,1.033c-13.433,3.617-19.633,27.9-21.183,40.3c-3.1,25.833,13.95,58.383,43.917,85.25s64.067,39.783,89.383,34.1c9.817-2.067,35.133-10.85,37.717-25.317l0,0c0.517-3.617,0.517-7.233-1.033-10.333c-4.133-8.267-16.017-9.817-25.833-11.883c-7.75-1.033-22.217-3.617-28.417,2.583l0,0c-1.033,1.55-2.067,3.1-2.067,5.167c-0.517,4.133-2.583,7.75-5.683,9.817c-13.95,9.3-39.267-10.85-49.083-20.15c-9.817-9.3-33.067-32.033-25.317-47.017c2.067-3.617,5.683-6.2,9.817-6.717c2.067-0.517,3.617-1.033,4.65-2.583c5.683-6.717,1.55-20.667,0-28.417C110.567,80.083,103.85,73.883,96.1,73.883L96.1,73.883z"/></svg>`;
    document.body.appendChild(callButton);
  }

  // En la cortina móvil repetimos el acceso directo al teléfono, centrado
  // entre la navegación principal y el selector ES/EN.
  if(side && !side.querySelector('.menu-phone-btn')){
    const menuCallButton=document.createElement('a');
    menuCallButton.className='menu-phone-btn';
    menuCallButton.href='tel:+34947170563';
    menuCallButton.setAttribute('aria-label',document.documentElement.lang==='en'?'Call the restaurant':'Llamar al restaurante');
    const floatingPhone=document.querySelector('.floating-phone-btn');
    if(floatingPhone) menuCallButton.innerHTML=floatingPhone.innerHTML;
    const sidebarBottom=side.querySelector('.sidebar-bottom');
    if(sidebarBottom) side.insertBefore(menuCallButton,sidebarBottom);
  }

  document.querySelectorAll('[data-wine-slider]').forEach(slider=>{
    const slides=[...slider.querySelectorAll('.wine-slide')];
    if(slides.length<2)return;
    let i=0;
    const show=n=>{i=(n+slides.length)%slides.length;slides.forEach((slide,j)=>slide.classList.toggle('active',j===i));};
    show(0);
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){setInterval(()=>show(i+1),5200);}
  });
  // Sliders de galería: permiten una duración base por bloque y una duración
  // especial para la primera foto en móvil. En desktop se desfasan 1 s para
  // evitar que dos paneles visibles cambien casi simultáneamente.
  document.querySelectorAll('img[data-mobile-lazy-src]').forEach(img=>{
    const src=img.dataset.mobileLazySrc;
    if(!src)return;
    if(!window.matchMedia('(max-width: 820px)').matches){
      img.src=src;
      return;
    }
    const load=()=>{if(!img.getAttribute('src'))img.src=src;};
    const target=img.closest('[data-gallery-slider]')||img;
    if('IntersectionObserver' in window){
      const observer=new IntersectionObserver(entries=>{
        if(entries.some(entry=>entry.isIntersecting)){load();observer.disconnect();}
      },{rootMargin:'500px 0px'});
      observer.observe(target);
    }else{
      load();
    }
  });

  document.querySelectorAll('[data-gallery-slider]').forEach((slider,sliderIndex)=>{
    const slides=[...slider.querySelectorAll('.gallery-slide')];
    if(slides.length<2)return;
    let i=0;
    let timer;
    const baseDelay=Number(slider.dataset.galleryDelay)||5200;
    const mobileFirstDelay=Number(slider.dataset.mobileFirstDelay)||0;
    const isMobile=()=>window.matchMedia('(max-width: 820px)').matches;
    const show=n=>{i=(n+slides.length)%slides.length;slides.forEach((slide,j)=>slide.classList.toggle('active',j===i));};
    const currentDelay=()=>mobileFirstDelay&&isMobile()&&i===0?mobileFirstDelay:baseDelay;
    const scheduleNext=()=>{
      timer=setTimeout(()=>{show(i+1);scheduleNext();},currentDelay());
    };
    show(0);
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      const phaseOffset=isMobile()?0:sliderIndex*1000;
      if(phaseOffset){timer=setTimeout(scheduleNext,phaseOffset);}
      else{scheduleNext();}
    }
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
