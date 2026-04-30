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
