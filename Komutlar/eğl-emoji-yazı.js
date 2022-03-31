const Discord = require('discord.js');
const ee = require("../ayarlar.json")
let p = ee.prefix
const mapping = {
    ' ': '   ',
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    '!': ':grey_exclamation:',
    '?': ':grey_question:',
    '#': ':hash:',
    '*': '*️⃣'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});


exports.run = function(client, message, args) {


    if (args.length < 1) return message.reply(`${ee.e.no} Lütfen bir mesaj belirt. **Doğru Kullanım**: g!emojiyazı <mesaj>`)
        
    message.channel.send(args.join(' ').split('').map(c => mapping[c] || c).join(' '));

};

exports.conf = {
  aliases: [],
};

exports.help = {
  name: 'emoji-yazı', 
};