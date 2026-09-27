'use strict';

const mainNav = document.getElementById('nav');
const menu = document.getElementById('menu');
const burger = document.getElementById('burger');
const backdrop = document.getElementById('menu-backdrop');
let menuOpen = false;

function updateNav() {
  mainNav.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', updateNav, {passive:true});
updateNav();

function setMenuOpen(open) {
  const restoreFocus = menuOpen && !open && menu.contains(document.activeElement);
  menuOpen = open;
  menu.classList.toggle('open', open);
  backdrop.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.setAttribute('aria-hidden', String(!open));
  menu.inert = !open;
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    menu.scrollTop = 0;
    menu.querySelector('a').focus({preventScroll:true});
  }
  else if (restoreFocus) burger.focus({preventScroll:true});
}
function toggleMenu() { setMenuOpen(!menuOpen); }
function closeMenu() { setMenuOpen(false); }

document.addEventListener('keydown', e => {
  if (!menuOpen) return;
  if (e.key === 'Escape') {
    closeMenu();
    return;
  }
  if (e.key !== 'Tab') return;
  const items = [burger, ...menu.querySelectorAll('a[href]')];
  const index = items.indexOf(document.activeElement);
  if (index < 0 || (e.shiftKey && index === 0) || (!e.shiftKey && index === items.length - 1)) {
    e.preventDefault();
    items[e.shiftKey ? items.length - 1 : 0].focus();
  }
});
window.addEventListener('pageshow', closeMenu);
