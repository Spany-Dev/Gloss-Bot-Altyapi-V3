const Discord = require("discord.js")
const db = require("quick.db")
const ee = require("../ayarlar.json")
exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${ee.e.unlem} Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`);


    let id = makeid(10);
    function makeid(length) {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          }

    const member = message.mentions.users.filter(s => s.ID !== client.user).first()
    const reason = args.slice(1).join(' ');
    if(!member) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} Bot Uyarı`)
        .setColor(ee.color)
        .setDescription(`Merhaba ${message.author}, Eğer bir kişiye uyarı vermek istiyorsan o kişiyi etiketlemen lazım!`)
        return message.channel.send(embed)
    }

    if(!reason) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} Bot Uyarı`)
        .setColor(ee.color)
        .setDescription(`Merhaba sayın ${message.author}, Eğer bir kişiye uyarı vermek istiyorsan bir sebep belirtmen lazım!`)
        return message.channel.send(embed)
    }
    
    if(member.id === message.author.id) return message.channel.send(`${ee.e.no} Kendine uyarı veremezsin!`)
    if(member.id === client.user.id) return message.channel.send(`${ee.e.no} Kendime uyarı veremem!`)
     
    db.push(`uyarı_${member.id}_${message.guild.id}`, { kullanıcı: member.id, sebep: reason, sunucu: message.guild.id, moderator: message.author.id, uyarısayı: id})
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`${client.user.username} Bot Uyarı`)
    .setColor(ee.color)
    .setDescription(`
Merhaba sayın ${message.author}, Başarılı bir şekilde uyarı verdim!
**Kişi Bilgileri:**
> • Adı: \`${member.username}\`
> • İD: \`${member.id}\`
> • Etiket: ${member}

**Moderator Bilgileri:**
> • Adı: \`${message.author.username}\`
> • İD: \`${message.author.id}\`
> • Etiket: ${message.author}

**Uyarı Bilgileri:**
> • Uyarı Sebebi: \`${reason}\`
> • Uyarı Numarası: \`${id}\`
`)
    return message.channel.send(embed)




}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "uyarı",
}