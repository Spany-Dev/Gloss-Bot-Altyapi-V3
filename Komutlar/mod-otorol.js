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
   const kanal = message.mentions.channels.first()
   const rol = message.mentions.roles.first()
   const kanall = db.fetch(`otorolK_${message.guild.id}`)
   const roll = db.fetch(`otorolR_${message.guild.id}`)
   if(!args[0]) {
      const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.unlem} Merhaba, Öncelikle otorol ayarlamak istiyorsan eğer bir değer belirtmelisin! örnek: **${p}otorol ayarla** veya **${p}otorol sıfırla**!`)
   return message.channel.send(embedd)
   } 
   
   if(args[0] === "ayarla") {
	if(!rol) {
	const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.no} Merhaba, Otorol ayarlamak istiyorsan eğer bir rol etiketlemelisin! örnek: **${p}otorol ayarla @üye #kanal**`)
   return message.channel.send(embedd)	
	}
	if(!kanal) {
		const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.no} Merhaba, Otorol ayarlamak istiyorsan eğer bir kanal etiketlemelisin! örnek: **${p}otorol ayarla @üye #kanal**`)
	 return message.channel.send(embedd)	
}
	 
	db.set(`otorolR_${message.guild.id}`, rol.id)
	db.set(`otorolK_${message.guild.id}`, kanal.id)
   const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.yes} Merhaba, Başarılı bir şekilde otorol rolünü ve kanalını ayarladım!\n Ayarlanmış değerler; Kanal: ${kanal} | Rol: ${rol}`)
	 return message.channel.send(embedd)	
   }
   
   if(args[0] === "sıfırla") {
	   if(!kanall && !roll) {
		   const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.unlem} Merhaba, Üzgünüm Ancak Ayarlanmamış şeyleri sıfırlayamazsın!`)
	 return message.channel.send(embedd)	
	   }
	   
	   db.delete(`otorolR_${message.guild.id}`)
	   db.delete(`otorolK_${message.guild.id}`)
	   
	   const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.yes} Başarılı bir şekilde **otorol rolü** ve **otorol kanalı** sıfırlandı!`)
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
    name: "otorol",
}