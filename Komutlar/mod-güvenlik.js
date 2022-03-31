const Discord = require('discord.js')
const db = require("quick.db")
const ee = require("../ayarlar.json")
let p = ee.prefix

exports.run = async (client, message, args) => {
  const DBL = require("dblapi.js");
  const dbl = new DBL(`${ee.dbltoken}`,client)
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted === true) {
  
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${ee.e.unlem} Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`);

let logk = message.mentions.channels.first();
let logkanal = db.fetch(`guvenlik${message.guild.id}`)
  
  if(args[0] === "ayarla"){
if (!logk) return message.channel.send(new Discord.MessageEmbed().setColor(ee.color).setDescription(`${ee.e.no} Yanlış Kullanım! Doğru Kullanım: **${p}güvenlik ayarla #kanal**`))

   db.set(`guvenlik${message.guild.id}`, logk.id)

message.channel.send(new Discord.MessageEmbed().setColor(ee.color).setDescription(`${ee.e.yes} Güvenlik kanalı ${logk} Olarak Ayarlandı.`))

  } else {
  
if(args[0] === "sıfırla"){
   db.delete(`guvenlik${message.guild.id}`)
   message.channel.send(new Discord.MessageEmbed().setColor(ee.color).setDescription(`${ee.e.yes} Güvenlik Sistemi Sıfırlandı!`))
  
} else {
   return message.channel.send(new Discord.MessageEmbed().setColod(ee.color).setTitle(`Resimli Güvenlik`).setDesceiption(`${ee.e.no} Lütfen Değer Belirtin! Güvenlil Sistemini Kurmak İçin: **${p}güvenlik ayarla #kanal** Yazınız. Eğer Sıfırlamak İstiyorsanız: **${p}güvenlik sıfırla** Yazınız.`))
}}} else {
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} Bot`)
      .setColor(ee.color)
      .setDescription(`Selam ${message.author}, eğer **${exports.help.name}** Adlı komutu kullanmak istiyorsan DBL üzerinden oy vermen gerekli!\nOy verme bağlantısı: [Tıkla](https://top.gg/bot/${client.user.id})`)
      message.channel.send(embed);
      }
    })
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "güvenlik",
}