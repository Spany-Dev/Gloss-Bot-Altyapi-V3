const Discord = require("discord.js")
const db = require("quick.db")
const ee = require("../ayarlar.json")
let p = ee.prefix
exports.run = async (client, message, args, prefix) => {
  const DBL = require("dblapi.js");
  const dbl = new DBL(`${ee.dbltoken}`,client)
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted === true) {
        
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${ee.e.unlem} Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`);
   let kanal = message.mentions.channels.first() 
   let hedef = args[2]
   let kalan = args[2] - message.guild.memberCount
   const kanall =  db.fetch(`sayaçK_${message.guild.id}`)
   const hedeff =  db.fetch(`sayaçH_${message.guild.id}`)

   if(!args[0]) {
      const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.unlem} Merhaba, Öncelikle sayaç ayarlamak istiyorsan eğer bir değer belirtmelisin! örnek: **${p}sayaç ayarla #kanal <hedef>** veya **${p}sayaç sıfırla**!`)
	 return message.channel.send(embedd)
   } 
   
   if(args[0] === "ayarla") {
	if(!hedef) {
	const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.no} Merhaba, Sayaç ayarlamak istiyorsan eğer bir hedef belirlemelisin! örnek: **${p}sayaç ayarla #kanal <hedef>**`)
	  return message.channel.send(embedd)	
	}
	if(!kanal) {
		const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.no} Merhaba, Sayaç ayarlamak istiyorsan eğer bir kanal etiketlemelisin! örnek: **${p}sayaç ayarla #kanal <hedef>**`)
     return message.channel.send(embedd)	
	}

	db.set(`sayaçK_${message.guild.id}`, kanal.id) 
	db.set(`sayaçH_${message.guild.id}`, hedef)
   const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.yes} Merhaba, Başarılı bir şekilde sayaç hedefini ve kanalını ayarladım!\n Ayarlanmış değerler; Kanal: ${kanal} • Hedef: **${hedef}**`)
	 .setFooter("Copyright © Gloss Bot 2020", client.user.avatarURL())
   return message.channel.send(embedd)	
   }
   
   if(args[0] === "sıfırla") {
	   if(!kanall && !hedeff) {
		   const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.unlem} Merhaba, Üzgünüm Ancak Ayarlanmamış şeyleri sıfırlayamazsın!`)
     return message.channel.send(embedd)	
	   }
	   
	   db.delete(`sayaçH_${message.guild.id}`)
	   db.delete(`sayaçK_${message.guild.id}`)
	   
	   const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.yes} Başarılı bir şekilde **sayaç hedefi** ve **sayaç kanalı** sıfırlandı!`)
     return message.channel.send(embedd)	
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
    name: "sayaç",
}