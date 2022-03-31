const Discord = require("discord.js");
const db = require('quick.db');
const fs = require('fs');
const hastebin = require('hastebin-gen');
const util = require('util');
const Jimp = require('jimp');
exports.run = async (client, message, args) => {

  if(message.author.id !== "896272859817734155" && message.author.id !== "710484324297998377" && message.author.id !== "797904178223644672") return message.channel.send(" Bu komut <@896272859817734155>' a özeldir!!")
  const tokenuyari = 'Burak babam olsan vermem xd'

  const ayarlar = require("../ayarlar.json")
  const sunucu = message.guild
  let bot = client;

  var x = client.emojis.cache.get(ayarlar.no);
  var x2 = client.emojis.cache.get(ayarlar.no);

	if(!args[0]) {		const embed = new Discord.MessageEmbed()
		 .setDescription("kod giriniz", message.content.slice(2))
			.setColor(ayarlar.color)
		message.channel.send(embed)
		return
	}

	const code = args.join(' ');
	function clean(text) {
		if (typeof text !== 'string')
			text = require('util').inspect(text, { depth: 0 })

		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
		return text;
	};

	async function send(embed) {
		message.channel.send(embed);
	}

	const evalEmbed = new Discord.MessageEmbed()
  .setColor(ayarlar.color)

	try {
		var evaled = clean(await eval(code));

    if(evaled.length >= 1024) {
     message.channel.send(evaled, {split: true, code: "js"})
    return
    }

    if (code === "2+2" || code === "2 + 2" || code === "Math.floor(2+2)" || code === "Math.floor(2 + 2)") { 
      var evaled = "5"
    };

    if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace(client.token, tokenuyari).replace(process.env.PROJECT_INVITE_TOKEN, tokenuyari);
		if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`js\n${evaled.replace(client.token, tokenuyari).replace(process.env.PROJECT_INVITE_TOKEN, tokenuyari)}\n\`\`\``)
		else evalEmbed.setDescription(`\`\`\`xl\n${evaled.replace(client.token, tokenuyari).replace(process.env.PROJECT_INVITE_TOKEN, tokenuyari)}\n\`\`\``)

		const newEmbed = new Discord.MessageEmbed()
			.addField(` GİRİŞ`, `\`\`\`js\n${code}\n\`\`\``)
			.addField(` ÇIKIŞ`, `\`\`\`js\n${evaled.replace(client.token, tokenuyari).replace(process.env.PROJECT_INVITE_TOKEN, tokenuyari)}\n\`\`\``)
			.setColor(ayarlar.color)
		message.channel.send(newEmbed,);
	}

	catch (err) {
		evalEmbed.addField(`${x} HATA`, `\`\`\`js\n${err}\n\`\`\``);
		evalEmbed.setColor(ayarlar.color);
		message.channel.send(evalEmbed);
	}
}

exports.conf = {
	aliases: [],
}

exports.help = {
	name: 'eval',
}