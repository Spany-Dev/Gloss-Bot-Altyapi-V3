const Discord = require("discord.js")
const db = require("quick.db")
const ee = require("../ayarlar.json")
exports.run = (client, message, args, member) => {
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`${ee.e.unlem} Bu Komutu Kullanabilmek İçin **Üyeleri At** İznine Sahip Olmalısın!`);
  let kisi = message.mentions.users.filter(s => s.ID !== client.user).first()
  let rol = message.mentions.roles.first()

  const sebep = args.slice(1).join(' ');
  if(!kisi) return message.channel.send(`${ee.e.no} Atmak İstediğiniz Üyeyi Etiketleyiniz.`)
  if(rol) return message.channel.send(`${ee.e.no} Lütfen Bir Üye Etiketleyiniz. Bir Rolü Atamam!`)
  if(kisi.id === client.user.id) return message.channel.send(`${ee.e.no} Kendimi Atamam!`)
  if(kisi.id === message.author.id) return message.channel.send(`${ee.e.no} Kendini Atamazsın!`)
  
    if(!message.guild.member(kisi).kickable){
    const embed = new Discord.MessageEmbed()
    .setColor(ee.color)
    .setTitle(`İşlem Başarısız.`)
    .setDescription(`${ee.e.no} Yetkili Kişileri Atamazsın!`)
   return message.channel.send(embed)    
  }
  
  message.guild.member(kisi).kick();
  const kick = new Discord.MessageEmbed()
  .setDescription(`${ee.e.ban} ${kisi}, ${message.author} Tarafından Sunucudan Atıldı.`)
  .setAuthor(`${client.user.username} Bot`, message.author.avatarURL({dynamic: true}))
  .setColor(ee.color) 
  message.channel.send(kick);
}

exports.conf = {
  aliases: [],
}

exports.help = {
  name: "kick",
}