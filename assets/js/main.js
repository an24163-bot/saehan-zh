/* Saehan Nanotech EN — main.js */
(function(){
  'use strict';

  /* Nav hamburger */
  var btn = document.querySelector('.snt-nav__hamburger');
  var mob = document.querySelector('.snt-nav__mobile');
  if(btn && mob){
    if(!mob.id) mob.id = 'snt-nav-mobile';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', mob.id);
    btn.addEventListener('click', function(){
      var o = mob.classList.toggle('open');
      btn.classList.toggle('open', o);
      btn.setAttribute('aria-expanded', o ? 'true' : 'false');
      document.body.style.overflow = o ? 'hidden' : '';
    });
  }

  /* Active nav link */
  var cur = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.snt-nav__dropdown a, .snt-mobile-link').forEach(function(a){
    var h = (a.getAttribute('href')||'').split('/').pop();
    if(h === cur) a.classList.add('snt-current');
  });

  var hasIO = ('IntersectionObserver' in window);
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* IntersectionObserver reveal */
  var revealTargets = document.querySelectorAll('[data-snt-reveal]');
  if(!hasIO){
    revealTargets.forEach(function(el){ el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function(el){ io.observe(el); });
  }

  /* Scroll progress bar */
  (function(){
    var bar = document.createElement('div');
    bar.className = 'snt-scroll-progress';
    document.body.appendChild(bar);
    var ticking = false;
    function update(){
      var doc = document.documentElement;
      var max = (doc.scrollHeight - doc.clientHeight) || 1;
      var pct = Math.max(0, Math.min(1, (window.scrollY || window.pageYOffset || 0) / max));
      bar.style.transform = 'scaleX(' + pct + ')';
      ticking = false;
    }
    function onScroll(){
      if(!ticking){ window.requestAnimationFrame(update); ticking = true; }
    }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  })();

  /* Number counter animation (data-counter="N") */
  (function(){
    var els = document.querySelectorAll('[data-counter]');
    if(!els.length) return;

    function animate(el){
      var target = parseInt(el.getAttribute('data-counter'), 10) || 0;
      if(prefersReducedMotion){ el.textContent = target; return; }
      var duration = 1400;
      var start = null;
      function step(ts){
        if(start === null) start = ts;
        var p = Math.min(1, (ts - start) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(target * eased);
        el.textContent = val;
        if(p < 1) window.requestAnimationFrame(step);
        else el.textContent = target;
      }
      window.requestAnimationFrame(step);
    }

    if(!hasIO){
      els.forEach(animate);
      return;
    }
    var ioCounter = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          animate(e.target);
          ioCounter.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    els.forEach(function(el){ ioCounter.observe(el); });
  })();

  /* Language picker dropdown */
  (function(){
    var pickers = document.querySelectorAll('.snt-nav__lang-picker');
    pickers.forEach(function(p){
      var btn = p.querySelector('.snt-nav__lang-btn');
      if(!btn) return;
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var willOpen = !p.classList.contains('is-open');
        // Close all other pickers
        pickers.forEach(function(x){ x.classList.remove('is-open'); });
        if(willOpen){
          p.classList.add('is-open');
          btn.setAttribute('aria-expanded','true');
        } else {
          btn.setAttribute('aria-expanded','false');
        }
      });
    });
    document.addEventListener('click', function(e){
      pickers.forEach(function(p){
        if(!p.contains(e.target)){
          p.classList.remove('is-open');
          var b = p.querySelector('.snt-nav__lang-btn');
          if(b) b.setAttribute('aria-expanded','false');
        }
      });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        pickers.forEach(function(p){
          p.classList.remove('is-open');
          var b = p.querySelector('.snt-nav__lang-btn');
          if(b) b.setAttribute('aria-expanded','false');
        });
      }
    });
  })();

})();

/* snt-rfq-v1 */
(function(){
  document.querySelectorAll('form[data-rfq]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]');
      var feedback = form.querySelector('.snt-rfq__feedback');
      if (!btn || !feedback) return;
      btn.disabled = true;
      btn.textContent = btn.getAttribute('data-sending') || 'Sending...';
      feedback.className = 'snt-rfq__feedback';
      var data = new FormData(form);
      fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
        .then(function(res){
          if (res.ok) {
            feedback.textContent = feedback.getAttribute('data-success-text');
            feedback.className = 'snt-rfq__feedback is-success';
            // GA4 conversion event
            if (window.gtag) {
              gtag('event', 'generate_lead', {
                form_id: form.id || 'rfq',
                source_page: location.pathname,
                source_lang: document.documentElement.lang || 'unknown'
              });
            }
            form.reset();
          } else {
            throw new Error('http ' + res.status);
          }
        })
        .catch(function(){
          feedback.textContent = feedback.getAttribute('data-error-text');
          feedback.className = 'snt-rfq__feedback is-error';
        })
        .finally(function(){
          btn.disabled = false;
          btn.textContent = btn.getAttribute('data-default') || 'Send';
        });
    });
  });
})();

/* snt-ga4-events-v1 */
(function(){
  if (typeof window === 'undefined') return;
  function fire(name, params){
    try { if (window.gtag) gtag('event', name, params || {}); } catch(e){}
  }
  // Phone clicks (tel:)
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (a) fire('click_phone', { phone: a.getAttribute('href').replace('tel:',''), source: location.pathname });
  });
  // Email clicks (mailto:)
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href^="mailto:"]');
    if (a) fire('click_email', { email: a.getAttribute('href').replace('mailto:',''), source: location.pathname });
  });
  // CTA clicks (.snt-nav__cta and hero CTAs)
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('.snt-nav__cta, .idx-hero__cta, .snt-hero__cta');
    if (a) fire('click_cta', { cta_text: (a.textContent || '').trim().slice(0, 40), source: location.pathname });
  });
  // Language switcher clicks
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('.snt-nav__lang-item, .snt-mobile-lang__item, .snt-ft-clean__links a');
    if (a) {
      var href = a.getAttribute('href') || '';
      var m = href.match(/https?:\/\/([^.\/]+)\.saehannanotech\.com/);
      var target = m ? m[1] : (href.indexOf('saehannanotech.com') > -1 ? 'ko' : 'unknown');
      fire('click_lang_switch', { from: document.documentElement.lang || 'unknown', to: target });
    }
  });
  // Scroll depth 75% (high-intent)
  var scrolled75 = false;
  window.addEventListener('scroll', function(){
    if (scrolled75) return;
    var h = document.documentElement;
    var pct = (window.scrollY + window.innerHeight) / h.scrollHeight;
    if (pct >= 0.75) {
      scrolled75 = true;
      fire('scroll_75', { source: location.pathname });
    }
  }, { passive: true });
})();
