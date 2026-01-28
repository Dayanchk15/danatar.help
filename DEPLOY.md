# Инструкции по деплою проекта

Проект успешно собран в папку `dist/`. Выберите один из способов деплоя:

## 1. Cloudflare Pages (рекомендуется)

### Через веб-интерфейс:
1. Зайдите на https://dash.cloudflare.com/
2. Выберите "Pages" → "Create a project"
3. Подключите ваш Git репозиторий или загрузите папку `dist/`
4. Настройки сборки:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

### Через Wrangler CLI:
```bash
# Установите Wrangler (если еще не установлен)
npm install -g wrangler

# Авторизуйтесь
wrangler login

# Задеплойте проект
wrangler pages deploy dist --project-name=viio
```

## 2. Vercel

### Через веб-интерфейс:
1. Зайдите на https://vercel.com/
2. Нажмите "Add New Project"
3. Подключите ваш Git репозиторий
4. Vercel автоматически определит Astro проект

### Через Vercel CLI:
```bash
# Установите Vercel CLI
npm install -g vercel

# Задеплойте проект
vercel --prod
```

## 3. Netlify

### Через веб-интерфейс:
1. Зайдите на https://app.netlify.com/
2. Перетащите папку `dist/` в область деплоя
3. Или подключите Git репозиторий

### Через Netlify CLI:
```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Авторизуйтесь
netlify login

# Задеплойте проект
netlify deploy --prod --dir=dist
```

## 4. GitHub Pages

Если проект в Git репозитории:

1. Создайте файл `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Включите GitHub Pages в настройках репозитория

## Текущий статус

✅ Проект собран успешно
✅ Файлы готовы в папке `dist/`
✅ Конфигурационные файлы созданы

Выберите платформу и следуйте инструкциям выше.
