const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const ee = require("../ayarlar.json")
exports.run = (client, message, params) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(ee.color)
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.MessageEmbed()
    .setAuthor(message.author.username + "Ambulans Geliyor Dayan")
    .setColor(ee.color)
    .setDescription('')
    .setImage(`https://cdn.discordapp.com/attachments/684463435161010273/685138347848499240/giphy.gif`)
    return message.channel.send(sunucubilgi);
    }
};

exports.conf = {
  aliases: [],
};

exports.help = {
  name: 'ara112',
};