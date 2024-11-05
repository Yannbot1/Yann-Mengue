€cmd install bonsoir.js module.exports = {
	config: {
			name: "bonsoir",
			version: "1.0",
			author: "messie OSANGO",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "bonsoir") return message.reply("BONSOIR À TOI REJOINS LE GROUPE :𝑅𝑎𝑝 𝑚𝑎𝑛𝑔𝑎 𝑓𝑜𝑟𝑒𝑣𝑒𝑟 https://facebook.com/groups/847142893760968/ rejoins le groupe si t'es un Otaku et PASSE UNE EXCELLENTE SOIRÉE !");
}
};
