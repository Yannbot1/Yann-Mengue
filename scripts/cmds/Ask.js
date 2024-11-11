€cmd install ask.js const axios = require('axios');

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

  let response = `✯𝑆𝐴𝑇𝑂𝑅𝑈 𝐺𝑂𝐽𝑂 𝘽𝙊𝙏✯ \n╔══✯══✯۩۞۩✯══✯══╗\n𝙎𝘼𝙇𝙐𝙏, 𝑗𝑒 𝑠𝑢𝑖𝑠 𝑠𝑎𝑡𝑜𝑟𝑢 𝑔𝑜𝑗𝑜 𝑏𝑜𝑡, 𝑙à 𝑝𝑜𝑢𝑟 𝑟𝑒𝑝𝑜𝑛𝑑𝑟𝑒 à 𝑡𝑒𝑠 𝑞𝑢𝑒𝑠𝑡𝑖𝑜𝑛𝑠 𝑝𝑒𝑢𝑡-ê𝑡𝑟𝑒`;
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
    author: 'HAMED JUNIOR',
    role: 0,
    category: 'ai',
    shortDescription: 'ai to ask anything',
  },
  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage("✯𝑆𝐴𝑇𝑂𝑅𝑈 𝐺𝑂𝐽𝑂 𝘽𝙊𝙏✯\n╔═✯═══✯۩۞۩✯══✯══╗\n𝙎𝘼𝙇𝙐𝙏, 𝑗𝑒 𝑠𝑢𝑖𝑠 𝑠𝑎𝑡𝑜𝑟𝑢 𝑔𝑜𝑗𝑜 𝑏𝑜𝑡, 𝑙à 𝑝𝑜𝑢𝑟 𝑟𝑒𝑝𝑜𝑛𝑑𝑟𝑒 à 𝑡𝑒𝑠 𝑞𝑢𝑒𝑠𝑡𝑖𝑜𝑛𝑠 𝑝𝑒𝑢𝑡-ê𝑡𝑟𝑒 ", event.threadID, event.messageID);
      return;
    }

    api.getUserInfo(event.senderID, async (err, ret) => {
      if (err) {
        console.error(err);
        return;
      }
      const userName = ret[event.senderID].name;
      const { response, messageID } = await getAIResponse(input, userName, event.senderID, event.messageID);
      api.sendMessage(`✯𝑆𝐴𝑇𝑂𝑅𝑈 𝐺𝑂𝐽𝑂 𝘽𝙊𝙏✯:\n╔═✯═══✯۩۞۩✯══✯══╗\n\n${response}\n\n`, event.threadID, messageID);
    });
  },
  onChat: async function ({ api, event, message }) {
    const messageContent = event.body.trim().toLowerCase();
    if (messageContent.startsWith("ai")) {
      const input = messageContent.replace(/^ai\s*/, "").trim(); 
      api.getUserInfo(event.senderID, async (err, ret) => {
        if (err) {
          console.error(err);
          return;
        }
        const userName = ret[event.senderID].name;
        const { response, messageID } = await getAIResponse(input, userName, event.senderID, message.messageID);
        message.reply(`
    ✯𝑆𝑎𝑡𝑜𝑟𝑢 𝑔𝑜𝑗𝑜 𝑏𝑜𝑡✯ \n---------------------------------------\n\n${response}\n\n--------------------------------------\n𝑟𝑒𝑝𝑜𝑛𝑠𝑒 à 𝑙𝑎 𝑞𝑢𝑒𝑠𝑡𝑖𝑜𝑛 𝑑𝑒 : ${userName} 💬\n___*____*____*____*_____*____*`, messageID);
api.setMessageReaction("💬", event.messageID, () => {}, true);

      });
    }
  }
};
