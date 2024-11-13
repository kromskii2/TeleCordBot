const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const FormData = require('form-data');
const path = require('path');

// Вставьте свой токен Telegram API и URL вебхука Discord
const telegramToken = '7558181491:AAHysEQphyLuvZv5Zks8HEkgPWYeab21FWg';
const discordWebhookURL = 'https://discord.com/api/webhooks/1306174978407923783/hnOu6xocdft6keXnzrtsXEN5wYASHFJGHsCEqMi7RqHC-MRVm_sFlVFoYAXOr6OL_xey';

// Создайте экземпляр бота Telegram
const bot = new TelegramBot(telegramToken, { polling: true });

// Обработчик новых сообщений
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  // Обработка текстовых сообщений
  if (msg.text) {
    const messageText = msg.text;

    // Подготовка данных для отправки в Discord
    const data = {
      content: messageText
    };

    // Отправка данных в Discord с использованием axios
    axios.post(discordWebhookURL, data)
      .then(response => {
        console.log('Message sent to Discord successfully');
      })
      .catch(error => {
        console.error('Error sending message to Discord:', error);
      });
  }

  // Обработка сообщений с изображениями
  if (msg.photo) {
    const photo = msg.photo[msg.photo.length - 1]; // Получение самого большого размера изображения
    const fileId = photo.file_id;

    try {
      // Получение ссылки для скачивания изображения
      const file = await bot.getFile(fileId);
      const fileUrl = `https://api.telegram.org/file/bot${telegramToken}/${file.file_path}`;

      // Скачивание изображения
      const response = await axios.get(fileUrl, { responseType: 'stream' });

      // Создание объекта FormData и добавление изображения
      const formData = new FormData();
      formData.append('file', response.data, {
        filename: path.basename(file.file_path),
        contentType: 'image/jpeg'
      });

      // Добавление подписи, если она есть
      if (msg.caption) {
        formData.append('content', msg.caption);
      }

      // Отправка изображения в Discord
      axios.post(discordWebhookURL, formData, {
        headers: formData.getHeaders()
      })
      .then(response => {
        console.log('Image sent to Discord successfully');
      })
      .catch(error => {
        console.error('Error sending image to Discord:', error);
      });

    } catch (error) {
      console.error('Error downloading or sending image:', error);
    }
  }
});
