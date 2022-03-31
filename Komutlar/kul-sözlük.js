const Discord = require("discord.js")
const ee = require('../ayarlar.json')
const tdk = require('trsozluk')
let p = ee.prefix
exports.run = async(client, message, args) => {
  const DBL = require("dblapi.js");
  const dbl = new DBL(`${ee.dbltoken}`,client)
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted === true) {
        
    let gsözlük = args.slice(0).join(' ')

    if(!gsözlük) return message.channel.send(`${ee.e.no} Aratmak istediğiniz kelimeyi yazın!`)

    tdk(gsözlük).then(anlam => {

  const embed = new Discord.MessageEmbed()
  .setColor(ee.color)
  .setThumbnail(ee.logo)
  .setTitle(`📖 ${client.user.username} Sözlük`)
  .setDescription(`
${ee.e.search} **Aratılan Kelime:** \`${gsözlük}\`

📋 **| Bilgiler**
• Anlamı: \`${anlam.anlam}\`
• Lisan: \`${anlam.lisan}\`
• Örnek: \`${anlam.ornek}\`
• Atasözü: \`${anlam.atasozu}\`
• Çoğul: \`${anlam.cogul}\`
• Özel: \`${anlam.ozel}\`
• Telaffuz: \`${anlam.telaffuz}\`
  `)
  return message.channel.send(embed);
});

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
aliases: [] 
}
exports.help = {
name: "sözlük" 
} 
