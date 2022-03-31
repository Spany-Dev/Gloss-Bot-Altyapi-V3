const Discord = require("discord.js")
const ee = require('../ayarlar.json')
let p = ee.prefix
exports.run = async (client, message, args) => {
  
/*
> ${ee.e.mod} **|** Yetkili Komutlarını Görmek İçin **→** \`${p}yardım yetkili\`
> ${ee.e.admin} **|** Moderasyon Komutlarını Görmek İçin **→** \`${p}yardım moderasyon\`
> ⭐ **|** Özel Komutlarını Görmek İçin **→** \`${p}yardım özel\`
> ${ee.e.economy} **|** Ekonomi Komutlarını Görmek İçin **→** \`${p}yardım ekonomi\`
> ${ee.e.images} **|** Resim Komutlarını Görmek İçin **→** \`${p}yardım logo\`
> 📈 **|** Seviye Komutlarını Görmek İçin **→** \`${p}yardım seviye\`
*/
  
if(!args[0]) {
  const embed = new Discord.MessageEmbed()
  .setColor(ee.color)
  .setThumbnail(ee.logo)
  .setImage(ee.banner)
  .setTitle(`❔ ${client.user.username} Yardım Menüsü`)
  .setDescription(`
**${client.user.username}** Bot'u Kullandığınız İçin Teşekkür Ederiz. Botla İlgili Sorularınızı [Destek Sunucumuzdan](${ee.destek}) İletebilirsiniz.
Botumuzla İlgili Detaylara/Bilgilere [Buradan](${ee.destek}) Ulaşabilirsiniz.

**❗ Botumuzun Intentleri Açık Olmadığından Ayarlamalı Sistemler Calışmaz!**

**📁 | Menüler**
> ${ee.e.gen} **|** Kullanıcı Komutlarını Görmek İçin **→** \`${p}yardım kullanıcı\`
> ${ee.e.fun} **|** Eğlence Komutlarını Görmek İçin **→** \`${p}yardım eğlence\`
> ${ee.e.mod} **|** Yetkili Komutlarını Görmek İçin **→** \`${p}yardım yetkili\`

  `)
  return message.channel.send(embed);
};
  
if(args[0] == "kullanıcı") {
  
  const embed = new Discord.MessageEmbed()
  .setColor(ee.color)
  .setThumbnail(ee.logo)
  .setImage(ee.banner)
  .setTitle(`${ee.e.gen} ${client.user.username} Eğlence Menüsü`)
  .setDescription(`
**📁 | Komutlar**
• g!afk => \`AFK Moduna Geçersiniz.\`
• g!alarm => \`Alarm Kurarsınız.\`
• g!avatar => \`Avatarınızı Atar.\`
• g!davet => \`Botun Davet Bilgilerini Atar.\`
• g!hava-durumu => \`Belirttiğiniz Şehrin Hava Durumunu Atar.\`
• g!istatistik => \`Botun İstatistik Verilerini Atar.\`
• g!kullnıcı-bilgi => \`Kullanıcı Bilgilerinizi Verir.\`
• g!ping => \`Botun Gecikme Değerlerini Atar.\`
• g!sunucu-bilgi => \`Sunucunun Bilgilerini Atar.\`
• g!sunucu-ikon => \`Sunucunun Logosunu Atar.\`
• g!sözlük => \`Belirtilen Kelimenin Anlamını Atar.\`
  `)
  return message.channel.send(embed);
  
}
  
if(args[0] == "eğlence") {
  
  const embed = new Discord.MessageEmbed()
  .setColor(ee.color)
  .setThumbnail(ee.logo)
  .setImage(ee.banner)
  .setTitle(`${ee.e.gen} ${client.user.username} Eğlence Menüsü`)
  .setDescription(`
**📁 | Komutlar**
• g!ara112 => \`Ambulans Gifi Atar.\`
• g!ara155 => \`Polis Gifi Atar.\`
• g!ascii => \`Kodlu Yazı Atar.\`
• g!emoji-yazı => \`Şekilli Emojili Yazı Atar.\`
• g!espri => \`Bot Espri Yapar.\`
• g!fbi => \`FBİ Gifi Atar.\`
• g!kafasınasık => \`Etiketlediğin Kişinin Kafasına Ateş Edersin.\`
• g!kralol => \`Kral Gifi Atar.\`
• g!meme => \`Küçük Resim Atar.\`
• g!vine => \`Komik Videolar Atar.\`
`)
  return message.channel.send(embed);
  
}
  
if(args[0] == "yetkili") {
  const embed = new Discord.MessageEmbed()
  .setColor(ee.color)
  .setThumbnail(ee.logo)
  .setImage(ee.banner)
  .setTitle(`${ee.e.mod} ${client.user.username} Yetkili Menüsü`)
  .setDescription(`
**📁 | Komutlar**
• g!uyarı-yardım => \`Uyarı Sistemini Gösterir.\`
• g!ban => \`Etiketlenen Kullanıcıyı Banlar.\`
• g!kick => \`Etiketlenen Kullanıcı Kickler.\`
• g!temizle => \`Belirtilen Rakam Kadar Mesaj Siler.\`
`)
return message.channel.send(embed);
  
}

if(args[0] == "moderasyon") {
const embed = new Discord.MessageEmbed()
  .setColor(ee.color)
  .setThumbnail(ee.logo)
  .setImage(ee.banner)
  .setTitle(`${ee.e.admin} ${client.user.username} Moderasyon Menüsü`)
  .setDescription(`
**📁 | Komutlar**
• g!bot-rol => \`Bot Rolünü Ayarlarsınız.\`
• g!capslock-engel => \`CapsLock Engelini Açarsınız.\`
• g!güvenlik => \`Resimli Güvenlik Kanalını Ayarlarsınız.\`
• g!küfür-engel => \`Küfür Engeli Ayarlarsınız.\`
• g!link-engel => \`Link Engeli Ayarlarsınız.\`
• g!otorol => \`Otorolü Ayarlarsınız.\`
• g!otorol-mesaj => \`Otorol Mesajını Ayarlarsınız.\`
• g!reklam-engel => \`Reklam Engeli Ayarlarsınız.\`
• g!hb-bb => \`Resimli Giriş Çıkışı Ayarlarsınız.\`
• g!sayaç => \`Sayaç Sistemini Ayarlarsınız.\`
• g!sayaçbbmesaj => \`Sayaç Çıkış Mesajını Ayarlarsınız.\`
• g!sayaçhgmesaj => \`Sayaç Giriş Mesajını Ayarlarsınız.\`
`)
return message.channel.send(embed);
  
}
  
if(args[0] == "idjdjdjdjejsjskskksksisjdjjdjrj") {
  
if (message.channel.nsfw === true) {
  const embed = new Discord.MessageEmbed()
  .setColor(ee.color)
  .setThumbnail(ee.logo)
  .setTitle(`🔞 ${client.user.username} Eğlence Menüsü`)
  .setDescription(`
**📁 | Komutlar**
• g!4k => \`4k NSFW Resim Atar.\`
• g!anal => \`anal NSFW Resim Atar.\`
• g!ass => \`ass NSFW Resim Atar.\`
• g!hentai => \`hentai NSFW Resim Atar.\`
• g!holo => \`holo NSFW Resim Atar.\`
• g!pgif => \`+18 NSFW Gif Atar.\`
• g!pussy => \`pussy NSFW Resim Atar.\`
• g!thigh => \`thigh NSFW Resim Atar.\`
  `)
  return message.channel.send(embed);
} else {
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${client.user.username} Bot NSFW`, message.author.avatarURL({dynamic: true}))
  .setColor(ee.color)
  .setDescription(`Hata! Bu kanal **NSFW** olmadığı için belirtilen komutu çalıştıramadım!`)
 // .setImage("")
  return message.channel.send(embed)
}}
}

exports.conf = {
aliases: [] 
}
exports.help = {
name: "yardım" 
} 
