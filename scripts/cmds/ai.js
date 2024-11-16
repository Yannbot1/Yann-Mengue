€cmd install ai.js const axios = require('axios');

async function fetchFromAI(url, params) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAIResponse(input, userId, messageID) {
  const services = [
    { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
    { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
    { url: 'http://fi1.bot-hosting.net:6518/gpt', params: { query: input } },
    { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
  ];

  let response = "𝑆𝐴𝐿𝑈𝑇, 𝔍𝔢 𝙨𝙪𝙞𝙨 𝑙'𝑖𝑛𝑡𝑒𝑙𝑙𝑖𝑔𝑒𝑛𝑐𝑒 𝑎𝑟𝑡𝑖𝑓𝑖𝑐𝑖𝑒𝑙𝑙𝑒 𝐶𝑂𝑁Ç𝑈𝐸 𝑝𝑎𝑟 𝑀𝐸𝑆𝑆𝐼𝐸 𝑂𝑆𝐴𝑁𝐺𝑂 𝑄𝑢𝑒 𝑝𝑢𝑖𝑠-𝑗𝑒 𝑝𝑜𝑢𝑟 𝑣𝑜𝑢𝑠 ?";
  let currentIndex = 0;

  for (let i = 0; i < services.length; i++) {
    const service = services[currentIndex];
    const data = await fetchFromAI(service.url, service.params);
    if (data && (data.gpt4 || data.reply || data.response)) {
      response = data.gpt4 || data.reply || data.response;
      break;
    }
    currentIndex = (currentIndex + 1) % services.length; // Move to the next service in the cycle
  }

  return { response, messageID };
}

module.exports = {
  config: {
    name: 'ai',
    aliases: ["satoru"],
    author: 'Arn',
    role: 0,
    category: 'ai',
    shortDescription: 'AI to ask anything',
  },
  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage(`Please provide a question or statement.`, event.threadID, event.messageID);
      return;
    }

    const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
    api.sendMessage(`\n\n${response}\n`, event.threadID, messageID);
  },
  onChat: async function ({ api, event }) {
    const messageContent = event.body.trim().toLowerCase();
    if (messageContent.startsWith("ai")) {
      const input = messageContent.replace(/^ai\s*/, "").trim();
      const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
      api.sendMessage(`༒𝑆𝐴𝑇𝑂𝑅𝑈✯ 𝐺𝑂𝐽𝑂𝑇✯ 𝐵𝑂𝑇༒
 \-----*-----*-----*------*-----*-----*----*\n${response}\n_____*_____*_____*_____*`, event.threadID, messageID);
    }
  }
};
