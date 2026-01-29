// @ts-check
import {
  defineConfig,
  fontProviders,
} from "astro/config";


// https://astro.build/config
export default defineConfig({
  scopedStyleStrategy: 'where',
  // Оптимизация сборки
  build: {
    inlineStylesheets: 'auto', // Автоматическая инлайнизация маленьких стилей
  },
  // Оптимизация изображений
  image: {
    domains: [],
    remotePatterns: [],
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Roboto Slab",
        cssVariable: "--font-roboto-slab",
        weights: ["100 900"],
        display: "swap", // Оптимизация загрузки шрифтов
      },
      {
        provider: fontProviders.google(),
        name: "Inter",
        cssVariable: "--font-inter",
        weights: ["100 900"],
        display: "swap", // Оптимизация загрузки шрифтов
      },
    ],
  },
});
