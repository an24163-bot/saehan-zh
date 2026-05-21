// snt-fab-v1
(function(){
  if (document.getElementById('snt-fab')) return;
  var css = '<style>' +
    '.snt-fab{position:fixed;right:16px;bottom:30px;z-index:9998;display:flex;flex-direction:column;gap:10px;font-family:Pretendard,"Noto Sans KR",-apple-system,sans-serif;}' +
    '.snt-fab__btn{display:flex;align-items:center;justify-content:center;width:54px;height:54px;border-radius:50%;cursor:pointer;color:#fff;text-decoration:none;box-shadow:0 4px 16px rgba(0,0,0,.2);transition:transform .25s,box-shadow .25s;border:none;outline:none;position:relative;}' +
    '.snt-fab__btn:hover{transform:scale(1.08);box-shadow:0 6px 22px rgba(0,0,0,.28);}' +
    '.snt-fab__btn--whatsapp{background:#25D366;}' +
    '.snt-fab__btn--wechat{background:#07C160;}' +
    '.snt-fab__btn svg{width:28px;height:28px;}' +
    '.snt-fab__tip{position:absolute;right:64px;top:50%;transform:translateY(-50%);background:#0f1a33;color:#fff;font-size:12px;font-weight:600;padding:6px 12px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s;}' +
    '.snt-fab__btn:hover .snt-fab__tip{opacity:1;}' +
    '.snt-fab__tip::after{content:"";position:absolute;left:100%;top:50%;transform:translateY(-50%);border:5px solid transparent;border-left-color:#0f1a33;}' +
    '@media(max-width:480px){.snt-fab{right:12px;bottom:20px;}.snt-fab__btn{width:48px;height:48px;}.snt-fab__btn svg{width:24px;height:24px;}.snt-fab__tip{display:none;}}' +
    '.snt-wcm{position:fixed;inset:0;background:rgba(15,26,51,.65);z-index:9999;display:none;align-items:center;justify-content:center;padding:20px;}' +
    '.snt-wcm.is-open{display:flex;}' +
    '.snt-wcm__box{background:#fff;border-radius:14px;padding:28px 24px;max-width:340px;width:100%;text-align:center;position:relative;font-family:Pretendard,sans-serif;}' +
    '.snt-wcm__close{position:absolute;top:10px;right:14px;background:none;border:none;font-size:24px;color:#6a7589;cursor:pointer;}' +
    '.snt-wcm__title{font-size:18px;font-weight:800;color:#0f1a33;margin:0 0 8px;}' +
    '.snt-wcm__desc{font-size:13.5px;color:#6a7589;margin:0 0 18px;line-height:1.55;}' +
    '.snt-wcm__qr{width:200px;height:200px;background:#f5f7fb;border:1px solid #e6e9f0;border-radius:8px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:#a8b5cf;font-size:11px;overflow:hidden;}' +
    '.snt-wcm__qr img{width:100%;height:100%;object-fit:contain;border-radius:8px;}' +
    '.snt-wcm__id{display:inline-block;background:#f5f7fb;padding:8px 16px;border-radius:8px;font-size:14px;font-weight:700;color:#004ea1;letter-spacing:0.5px;}' +
    '</style>';

  var WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.7-3.2-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5-.2 0-.4 0-.7 0-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8 0 1.7 1.2 3.3 1.4 3.5.2.2 2.4 3.7 5.9 5.2 2.8 1.2 3.4 1 4 .9.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.2-.6-.4z"/><path d="M20.5 3.5C18.3 1.2 15.3 0 12 0 5.4 0 0 5.4 0 12c0 2.1.5 4.2 1.6 6L0 24l6.2-1.6c1.7.9 3.7 1.5 5.8 1.5h.1c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.6-8.4zM12 22h-.1c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-3.9 1 1-3.8-.2-.4C2 15.5 1.5 13.7 1.5 11.9 1.5 6.1 6.2 1.4 12 1.4c2.8 0 5.4 1.1 7.3 3 1.9 1.9 3 4.5 3 7.3 0 5.7-4.6 10.3-10.3 10.3z"/></svg>';
  var WC_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 4C5.36 4 2 6.91 2 10.5c0 1.93.97 3.66 2.5 4.87L4 18l2.92-1.51c.78.2 1.61.31 2.46.31.16 0 .31 0 .47-.02-.13-.43-.21-.88-.21-1.35 0-3.21 2.99-5.81 6.69-5.81.22 0 .43.01.64.03C16.31 6.27 13.21 4 9.5 4zM7 9.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/><path d="M22 15.5C22 12.85 19.31 10.7 16 10.7s-6 2.15-6 4.8c0 2.65 2.69 4.8 6 4.8.69 0 1.36-.09 1.99-.27L20.5 21l-.5-2.13C21.27 18.06 22 16.85 22 15.5zm-8-.8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75zm4 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z"/></svg>';

  var html = css +
    '<div id="snt-fab" class="snt-fab" role="region" aria-label="Quick contact">' +
      '<a class="snt-fab__btn snt-fab__btn--whatsapp" href="https://wa.me/821033983328" target="_blank" rel="noopener" aria-label="WhatsApp" onclick="if(window.gtag)gtag(\'event\',\'cta_whatsapp_click\',{event_category:\'engagement\'});">' +
        WA_SVG + '<span class="snt-fab__tip">WhatsApp</span>' +
      '</a>' +
      '<button class="snt-fab__btn snt-fab__btn--wechat" type="button" aria-label="微信" onclick="document.getElementById(\'snt-wechat-modal\').classList.add(\'is-open\');if(window.gtag)gtag(\'event\',\'cta_wechat_click\',{event_category:\'engagement\'});">' +
        WC_SVG + '<span class="snt-fab__tip">微信</span>' +
      '</button>' +
    '</div>' +
    '<div id="snt-wechat-modal" class="snt-wcm" role="dialog" aria-label="微信联系" onclick="if(event.target===this)this.classList.remove(\'is-open\');">' +
      '<div class="snt-wcm__box">' +
        '<button class="snt-wcm__close" onclick="document.getElementById(\'snt-wechat-modal\').classList.remove(\'is-open\');" aria-label="关闭">×</button>' +
        '<h3 class="snt-wcm__title">微信联系</h3>' +
        '<p class="snt-wcm__desc">扫描二维码或搜索我们的微信号:</p>' +
        '<div class="snt-wcm__qr"><img src="images/wechat-qr.png" alt="WeChat QR" onerror="this.style.display=\'none\';this.parentNode.textContent=\'QR coming soon\';"></div>' +
        '<div class="snt-wcm__id">saehannanotech</div>' +
      '</div>' +
    '</div>';

  var box = document.createElement('div');
  box.innerHTML = html;
  while (box.firstChild) document.body.appendChild(box.firstChild);
})();
