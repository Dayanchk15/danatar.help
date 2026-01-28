# Скрипт для деплоя проекта
Write-Host "🚀 Подготовка к деплою проекта..." -ForegroundColor Green

# Проверяем, что проект собран
if (-Not (Test-Path "dist")) {
    Write-Host "❌ Папка dist не найдена. Запускаю сборку..." -ForegroundColor Red
    npm run build
}

Write-Host "✅ Проект готов к деплою!" -ForegroundColor Green
Write-Host ""
Write-Host "Выберите платформу для деплоя:" -ForegroundColor Yellow
Write-Host "1. Cloudflare Pages (через Wrangler CLI)"
Write-Host "2. Vercel (через Vercel CLI)"
Write-Host "3. Netlify (через Netlify CLI)"
Write-Host "4. Показать инструкции для веб-интерфейса"
Write-Host ""
$choice = Read-Host "Введите номер (1-4)"

switch ($choice) {
    "1" {
        Write-Host "📦 Деплой на Cloudflare Pages..." -ForegroundColor Cyan
        npx wrangler pages deploy dist --project-name=viio
    }
    "2" {
        Write-Host "📦 Деплой на Vercel..." -ForegroundColor Cyan
        npx vercel --prod
    }
    "3" {
        Write-Host "📦 Деплой на Netlify..." -ForegroundColor Cyan
        npx netlify-cli deploy --prod --dir=dist
    }
    "4" {
        Write-Host ""
        Write-Host "📖 ИНСТРУКЦИИ ДЛЯ ВЕБ-ИНТЕРФЕЙСА:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Cloudflare Pages:" -ForegroundColor Cyan
        Write-Host "  1. Зайдите на https://dash.cloudflare.com/"
        Write-Host "  2. Pages → Create a project"
        Write-Host "  3. Загрузите папку 'dist' или подключите Git репозиторий"
        Write-Host ""
        Write-Host "Vercel:" -ForegroundColor Cyan
        Write-Host "  1. Зайдите на https://vercel.com/"
        Write-Host "  2. Add New Project"
        Write-Host "  3. Перетащите папку 'dist' или подключите Git репозиторий"
        Write-Host ""
        Write-Host "Netlify:" -ForegroundColor Cyan
        Write-Host "  1. Зайдите на https://app.netlify.com/"
        Write-Host "  2. Перетащите папку 'dist' в область деплоя"
        Write-Host ""
        Write-Host "Подробные инструкции в файле DEPLOY.md" -ForegroundColor Green
    }
    default {
        Write-Host "❌ Неверный выбор" -ForegroundColor Red
    }
}
