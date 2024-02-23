// webhookSender.js
const axios = require('axios');

async function sendWebhookToMake(data) {
  try {
    await axios.post('https://hook.us1.make.com/y17568kqjhsaolb3isbftqik40grru7r', {
      data: data,
    });
    console.log('Webhook enviado a Make con éxito');
  } catch (error) {
    console.error('Error al enviar el webhook a Make:', error);
  }
}

module.exports = { sendWebhookToMake };