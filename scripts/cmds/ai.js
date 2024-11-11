€cmd install Ai.js const axios = require('axios');

async function fetchFromAI(url, params) {
 try {
 const response = await axios.get(url, { params });
 return response.data;
 } catch (error) {
 console.error(error);
 return null;
 }
}

async function getAIResponse(input, userName, userId, messageID) {
 const services = [
 { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
 ];

 let response = `𝑠𝑎𝑙𝑢𝑡, 𝑗𝑒 𝑠𝑢𝑖𝑠 𝑢𝑛𝑒 𝑖𝑛𝑡𝑒𝑙𝑙𝑖𝑔𝑒𝑛𝑐𝑒 𝐴𝑅𝑇𝐼𝐹𝐼𝐶𝐼𝐸𝐿𝐿𝐸 𝐶𝑂𝑁Ç𝑈𝐸 𝑝𝑎𝑟 𝑀𝐸𝑆𝑆𝐼𝐸 𝑂𝑆𝐴𝑁𝐺𝑂 𝑞𝑢𝑒 𝑝𝑢𝑖𝑠-𝑗𝑒 𝑝𝑜𝑢𝑟 𝑣𝑜𝑢𝑠 ?`;
 let currentIndex = 0;

 for (let i = 0; i < services.length; i++) {
 const service = services[currentIndex];
 const data = await fetchFromAI(service.url, service.params);
 if (data && (data.gpt4 || data.reply || data.response)) {
 response = data.gpt4 || data.reply || data.response;
 break;
 }
 currentIndex = (currentIndex + 1) % services.length; // Passer au service suivant
 }

 return { response, messageID };
}
module.exports = {
  config: {
    name: 'ai',
    author: 'Arn',
    role: 0,
    category: 'ai',
    shortDescription: 'ai to ask anything',
  },
  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage(`SATORU II\n━━━━━━━━━━━━━━━━\nPlease provide a question or statement.\n━━━━━━━━━━━━━━━━`, event.threadID, event.messageID);
      return;
    }

    const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
    api.sendMessage(`MESSIE OSANGO' \n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━`, event.threadID, messageID);
  },
  onChat: async function ({ event, message }) {
    const messageContent = event.body.trim().toLowerCase();
    if (messageContent.startsWith("ai")) {
      const input = messageContent.replace(/^ai\s*/, "").trim();
      const { response, messageID } = await getAIResponse(input, event.senderID, message.messageID);
      message.reply(`༒✫𝑆𝐴𝑇𝑂𝑅𝑈✯ 𝐺𝑂𝐽𝑂 𝐵𝑂𝑇༒\

╔═══✯۩✯۞✯۩✯═══╗ \n${response}\╚═══✯۩✯۞✯۩✯═══╝°`, messageID);
    }
  }
};
