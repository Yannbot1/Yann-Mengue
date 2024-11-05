€cmd install salut.js module.exports = {
	config: {
			name: "salut",
			version: "1.0",
			author: "messe OSANGO",
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
	if (event.body && event.body.toLowerCase() == "salut") return message.reply("SALUT COMMENT VAS-TU ET QUE PUIS-JE FAIRE POUR TOI AUJOURD'HUI  ?");
}
};
