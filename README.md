# TeleCordBot

**TeleCordBot** — это бот на Node.js, который соединяет ваш канал Telegram с Discord. Он отслеживает новые сообщения и автоматически публикует их в ваш канал Discord через вебхук, включая текст и изображения с подписями.

## Возможности

- Отслеживание новых сообщений в канале Telegram.
- Автоматическая публикация сообщений в канал Discord через вебхук.
- Поддержка текстовых сообщений и изображений с подписями.

## Требования

- Node.js (версия 12 или выше)
- npm (Node Package Manager)
- Токен API Telegram Bot
- URL вебхука Discord

## Установка

1. Клонируйте репозиторий:

```sh
git clone https://github.com/kromskii2/TeleCordBot.git
cd TeleCordBot
```

2. Установите зависимости:

```sh
npm install
```

3. Создайте файл `.env` в корневой директории и добавьте туда ваш токен API Telegram Bot и URL вебхука Discord:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

## Использование

Запустите бота с помощью следующей команды:

```sh
node index.js
```

## Вклад

Приветствуются любые предложения и улучшения! Пожалуйста, отправляйте pull requests или открывайте issues для обсуждения ваших идей.

## Лицензия

Этот проект лицензируется по лицензии MIT. Подробности см. в файле [LICENSE](LICENSE).
