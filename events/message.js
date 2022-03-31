const ayarlar = require("../ayarlar.json");
const talkedRecently = new Set();
const Discord = require("discord.js") 
const client = new Discord.Client()
const ee = require("../ayarlar.json")
const db = require("quick.db") 
module.exports = async (client, message) => {
  
  let prefix;
  if (db.has(`prefix_${message.guild.id}`) === true) {

    prefix = db.fetch(`prefix_${message.guild.id}`)
  }
  if (db.has(`prefix_${message.guild.id}`) === false) {
    prefix = ayarlar.prefix
  }
    if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let cmd;
    if (client.commands.has(command)) {

     
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  
    if (talkedRecently.has(message.author.id)) {
    return message.inlineReply(`${ee.e.loading} **|** Lütfen komutları **5 saniye** aralıkla kullan!`);

  }
    if (cmd) {
    talkedRecently.add(message.author.id);
      setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
      let data = await db.get(`karaliste.${client.user.id}`) || []
    if (data.includes(message.guild.id)) return message.channel.send(new Discord.MessageEmbed().setColor(ee.color).setDescription(`${ee.e.ban} **Bu Sunucu Sahibim Tarafından Karalisteye Alınmıştır Ve Bu Sunucuda Komut Kullanamazsınız.**`).setImage('https://media.discordapp.net/attachments/910601235789414400/910620812954992651/IMG_1198.jpg'))
      
     let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor(ee.color)
 .setImage('https://media.discordapp.net/attachments/910601235789414400/910620812954992651/IMG_1198.jpg')
 .setDescription(`${ee.e.ban} Merhaba! **${karaliste}** sebebiyle karalisteye alınmışsın! Beyaz listeye alınmak istiyorsan [BURAYA](${ee.destek}) gelebilirsin!`)
  if(karaliste) return message.channel.send(westraben)
	//
      
    cmd.run(client, message, params)
        }
 };
