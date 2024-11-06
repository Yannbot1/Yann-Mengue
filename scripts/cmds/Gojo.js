€cmd install gojo.js const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "gojo",
    aliases: ["▂▃▅▓▒ •✯✫𝑆𝐴𝑇𝑂𝑅𝑈✪ ✫𝙂𝙊𝙅𝙊☆✯ ══  ]▒▓▅▃▂, bengc"],
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "add user in thread"
    },
    longDescription: {
      vi: "",
      en: "add any user to bot owner group chat"
    },
    category: "chat box",
    guide: {
      en: "{pn}▂▃▅▓▒ •✯✫𝑆𝐴𝑇𝑂𝑅𝑈✪ ✫𝙂𝙊𝙅𝙊☆✯ ══  ]▒▓▅▃▂"
    }
  },

  onStart: async function ({ api, event, args }) {
    const threadID = "8573269532753449";

    try {
      // Check if the user is already in the group chat
      const threadInfo = await api.getThreadInfo(threadID);
      const participants = threadInfo.participantIDs;

      if (participants.includes(event.senderID)) {
        api.sendMessage("⚠ | ☆𝑉𝑜𝑢𝑠 𝑓𝑎𝑖𝑡𝑒𝑠 𝑑𝑒𝑗𝑎 𝑝𝑎𝑟𝑡𝑖(𝑒) 𝑑𝑢 𝑔𝑟𝑜𝑢𝑝𝑒 𝑣𝑜𝑢𝑠 𝑒𝑛 𝐸𝑇𝐸𝑆 𝑑𝑜𝑛𝑐 𝑑𝑒𝑗𝑎 𝑚𝑒𝑚𝑏𝑟𝑒.", event.threadID);

        // Set ⚠ reaction for already added user
        api.setMessageReaction("⚠", event.messageID, "👍", api);
      } else {
        // If not, add the user to the group chat
        await api.addUserToGroup(event.senderID, threadID);
        api.sendMessage("✅ | 𓃬 𝑇𝑈 𝐴𝑆 É𝑇É 𝐴𝐽𝑂𝑈𝑇É 𝐷𝐴𝑁𝑆 𝐿𝐸 𝐺𝑅𝑂𝑈𝑃𝐸 𝑉𝐸𝑅𝐼𝐹𝐼𝐸𝑆 𝑇𝐴 𝐵𝑂Î𝑇𝐸 À 𝑆𝑃𝐴𝑀 𝑆𝐼 𝑇𝑈 𝑁𝐸 𝑉𝑂𝐼𝑆 𝑃𝐴𝑆 𝐿𝐸 𝐺𝑅𝑂𝑈𝑃𝐸 𝐷𝐴𝑁𝑆 𝑇𝐴 𝑀𝐸𝑆𝑆𝐴𝐺𝐸𝑅𝐼𝐸 .", event.threadID);

        // Set ✅ reaction for successfully added user
        api.setMessageReaction("✅", event.messageID, "👍", api);
      }
    } catch (error) {
      api.sendMessage("❌ | ✯𝔪𝔞𝔩𝔥𝔢𝔲𝔯𝔢𝔲𝔰𝔢𝔪𝔢𝔫𝔱 𝔧𝔢 𝔫'𝔞𝔦 𝔭𝔞𝔰 𝔭𝔲 𝔳𝔬𝔲𝔰 𝔂 𝔞𝔧𝔬𝔲𝔱𝔢𝔯  𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙚𝙯 𝙢𝙤𝙣 𝙖𝙙𝙢𝙞𝙣 𝙥𝙤𝙪𝙧 𝙡𝙚 𝙛𝙖𝙞𝙧𝙚. ", event.threadID);

      // Set ❌ reaction for failed adding user
      api.setMessageReaction("❌", event.messageID, "🫡", api);
    }
  }
};
