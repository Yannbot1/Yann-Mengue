€cmd install kickall.js module.exports = {
  config: {
    name: "kickall",
    version: "1.0",
    author: "JRT/kira",
    countDown: 5,
    role: 1,
    shortDescription: "au revoir à tous ",
    longDescription: "",
    category: "kickall",
    usages: "[outall]",
  },
  onStart: async function({ api, event, getText, args }) {
    const { participantIDs } = await api.getThreadInfo(event.threadID);
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    const botID = api.getCurrentUserID();
    const listUserID = participantIDs.filter(ID => ID != botID);
    return api.getThreadInfo(event.threadID, (err, info) => {
      if (err) return api.sendMessage("KICKALL", event.threadID);
      if (!info.adminIDs.some(item => item.id == api.getCurrentUserID()))
        return api.sendMessage(`JE DOIS TOUS VOUS SUPPRIMER `, event.threadID, event.messageID);
      if (info.adminIDs.some(item => item.id == event.senderID)) {
        setTimeout(function() { api.removeUserFromGroup(botID, event.threadID) }, 300000);
        return api.sendMessage(`kickall`, event.threadID, async (error, info) => {
          for (let id in listUserID) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            api.removeUserFromGroup(listUserID[id], event.threadID);
          }
        });
      } else return api.sendMessage('❗je ne suis pas admin ', event.threadID, event.messageID);
    });
  }
};
