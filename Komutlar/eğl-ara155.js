const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
  
      const sunucubilgi = new Discord.MessageEmbed()
    .setAuthor(message.author.username + ' Polis Geliyor!!!!')
    .setColor(ayarlar.color)
        .setImage(`http://www.hareketligifler.net/data/media/114/polis-hareketli-resim-0023.gif`)
    return message.channel.send(sunucubilgi);
    
}

exports.conf = {
  aliases: [],
};

exports.help = {
  name: 'ara155',
};