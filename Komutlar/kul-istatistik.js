const Discord = require("discord.js")
const db = require("quick.db")
const moment = require("moment")
const pack = require('../package.json')
const ee = require('../ayarlar.json')
let p = ee.prefix
require("moment-duration-format");

exports.run = async (client, message, args) => {

  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

  const embed = new Discord.MessageEmbed()
  .setColor(ee.color)
  .setThumbnail(ee.logo)
  .setTitle(`${ee.e.stats} ${client.user.username} İstatistik`)
  .setDescription(`
**Genel Bilgiler;**
• Botun Sahibi: <@${ee.sahip}>
• Bellek Kullanımı: \`${(process.memoryUsage().heapUsed / 2024 / 2024).toFixed(2)} MB\`
• Ping: \`${client.ws.ping}\`

**Sürüm Bilgileri;**
• Discord.JS Sürümü: \`${Discord.version}\`
• DataBase Sürümü: \`${db.version}\`
• Node.JS Sürümü: \`${process.version}\`

**Botun Bilgileri;**
• Kullanıcı Sayısı: \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\`
• Sunucu Sayısı: \`${client.guilds.cache.size}\`
• Kanal Sayısı: \`${client.channels.cache.size}\`
• Komut Sayısı: \`${client.commands.size}\`

**Aktiflik Süresi:** 
\`${duration}\`
  `)
  return message.channel.send(embed);
} 
exports.conf = {
aliases: [] 
}
exports.help = {
name: "istatistik"
} 
