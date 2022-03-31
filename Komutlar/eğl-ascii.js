var figlet = require('figlet');
var ee = require("../ayarlar.json")
module.exports.run = (client, message, args, tools) => {
 
  var maxLen = 60 
 
  if(args.join(' ').length > maxLen) return message.channel.send(`${ee.e.no} En fazla ${maxLen} karakter yazabilirsin!`)
 
  if(!args[0]) return message.channel.send(`${ee.e.no}!Lütfen bir yazı girin...`);
 
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log(`${ee.e.no} Bir hata var...`);
          console.dir(err);
          return;
      }
 
      message.channel.send(`${data}`, {code: 'AsciiArt'});
  });
 
 
}
 
exports.conf = {
  aliases: [],
};
 
exports.help = {
  name: 'ascii'
};