const Discord = require("discord.js")
const db = require("quick.db")
const ee = require("../ayarlar.json")

exports.run = (client, message, args, member) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`${ee.e.unlem} Bu Komutu Kullanabilmek İçin **Üyeleri Yasakla** İznine Sahip Olmalısın!`);
  let kisi = message.mentions.users.filter(s => s.ID !== client.user).first()
  let rol = message.mentions.roles.first()

  const sebep = args.slice(1).join(' ');
  if(!kisi) return message.channel.send(`${ee.e.no} Banlamak İstediğiniz Üyeyi Etiketleyiniz.`)
  if(!sebep) return message.channel.send(`${ee.e.no} Banlama Sebebinizi Yazmalısınız.`)
  if(rol) return message.channel.send(`${ee.e.no} Lütfen Bir Üye Etiketleyiniz. Bir Rolü Banlayamam!`)
  if(kisi.id === client.user.id) return message.channel.send(`${ee.e.no} Kendimi banlayamam!`)
  if(kisi.id === message.author.id) return message.channel.send(`${ee.e.no} Kendini banlayamazsın!`)
  
    if(!message.guild.member(kisi).bannable){
    const embed = new Discord.MessageEmbed()
    .setColor(ee.color)
    .setTitle(`İşlem Başarısız.`)
    .setDescription(`${ee.e.no} Yetkili Kişileri Banlayamazsın!`)
   return message.channel.send(embed)    
  }
  
  db.add(`toplamban`, +1)
  message.guild.members.ban(kisi, { reason: sebep });
  const ban = new Discord.MessageEmbed()
  .setDescription(`${ee.e.ban} ${kisi}, ${message.author} Tarafından **${sebep}** Nedeniyle Sunucudan Yasaklandı.`)
  .setAuthor(`${client.user.username} Bot`, message.author.avatarURL({dynamic: true}))
  .setColor(ee.color)
  message.channel.send(ban);
   
}

exports.conf = {
  aliases: [],
}

exports.help = {
  name: "ban",
}