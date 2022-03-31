const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../ayarlar.json");
exports.run = async(client, message, args) => {
  
  if(message.author.id !== "896272859817734155") return message.channel.send("Bu komutu sadece sahiplerim kullanabilir.")

let cuser = message.mentions.users.first() || client.users.cache.get(args[0])
if(!cuser) return message.channel.send(" Bir kullanıcı belirtmelisin!")
let csebep = args.slice(1).join(' ')
if(!csebep) return message.channel.send(" Bir sebep belirtmelisin!")

message.channel.send("**"+cuser.tag+"** kullanıcısı **"+csebep+"** sebebinden başarıyla karalisteye alındı.")
const gkar = new Discord.MessageEmbed()
.setColor(config.color)
.setTimestamp()
.setDescription(`${config.e.ban} **${cuser.tag}** kullanıcısı **${csebep}** sebebinden karalisteye alındı.`)
client.channels.cache.get("912445365276528660").send(gkar)
db.set(`ckaraliste.${cuser.id}`, csebep)

  
}
exports.conf = {
aliases: [] 
}
exports.help = {
name: "kkaraliste" 
} 
