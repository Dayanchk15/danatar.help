import ru from "./locales/ru.json";

type AnyObject = Record<string, unknown>;

function getByPath(obj: AnyObject, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as AnyObject)) {
      return (acc as AnyObject)[part];
    }
    return undefined;
  }, obj);
}

/**
 * SSR fallback translator (default RU).
 * Client-side i18next will override text on load and on language switch.
 */
export function tr(key: string, fallback: string = key): string {
  const v = getByPath(ru as unknown as AnyObject, key);
  return typeof v === "string" ? v : fallback;
}

