const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const FormData = require('form-data');
const path = require('path');

const telegramToken = '7558181491:AAHP6I8QgeYtLLnnRB_vUwoT2cqHlz5BCU4';
const discordWebhookURL = 'https://discord.com/api/webhooks/1247874546225385483/pRORy90_S4MVpj4v_yYpWDiSVC06K1OkiOV0nigFHDRU7InyKayaof_yqs99PYGIt_kP';

const bot = new TelegramBot(telegramToken, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text) {
    const messageText = msg.text;

    const data = {
      content: messageText
    };

    axios.post(discordWebhookURL, data)
      .then(response => {
        console.log('Message sent to Discord successfully');
      })
      .catch(error => {
        console.error('Error sending message to Discord:', error);
      });
  }

  if (msg.photo) {
    const photo = msg.photo[msg.photo.length - 1];
    const fileId = photo.file_id;

    try {
      const file = await bot.getFile(fileId);
      const fileUrl = `https://api.telegram.org/file/bot${telegramToken}/${file.file_path}`;

      const response = await axios.get(fileUrl, { responseType: 'stream' });

      const formData = new FormData();
      formData.append('file', response.data, {
        filename: path.basename(file.file_path),
        contentType: 'image/jpeg'
      });

      if (msg.caption) {
        formData.append('content', msg.caption);
      }

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
