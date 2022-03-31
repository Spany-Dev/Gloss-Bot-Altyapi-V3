const Discord = require("discord.js")
const ee = require('../ayarlar.json')
let p = ee.prefix
exports.run = async (client, message, args) => {

  const embed = new Discord.MessageEmbed()
  .setColor(ee.color)
  .setThumbnail(ee.logo)
  .setImage(ee.banner)
  .setTitle(`${client.user.username} Uyarı Yardım`)
  .setDescription(`
**📁 | Komutlar**
• g!uyarı => \`Etiketlediğiniz Kişiyi Uyarırsınız.\`
• g!uyarı-liste => \`Etiketlediğiniz Kişinin Uyarılarına Bakarsınız.\`
• g!uyarı-sil => \`Kişinin Uyarı ID'sini Yazarak Uyarısını Silersiniz.\`
  `)
  return message.channel.send(embed);
} 
exports.conf = {
aliases: [] 
}
exports.help = {
name: "uyarı-yardım" 
} 
