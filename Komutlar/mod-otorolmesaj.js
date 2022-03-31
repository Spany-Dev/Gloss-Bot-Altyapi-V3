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

            if(!args[0]) {
                const embedd = new Discord.MessageEmbed()
               .setColor(ee.color)
               .setDescription(`${ee.e.unlem} Merhaba, Öncelikle otorol mesajı ayarlamak istiyorsan eğer bir değer belirtmelisin! örnek: **${p}otorolmesaj ayarla** veya **${p}otorolmesaj sıfırla**!`)
              return message.channel.send(embedd)
             } 
             
             if(args[0] === "ayarla") {
                   if(!mesaj) {
                      const embedd = new Discord.MessageEmbed()
                      .setColor(ee.color)
                      .setDescription(`${ee.e.no} Merhaba, Öncelikle otorol mesajı ayarlamak istiyorsan eğer bir mesaj belirtmelisin! örnek: **${p}otorolmesaj ayarla <mesaj>**`)
                      .addField("Fonksiyonlar:", `> {kullanıcı} => **Gelen kullanıcıyı etiketler. (${message.author})**\n> {kullanıcı_adı} => **Kullanıcı adını gösterir. (${message.author.username})**\n> {sunucuadı} => **Sunucu adını gösterir. (${message.guild.name})**\n> {sunucuüyesayısı} => **Sunucuda bulunan üye sayısını gösterir. (${message.guild.memberCount})**\n> {roladı} => **Verilecek rolün adını yazar.**`)
                      return message.channel.send(embedd)
                   }
          
                   db.set(`otorolmesaj_${message.guild.id}`, mesaj)
                   const embedd = new Discord.MessageEmbed()
                  .setColor(ee.color)
                  .setDescription(`${ee.e.yes} Merhaba, Başarılı bir şekilde otorol mesajını ayarladım!\n Ayarlanmış değer: **${mesaj}**`)
                 return message.channel.send(embedd)
             }
             
             if(args[0] === "sıfırla") {
                 db.delete(`otorolmesaj_${message.guild.id}`)
                 const embedd = new Discord.MessageEmbed()
               .setColor(ee.color)
               .setDescription(`${ee.e.yes} Merhaba, Başarılı bir şekilde otorol mesajı sıfırlandı!`)
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
    name: "otorolmesaj",
}