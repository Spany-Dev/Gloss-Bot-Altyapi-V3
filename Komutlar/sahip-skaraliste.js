const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../ayarlar.json");
exports.run = async(client, message, args) => {
  
  if(message.author.id !== "896272859817734155") return message.channel.send("Bu komutu sadece sahiplerim kullanabilir.")

    let embed = new Discord.MessageEmbed().setColor('RANDOM').setTimestamp()
    if (!args[0]) {
        let data = await db.get(`karaliste.${client.user.id}`) || []

        message.channel.send(embed.setDescription(`
        \`${data.join("\n") || 'Bulunamadı.'}\`
        `))

    }
    if (args[0] === "ekle") {
        let data = await db.get(`karaliste.${client.user.id}`) || []
        let sunucu = args[1]
        if (!sunucu) return message.channel.send(embed.setColor(config.color).setDescription(`Bir sunucu ID belirtmelisin.`))
        if (data.includes(sunucu)) return message.channel.send(embed.setColor(config.color).setDescription(`Bu sunucu zaten kara listede.`))
        db.push(`karaliste.${client.user.id}`, sunucu)
      
        const karalistee = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(`${config.e.ban} ${sunucu} ID li sunucu kara listeye eklendi.`)
        
      client.channels.cache.get("912445366291537962").send(karalistee)
    }
    if (args[0] === "kaldır") {
        let data = await db.get(`karaliste.${client.user.id}`) || []
        let sunucu = args[1]
        if (!sunucu) return message.channel.send(embed.setColor(config.color).setDescription(`Bir sunucu ID belirtmelisin.`))
        if (!data.includes(sunucu)) return message.channel.send(embed.setColor(config.color).setDescription(`Bu sunucu zaten kara listede değil.`))
        db.set(`karaliste.${client.user.id}`, data.filter(x => x !== sunucu))
        
       const karalistek = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(`${config.e.yes} ${sunucu} ID li sunucu kara listeden kaldırıldı.`)
       
      client.channels.cache.get("912445366291537962").send(karalistek)
    }

}
exports.conf = {
aliases: [] 
}
exports.help = {
name: "skaraliste" 
} 
