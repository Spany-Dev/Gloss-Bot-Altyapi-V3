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
      const rol = message.mentions.roles.first()
      const roll = db.fetch(`bototorolR_${message.guild.id}`)
   if(!args[0]) {
      const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.unlem} Merhaba, Öncelikle otorol ayarlamak istiyorsan eğer bir değer belirtmelisin! örnek: **${p}bot-rol ayarla** veya **${p}bot-rol sıfırla**!`)
   return message.channel.send(embedd)
   } 
   
   if(args[0] === "ayarla") {
	if(!rol) {
	const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.no} Merhaba, Otorol ayarlamak istiyorsan eğer bir rol etiketlemelisin! örnek: **${p}otorol ayarla @botrol**`)
   return message.channel.send(embedd)	
	}
	 
	db.set(`bototorolR_${message.guild.id}`, rol.id)
	   const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.yes} Merhaba, Başarılı bir şekilde otorol rolünü ayarladım!\n Ayarlanmış değerler; Bot Rol: ${rol}`)
	 return message.channel.send(embedd)	
   }
   
   if(args[0] === "sıfırla") {
	   if(!roll) {
		   const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.unlem} Merhaba, Üzgünüm Ancak Ayarlanmamış şeyleri sıfırlayamazsın!`)
	 return message.channel.send(embedd)	
	   }
	   
	   db.delete(`bototorolR_${message.guild.id}`)
	      
	   const embedd = new Discord.MessageEmbed()
	 .setColor(ee.color)
	 .setDescription(`${ee.e.yes} Başarılı bir şekilde **bot rolü** sıfırlandı!`)
	     return message.channel.send(embedd)	
   }
} else {
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
    name: "bot-rol",
}