import { ui, defaultLang, languages } from "./ui";

export type Lang = keyof typeof languages;

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split("/");
  if (maybeLang && maybeLang in languages) return maybeLang as Lang;
  return defaultLang;
}

export function stripLangFromPathname(pathname: string): string {
  const parts = pathname.split("/");
  const maybeLang = parts[1];
  if (maybeLang && maybeLang in languages) {
    const rest = parts.slice(2).join("/");
    return `/${rest}`.replace(/\/+$/, "") || "/";
  }
  return pathname || "/";
}

export function buildLangPath(url: URL, lang: Lang): string {
  const base = stripLangFromPathname(url.pathname);
  // ensure leading slash, keep hash/query out (caller can append if needed)
  const normalized = base.startsWith("/") ? base : `/${base}`;
  const suffix = normalized === "/" ? "" : normalized;
  return `/${lang}${suffix || "/"}`.replace(/\/+$/, "/");
}

export function useTranslations(lang: Lang = defaultLang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
