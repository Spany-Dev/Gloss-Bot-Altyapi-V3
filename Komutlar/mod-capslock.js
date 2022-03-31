const Discord = require("discord.js")
const db = require('quick.db')
const ee = require("../ayarlar.json")
let p = ee.prefix
exports.run = async (client, message, args, prefix) => {
  const DBL = require("dblapi.js");
  const dbl = new DBL(`${ee.dbltoken}`,client)
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted === true) {
  
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanmak için gerekli yetkin yok! gereken yetki: `YÖNETİCİ`")
  if(!args[0]){
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`${ee.e.unlem} Hata! Lütfen bir değer belirt! **${p}capslock-engel aç** veya **${p}capslock-engel kapat**`)
      .setColor(ee.color)
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);    
    }
  
  
  if(args[0] == "aç"){
    if(db.has(`capslock_${message.guild.id}`) === "aktif"){
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`${ee.e.no} Hata! capslock engel sistemi zaten aktif! kapatmak için: **${p}capslock kapat**`)
      .setColor(ee.color)
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    }
    
      db.set(`capslock_${message.guild.id}`, "aktif")
      
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`${ee.e.yes} Başarılı! Başarılı bir şekilde capslock engel sistemi **Aktifleştirildi!**`)
      .setColor(ee.color)
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
  }
  
  if(args[0] == "kapat"){
    if(!db.has(`capslock_${message.guild.id}`) === "aktif"){
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`${ee.e.no} Hata! capslock engel sistemi zaten kapalı! açmak için: **${p}capslock aç**`)
      .setColor(ee.color)
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    }
    db.delete(`capslock_${message.guild.id}`)
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`${ee.e.yes} Başarılı! Başarılı bir şekilde capslock engel sistemi **Kapatıldı!**`)
      .setColor(ee.color)
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);    
  }
  
}else {
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} Bot`)
      .setColor(ee.color)
      .setDescription(`Selam ${message.author}, eğer **${exports.help.name}** Adlı komutu kullanmak istiyorsan DBL üzerinden oy vermen gerekli!\nOy verme bağlantısı: [Tıkla](https://top.gg/bot/${client.user.id})`)
      message.channel.send(embed);
      }
    })
}


exports.conf = {
  aliases: [],
}

exports.help = {
  name: "capslock-engel",
}