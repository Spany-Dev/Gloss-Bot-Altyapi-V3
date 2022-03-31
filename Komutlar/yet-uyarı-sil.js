const Discord = require("discord.js")
const db = require("quick.db")
const ee = require("../ayarlar.json")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${ee.e.unlem} Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`);
    const member = message.mentions.users.filter(s => s.ID !== client.user).first() || message.guild.members.cache.get(args[0])
    const id = args[1]
	if(!id) return message.channel.send(`${ee.e.no} Lütfen bir ID belirt!`)
    if(!member) return message.channel.send(`${ee.e.no} Lütfen bir kullanıcı etiketle!`)
    var data = db.get(`uyarı_${member.id}_${message.guild.id}`)

   if(!db.has(`uyarı_${member.id}_${message.guild.id}`) === true) {
       var yok = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} Bot Uyarı Sil`)
           .setColor(ee.color)
           .setDescription(`${member} Adlı kişinin hiç bir uyarısı yok!`)
           return message.channel.send(yok);
   }

   
   if(data.length === 1) {
       db.delete(`uyarı_${member.id}_${message.guild.id}`)
    var yok = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} Bot Uyarı Sil`)
           .setColor(ee.color)
           .setDescription(`${ee.e.yes} Başarılı bir şekilde ${member} adlı kişinin, **${id}** İD'li uyarısını sildim!`)
           return message.channel.send(yok);
   } else {
    db.set(`uyarı_${member.id}_${message.guild.id}`, data.filter(s => s.uyarısayı !== id))
    var yok = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} Bot Uyarı Sil`)
            .setColor(ee.color)
            .setDescription(`${ee.e.yes} Başarılı bir şekilde ${member} adlı kişinin, **${id}** İD'li uyarısını sildim!`)
            return message.channel.send(yok);
   }
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "uyarı-sil",
}