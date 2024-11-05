€cmd install merci.js module.exports = {
	config: {
			name: "merci",
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
	if (event.body && event.body.toLowerCase() == "merci") return message.reply("MAIS DE RIEN J'ESPÈRE QUE PROCHAINEMENT JE POURRAIS VOUS AIDER DE MÊME QU'AUJOURD'HUI N'HÉSITEZ PAS À ME POSER DES QUESTIONS DU MOMENT QUE JE SUIS ACTIF !");
}
};
