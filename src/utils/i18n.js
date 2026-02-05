(() => {
  const translations = {
    ru: {
      "nav.home": "Главная",
      "nav.about": "Обо мне",
      "nav.portfolio": "Портфолио",
      "nav.blog": "Блог",
      "hero.name": "Jhon Doe",
      "hero.text": "Краткое и цепляющее описание основной темы сайта",
      "hero.cta": "Узнать больше",
    },
    en: {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.portfolio": "Portfolio",
      "nav.blog": "Blog",
      "hero.name": "Jhon Doe",
      "hero.text": "A short and catchy description of the site's main topic",
      "hero.cta": "Learn more",
    },
    tk: {
      "nav.home": "Baş sahypa",
      "nav.about": "Men barada",
      "nav.portfolio": "Portfel",
      "nav.blog": "Blog",
      "hero.name": "Jhon Doe",
      "hero.text": "Sahypanyň esasy mowzugy barada gysga we täsirli beýany",
      "hero.cta": "Has giňişleýin bilmek",
    },
  };

  const FALLBACK_LANG = "ru";
  const STORAGE_KEY = "site-lang";

  function getInitialLang() {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;

    const nav = navigator.language?.slice(0, 2).toLowerCase();
    if (nav === "ru" || nav === "en" || nav === "tk") return nav;

    return FALLBACK_LANG;
  }

  function applyTranslations(lang) {
    const dict = translations[lang] || translations[FALLBACK_LANG];

    document.documentElement.lang = lang;

    document
      .querySelectorAll("[data-i18n-key]")
      .forEach((el) => {
        const key = el.getAttribute("data-i18n-key");
        if (!key) return;
        const text = dict[key];
        if (!text) return;

        // Если внутри есть иконки, меняем только текстовый узел
        if (el.childNodes.length > 1) {
          el.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              node.textContent = " " + text;
            }
          });
        } else {
          el.textContent = text;
        }
      });

    // Обновляем текст на главной кнопке hero
    const heroBtn = document.querySelector(".hero .primary.button");
    if (heroBtn && dict["hero.cta"]) {
      heroBtn.textContent = dict["hero.cta"];
    }

    // Подсветка активного языка
    document
      .querySelectorAll("[data-lang-btn]")
      .forEach((btn) => {
        const code = btn.getAttribute("data-lang-btn");
        if (!code) return;
        btn.classList.toggle("is-active", code === lang);
      });
  }

  function init() {
    const lang = getInitialLang();
    applyTranslations(lang);

    document
      .querySelectorAll("[data-lang-btn]")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const code = btn.getAttribute("data-lang-btn");
          if (!code || !translations[code]) return;
          window.localStorage.setItem(STORAGE_KEY, code);
          applyTranslations(code);
        });
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

