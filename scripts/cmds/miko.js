const axios = require('axios');

module.exports.config = {
 name: "miko",
 version: "1.0.0",
 role: 0,
 aliases: ["miko"],
 credits: "cliff",
cooldown: 0,
hasPrefix: false,
	usage: "",
};

module.exports.run = async function ({ api, event, args }) {
 const content = encodeURIComponent(args.join(" "));

 if (!content) {
	return api.sendMessage("𝑆𝐴𝐿𝑈𝑇 𝐌𝐨𝐢 𝐜'𝐞𝐬𝐭 𝐬𝐚𝐭𝐨𝐫𝐮 𝐠𝐨𝐣𝐨 𝐛𝐨𝐭 ", event.threadID, event.messageID);
 }

 api.sendMessage("𝐒𝐀𝐓𝐎𝐑𝐔 𝐆𝐎𝐉𝐎 𝐄𝐒𝐓 𝐏𝐑𝐄𝐓 À 𝐕𝐎𝐔𝐒 𝐀𝐈𝐃𝐄𝐑 ", event.threadID, event.messageID); 

 const apiUrl = `https://bluerepoapislasttry.onrender.com/hercai?content=${content}`;

 try {
	const response = await axios.get(apiUrl);
	const reply = response.data.reply;

	api.sendMessage(reply, event.threadID, event.messageID);
 } catch (error) {
	console.error("Error fetching data:", error.message);
	api.sendMessage("An error occurred while processing your request.", event.threadID);
 }
};
