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
    const mesaj = args.slice(1).join(" ")
    const mesajj = db.fetch(`sayaçMBB_${message.guild.id}`)
    const sayaçhedef = db.fetch(`sayaçH_${message.guild.id}`)
    const kalanüye = message.guild.memberCount - sayaçhedef
 
    if(!args[0]) {
       const embedd = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setDescription(`${ee.e.unlem} Merhaba, Öncelikle sayaç mesajı ayarlamak istiyorsan eğer bir değer belirtmelisin! örnek: **${p}sayaçbbmesaj ayarla** veya **${p}sayaçbbmesaj sıfırla**!`)
      return message.channel.send(embedd)
    } 
    
    if(args[0] === "ayarla") {
     if(!mesaj) {
     const embedd = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setDescription(`${ee.e.no} Merhaba, Sayaç Mesajı ayarlamak istiyorsan eğer bir mesaj belirlemelisin! örnek: **${p}sayaçhgmesaj ayarla <mesaj>**`)
      .addField("Fonksiyonlar:", `> {kullanıcı} => **Giden kullanıcıyı etiketler. (${message.author})**\n> {kullanıcı_adı} => **Kullanıcı adını gösterir. (${message.author.username})**\n> {sunucuadı} => **Sunucu adını gösterir. (${message.guild.name})**\n> {sunucuüyesayısı} => **Sunucuda bulunan üye sayısını gösterir. (${message.guild.memberCount})**\n> {kalanüye} => **Belirlenen hedefe kaç kişi kaldığını gösterir. (${kalanüye})**`)
      return message.channel.send(embedd)	
     }
      
     db.set(`sayaçMBB_${message.guild.id}`, mesaj)
     
    const embedd = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setDescription(`${ee.e.yes} Merhaba, Başarılı bir şekilde sayaç görüşürüz mesajını ayarladım!\n Ayarlanmış değerler; Mesaj: ${mesaj}`)
      return message.channel.send(embedd)	
    }
    
    if(args[0] === "sıfırla") {
        if(!mesajj) {
            const embedd = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setDescription(`${ee.e.unlem} Merhaba, Üzgünüm Ancak Ayarlanmamış şeyleri sıfırlayamazsın!`)
      return message.channel.send(embedd)	
        }
        
        db.delete(`sayaçMBB_${message.guild.id}`)
        
        const embedd = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setDescription(`${ee.e.yes} Başarılı bir şekilde **sayaç mesajı** sıfırlandı!`)
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
    name: "sayaçbbmesaj",
}