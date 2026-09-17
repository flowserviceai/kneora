(() => {
  const root = () => (document.body.dataset.root || '/').replace(/\/?$/, '/');
  const closeDialog = button => button.closest('dialog')?.close();
  document.addEventListener('click', event => {
    const close = event.target.closest('[data-close]');
    if (close) closeDialog(close);
    const opener = event.target.closest('[data-open]');
    if (opener) document.getElementById(opener.dataset.open)?.showModal();
    const back = event.target.closest('[data-return-purchase]');
    if (back) {
      const product = document.querySelector('kneora-product');
      if (product) { event.preventDefault(); product.querySelector('.offers')?.scrollIntoView({block:'center'}); product.querySelector('input[name="id"]:checked')?.focus({preventScroll:true}); }
    }
  });
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  }));
  async function showCart() {
    const dialog = document.getElementById('CartDrawer');
    if (!dialog) { window.location.assign(document.body.dataset.cartUrl); return; }
    const response = await fetch(`${root()}cart?section_id=cart-drawer-content`, {headers:{Accept:'text/html'}});
    if (!response.ok) throw new Error('Cart unavailable');
    dialog.querySelector('[data-cart-content]').innerHTML = await response.text();
    if (!dialog.open) dialog.showModal();
  }
  document.addEventListener('click', async event => {
    const link = event.target.closest('[data-open-cart]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    try { await showCart(); } catch { window.location.assign(link.href); }
  });
  class KneoraGallery extends HTMLElement {
    connectedCallback() {
      if (this.ready) return;
      this.ready = true;
      this.addEventListener('click', event => {
        const thumb = event.target.closest('[data-show]');
        if (thumb) this.show(thumb.dataset.show);
        const zoom = event.target.closest('[data-zoom]');
        if (zoom) {
          const img = zoom.querySelector('img');
          const dialog = this.querySelector('dialog');
          const full = dialog.querySelector('[data-zoom-image]');
          full.src = img.currentSrc || img.src;
          full.alt = img.alt;
          dialog.showModal();
        }
      });
      this.querySelector('.gallery-thumbs')?.addEventListener('keydown', event => {
        if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
        const thumbs = [...this.querySelectorAll('[data-show]')];
        let index = thumbs.indexOf(document.activeElement);
        if (index < 0) return;
        event.preventDefault();
        index = event.key === 'Home' ? 0 : event.key === 'End' ? thumbs.length-1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + thumbs.length) % thumbs.length;
        this.show(thumbs[index].dataset.show); thumbs[index].focus();
      });
    }
    show(id) {
      if (!this.querySelector(`[data-slide="${id}"]`)) return;
      this.querySelectorAll('[data-slide]').forEach(slide => { const wasVisible = !slide.hidden; slide.hidden = slide.dataset.slide !== String(id); if (slide.hidden && wasVisible) { slide.querySelectorAll('video').forEach(v => v.pause()); slide.querySelectorAll('iframe').forEach(frame => { frame.src = frame.src; }); } });
      this.querySelectorAll('[data-show]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.show === String(id))));
    }
  }
  class KneoraProduct extends HTMLElement {
    connectedCallback() {
      if (this.ready) return;
      this.ready = true;
      this.form = this.querySelector('.product-form');
      this.status = this.querySelector('[data-product-status]');
      this.form?.addEventListener('change', event => { if (event.target.name === 'id') this.select(event.target, true); });
      this.form?.addEventListener('submit', event => this.add(event));
      this.select(this.querySelector('input[name="id"]:checked'), false);
      const mainButton = this.form?.querySelector('[data-add-button]');
      if (mainButton && 'IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(entries => {
          const bar = this.querySelector('.sticky-buy');
          if (bar) bar.hidden = entries[0].isIntersecting || entries[0].boundingClientRect.top > 0;
        });
        this.observer.observe(mainButton);
      }
      this.onPop = () => {
        const id = new URL(window.location.href).searchParams.get('variant');
        const input = [...this.querySelectorAll('input[name="id"]')].find(v => v.value === id);
        if (input) { input.checked = true; this.select(input, false); }
      };
      window.addEventListener('popstate', this.onPop);
    }
    disconnectedCallback() { this.observer?.disconnect(); window.removeEventListener('popstate', this.onPop); }
    select(input, updateURL) {
      if (!input) return;
      this.querySelectorAll('.offer').forEach(offer => offer.classList.toggle('selected', !!offer.querySelector('input:checked')));
      this.querySelectorAll('[data-selected-price],[data-sticky-price]').forEach(el => el.textContent = input.dataset.price);
      this.querySelectorAll('[data-selected-title]').forEach(el => el.textContent = input.dataset.title);
      document.querySelectorAll('[data-final-title]').forEach(el => el.textContent = input.dataset.title);
      document.querySelectorAll('[data-final-price]').forEach(el => el.textContent = input.dataset.price);
      this.querySelectorAll('[data-add-button]').forEach(button => { button.disabled = input.dataset.available !== 'true'; button.textContent = button.disabled ? this.dataset.sold : this.dataset.add; });
      this.querySelector('kneora-gallery')?.show(input.dataset.media);
      if (updateURL) { const url = new URL(window.location.href); url.searchParams.set('variant', input.value); window.history.replaceState({},'',url); if (this.status) this.status.textContent = `${input.dataset.title} — ${input.dataset.price}`; }
    }
    async add(event) {
      event.preventDefault();
      if (this.busy || !this.form.reportValidity()) return;
      const selected = this.querySelector('input[name="id"]:checked');
      if (!selected || selected.dataset.available !== 'true') return;
      this.busy = true;
      this.querySelectorAll('[data-add-button]').forEach(button => {button.disabled = true; button.textContent = this.dataset.adding;});
      this.status.textContent = '';
      try {
        const response = await fetch(`${root()}cart/add.js`, {method:'POST',headers:{Accept:'application/json'},body:new FormData(this.form)});
        const data = await response.json();
        if (!response.ok) throw new Error(data.description || this.dataset.error);
        this.status.textContent = this.dataset.added;
        try {
          const cartResponse = await fetch(`${root()}cart.js`, {headers:{Accept:'application/json'}});
          if (cartResponse.ok) {const cart = await cartResponse.json(); document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = cart.item_count);}
          await showCart();
        } catch { window.location.assign(document.body.dataset.cartUrl); }
      } catch (error) { this.status.textContent = error.message || this.dataset.error; }
      finally { this.busy = false; this.select(this.querySelector('input[name="id"]:checked'),false); }
    }
  }
  if (!customElements.get('kneora-gallery')) customElements.define('kneora-gallery', KneoraGallery);
  if (!customElements.get('kneora-product')) customElements.define('kneora-product', KneoraProduct);
})();
