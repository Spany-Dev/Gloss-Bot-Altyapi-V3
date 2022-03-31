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

  if(args[0] === "ayarla"){
  let channel = message.mentions.channels.first()
    if (!channel) {
        message.channel.send(new Discord.MessageEmbed().setColor(ee.color).setDescription(`${ee.e.no} Yanlış Kullanım! Doğru Kullanım: ${p}hg-bb ayarla #kanal`))
    }
    
 db.set('rgiris_'+message.guild.id, channel.id) 
message.channel.send(new Discord.MessageEmbed().setColor(ee.color).setDescription(`${ee.e.yes} Resimli Hoşgeldin - Güle Güle kanalı ${channel} Olarak Ayarlandı.`))
                     
} else {
  
if(args[0] === "sıfırla"){
message.channel.send(new Discord.MessageEmbed().setColor(ee.color).setDescription(`${ee.e.yes} Resimli Hoşgeldin - Güle Güle Sistemi Sıfırlandı!`))
 db.delete('rgiris_'+message.guild.id)
  
} else {
   return message.channel.send(new Discord.MessageEmbed().setColor(ee.color).setTitle(`Resimli HG-BB`).setDesceiption(`${ee.e.no} Lütfen Değer Belirtin! Resimli Giriş Çıkış Sistemini Kurmak İçin: **${p}hg-bb ayarla #kanal** Yazınız. Eğer Sıfırlamak İstiyorsanız: **${p}hg-bb sıfırla** Yazınız.`))
}}}    
else {
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
    name: "hg-bb",
}