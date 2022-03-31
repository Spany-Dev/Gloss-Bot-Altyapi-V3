const Discord = require('discord.js');
const db = require('quick.db');
const ee = require("../ayarlar.json")

exports.run = async(cclient, message, args) => {

if(message.author.id !== "896272859817734155") return message.channel.send("Bu komutu sadece sahiplerim kullanabilir.")

let cuser = message.mentions.users.first() || cclient.users.cache.get(args[0])
if(!cuser) return message.channel.send(" Bir kullanıcı belirtmelisin!")

message.channel.send("**"+cuser.tag+"** kullanıcısı başarıyla karalisteden çıkarıldı.")
const beyaz = new Discord.MessageEmbed()
.setColor(ee.color)
.setTimestamp()
.setDescription(`${ee.e.yes} **${cuser.tag}** kullanıcısı karalisteden çıkarıldı.`)
  cclient.channels.cache.get("912445365276528660").send(beyaz)
db.delete(`ckaraliste.${cuser.id}`)

}
exports.conf = {
aliases: [] 
}
exports.help = {
name: "beyazliste" 
} 
