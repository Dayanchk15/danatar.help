import i18next, { type i18n } from "i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import tk from "./locales/tk.json";

export type SupportedLanguage = "ru" | "tk" | "en";

const STORAGE_KEY = "danatar_lang";
const DEFAULT_LANG: SupportedLanguage = "ru";

let _i18n: i18n | null = null;

function normalizeLang(input: string | null | undefined): SupportedLanguage {
  const v = (input ?? "").toLowerCase();
  if (v === "ru" || v.startsWith("ru-")) return "ru";
  if (v === "tk" || v.startsWith("tk-")) return "tk";
  if (v === "en" || v.startsWith("en-")) return "en";
  return DEFAULT_LANG;
}

export function getCurrentLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return DEFAULT_LANG;
  return normalizeLang(localStorage.getItem(STORAGE_KEY) ?? document.documentElement.lang);
}

export async function initI18n(): Promise<i18n> {
  if (typeof window === "undefined") return i18next;
  if (_i18n) return _i18n;

  const initialLang = normalizeLang(
    localStorage.getItem(STORAGE_KEY) ?? navigator.language ?? document.documentElement.lang,
  );

  await i18next.init({
    lng: initialLang,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      tk: { translation: tk },
    },
  });

  _i18n = i18next;
  applyTranslations(document);
  document.documentElement.lang = i18next.language;
  return _i18n;
}

export async function setLanguage(lang: string): Promise<void> {
  if (typeof window === "undefined") return;
  await initI18n();
  const nextLang = normalizeLang(lang);
  await i18next.changeLanguage(nextLang);
  localStorage.setItem(STORAGE_KEY, nextLang);
  document.documentElement.lang = nextLang;
  applyTranslations(document);
}

export function t(key: string): string {
  if (!_i18n) return key;
  return i18next.t(key);
}

export function applyTranslations(root: ParentNode = document): void {
  if (typeof window === "undefined") return;
  const nodes = root.querySelectorAll<HTMLElement>("[data-i18n]");
  nodes.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    el.textContent = i18next.t(key);
  });
}

