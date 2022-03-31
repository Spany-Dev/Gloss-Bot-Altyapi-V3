const Discord = require("discord.js")
const db = require("quick.db")
const ee = require("../ayarlar.json")
exports.run = async (client, message, args) => {

    const member = message.mentions.users.filter(s => s.ID !== client.user).first() || message.guild.members.cache.get(args[0]) || message.author 
  
   var data = db.get(`uyarı_${member.id}_${message.guild.id}`)

   if(!db.has(`uyarı_${member.id}_${message.guild.id}`) === true) {
       var yok = new Discord.MessageEmbed()
           .setTitle(`${client.user.username} Bot Uyarı Liste`)
           .setColor(ee.color)
           .setDescription(`${member} Adlı kişinin hiç bir uyarısı yok!`)
           return message.channel.send(yok);
   }

   var list = Object.keys(data).map(_data => {
       return {
           id: (data[_data].kullanıcı),
           uyarısebep: (data[_data].sebep),
           moderator: (data[_data].moderator),
           uyarıid: (data[_data].uyarısayı)
       };
   })

   var embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} Bot Uyarı Liste`)
        .setColor(ee.color)
       .setDescription(`
   ${ee.e.warn} ${member} Adlı kişinin toplamda **${data.length}** Adet uyarısı var!

   ${list.splice(0, 10).map((item, index) => `**${index + 1}.** <@${item.id}> => **${item.uyarısebep}** [Moderator: <@${item.moderator}> (**${item.moderator}**) - Uyarı İD: **${item.uyarıid}**]`).join("\n")}
   `)

   message.channel.send(embed);



}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "uyarı-liste",
}