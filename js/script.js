(function () {
  'use strict';

  const slides = document.querySelectorAll('.slide');
  const total = slides.length;
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const spanCurrent = document.getElementById('slide-current');
  const spanTotal = document.getElementById('slide-total');
  const progressBar = document.getElementById('progress-bar');
  const moduloItens = document.querySelectorAll('.modulo-item');
  const btnMenu = document.getElementById('btn-menu');
  const fecharMenu = document.getElementById('fechar-menu');
  const moduloMenu = document.getElementById('modulo-menu');
  const overlay = document.getElementById('menu-overlay');
  const contactForm = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');

  let current = 0;

  function irParaSlide(index) {
    if (index < 0) index = 0;
    if (index >= total) index = total - 1;
    slides[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');

    spanCurrent.textContent = current + 1;
    spanTotal.textContent = total;
    progressBar.style.width = ((current + 1) / total) * 100 + '%';

    moduloItens.forEach((item, i) => {
      item.classList.toggle('ativo', i === current);
    });

    btnPrev.disabled = current === 0;
    btnNext.disabled = current === total - 1;
  }

  btnPrev.addEventListener('click', () => irParaSlide(current - 1));
  btnNext.addEventListener('click', () => irParaSlide(current + 1));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') irParaSlide(current - 1);
    if (e.key === 'ArrowRight') irParaSlide(current + 1);
  });

  moduloItens.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-slide'), 10);
      irParaSlide(idx);
      fecharMenuFn();
    });
  });

  function abrirMenu() {
    moduloMenu.classList.add('aberto');
    overlay.classList.add('visivel');
  }
  function fecharMenuFn() {
    moduloMenu.classList.remove('aberto');
    overlay.classList.remove('visivel');
  }

  btnMenu.addEventListener('click', abrirMenu);
  fecharMenu.addEventListener('click', fecharMenuFn);
  overlay.addEventListener('click', fecharMenuFn);

  // Formulário de contato
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formMsg.className = 'form-msg success';
      formMsg.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
      formMsg.style.display = 'block';
      contactForm.reset();
      setTimeout(() => { formMsg.style.display = 'none'; }, 5000);
    });
  }

  // Inicializa
  irParaSlide(0);
})();
