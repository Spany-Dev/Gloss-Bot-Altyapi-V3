const Discord = require("discord.js")
const ee = require("../ayarlar.json")
exports.run = (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`${ee.e.unlem} Bu Komutu Kullanabilmek İçin **Mesajları Yönet** İznine Sahip Olmalısın!`);
  if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_MESSAGES")) return message.reply(`${ee.e.unlem} Bu Komutu Kullanabilmek İçin **Mesajları Yönet** İznine Sahip Olmalısın!`);

  
  /*let miktar = args[0];
    if(!miktar || isNaN(miktar)) return message.channel.send("Lütfen Silmek İstediğiniz Miktar Mesajı Belirtiniz.")
    if(miktar > 100) return message.channel.send(`Lütfen 1-100 Arası Bir Değer Belirtin.`)
   message.channel.bulkDelete(miktar)
 message.channel.send(`<a:onaylandi:698113364026720267> Başarılı Bir Şekilde **${miktar}** Mesaj Silindi.`).then(msg => {msg.delete({ timeout: 5000 })}).catch(err => { 
   message.channel.send("Discord APİ 14 günden önceki mesajları silmeme izin vermiyor!")})*/
   let sayı = args[0]
   if(!sayı || isNaN(sayı)) {
	const embed = new Discord.MessageEmbed()
	.setColor(ee.color)
	.setAuthor(`${client.user.usernamr} Bot | Sil Komutu`, message.author.avatarURL({ dynamic: true }))
	.setDescription(`${ee.e.no} Eğer mesajları silmemi istiyorsan lütfen silinicek mesaj miktarını belirt!`)
	return message.channel.send(embed)
   }
   
   if(sayı > 100) {
	  const embed = new Discord.MessageEmbed()
	.setColor(ee.color)
	.setAuthor(`${client.user.username} Bot | Sil Komutu`, message.author.avatarURL({ dynamic: true }))
	.setDescription(`${ee.e.unlem} Üzgünüm ancak Discord kurallarına göre 100'den fazla mesaj silemem!`)
	return message.channel.send(embed) 
   }
   
   message.channel.bulkDelete(sayı, true, { limit: sayı })
   const embed = new Discord.MessageEmbed()
	.setColor(ee.color)
	.setAuthor(`${client.user.username} Bot | Sil Komutu`, message.author.avatarURL({ dynamic: true }))
	.setDescription(`${ee.e.yes} Başarılı bir şekilde **${sayı}** Adet mesaj sildim!`)
	return message.channel.send(embed).then(sa => { sa.delete({ timeout: 5000 }) })
}

exports.conf = {
  aliases: []
}

exports.help = {
  name: "temizle",
}