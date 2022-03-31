const Discord = require('discord.js');
const ee = require('../ayarlar.json')
const weather = require('weather-js');

exports.run = (client, message, args) => {
  const DBL = require("dblapi.js");
  const dbl = new DBL(`${ee.dbltoken}`,client)
  dbl.hasVoted(message.author.id).then(voted => {
      if(voted === true) {
        
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (result === undefined || result.length === 0) {
          message.channel.send(new Discord.MessageEmbed().setDescription(`${ee.e.no} Lütfen bir yer gir.`).setColor(ee.color));
          return;
      }
      var current = result[0].current;
      var location = result[0].location;
      const embed = new Discord.MessageEmbed()
          .setDescription(`**${current.skytext}**`)
          .setTitle(`${ee.e.stats} ${client.user.username} Hava Durumu`)
          .setThumbnail(current.imageUrl)
          .setColor(ee.color)
.setDescription(`
${ee.e.search} **Aratılan Şehir:** \`${current.observationpoint}\`

${ee.e.stats} **Hava Durumu Bilgileri;**
> Zaman Dilimi: \`UTC${location.timezone}\`
> Derece Türü: \`${location.degreetype}\`
> Sıcaklık: \`${current.temperature} Derece\`
> Hava: \`${current.feelslike}\`
> Rüzgar: \`${current.winddisplay}\`
> Nem: \`${current.humidity}\`
`)
    message.channel.send({embed});
  })
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
};

exports.help = {
  name: "hava-durumu",
};