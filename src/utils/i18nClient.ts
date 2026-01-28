import { initReveals } from "./reveals";

const PRESERVE_SCROLL = true;
const UPDATE_URL = true;
// For stability and performance, we use full page navigations for language switches.
// Set to true to re-enable SPA-style language switching.
const ENABLE_LANG_SPA = false;

function replaceOrKeep<T extends Element>(
  current: T | null,
  next: T | null,
): void {
  if (!current || !next) return;
  current.replaceWith(next);
}

async function swapTo(url: string, pushHistory = true) {
  const prevScroll = PRESERVE_SCROLL
    ? { x: window.scrollX, y: window.scrollY }
    : null;

  const res = await fetch(url, {
    headers: {
      "X-Requested-With": "i18nClient",
    },
  });
  if (!res.ok) return;

  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  // Update lang + title
  const nextLang = doc.documentElement.getAttribute("lang");
  if (nextLang) document.documentElement.setAttribute("lang", nextLang);
  const nextTitle = doc.querySelector("title")?.textContent;
  if (nextTitle) document.title = nextTitle;

  // Swap Header / Main / Footer
  replaceOrKeep(document.querySelector("sy-head"), doc.querySelector("sy-head"));
  replaceOrKeep(document.querySelector("main#main"), doc.querySelector("main#main"));
  replaceOrKeep(document.querySelector("sy-footer"), doc.querySelector("sy-footer"));

  // Update URL without full navigation
  if (UPDATE_URL && pushHistory) {
    history.pushState({ i18n: true }, "", url);
  }

  // Re-init reveal observers for newly inserted nodes
  initReveals(document);

  // Ensure layout observers recalc (footer/header sizing etc.)
  window.dispatchEvent(new Event("resize"));

  if (prevScroll) {
    window.scrollTo(prevScroll.x, prevScroll.y);
    window.dispatchEvent(new Event("scroll"));
  }
}

function isLangLink(el: Element | null): el is HTMLAnchorElement {
  return el instanceof HTMLAnchorElement && el.hasAttribute("data-lang-switch");
}

function onClick(e: MouseEvent) {
  if (!ENABLE_LANG_SPA) return;
  const target = e.target as Element | null;
  const a = target?.closest("a");
  if (!isLangLink(a)) return;

  // Same-page anchors should behave normally
  const href = a.getAttribute("href");
  if (!href) return;

  e.preventDefault();
  const nextUrl = new URL(href, window.location.origin).toString();
  swapTo(nextUrl, true).catch(() => {});
}

window.addEventListener("click", onClick);

window.addEventListener("popstate", () => {
  if (!ENABLE_LANG_SPA || !UPDATE_URL) return;
  swapTo(window.location.href, false).catch(() => {});
});

