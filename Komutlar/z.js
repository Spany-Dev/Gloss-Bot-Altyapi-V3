const { MessageEmbed } = require("discord.js")
const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const db = require('quick.db')
const ee = require("../ayarlar.json")
exports.run = async(client, message, args) => {

        if(message.author.bot) return;
        let secenek1 = new MessageMenuOption()
        .setLabel(`Kullanıcı Menüsü`)
        .setValue("kullanıcı")
        .setDescription(`Kullanıcı Komutlarını Gösterir.`)
        .setEmoji(`914669234603315290`)
        .setDefault()
        let secenek2 = new MessageMenuOption()
        .setLabel(`Yetkili Menüsü`)
        .setValue("yetkili")
        .setDescription(`Yetkili Komutlarını Gösterir.`)
        .setEmoji(`914672649660141628`)
        .setDefault()
        let menu = new MessageMenu()
        .setID("MENU")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder(`👉 Lütfen Bir Kategori Seçiniz!`)
        .addOption(secenek1)
        .addOption(secenek2)
        const embed = new MessageEmbed()
        .setAuthor(`${client.user.username} Bot - Yardım Menüsü`, client.user.avatarURL({dynamic: true}))
        .setTitle(`Yardım Menüsü`)
        .setDescription(`
> **・|** Selam ${message.author}, Aşşağıdan Kategori Seçerek Komutları Görebilirsin. Bu Panel Sadece Sana Özeldir Ve Tek Sen Kullanabilirsin Herhang Bir Bilgi İçin [**Destek Sunucumuza**](${ee.destek}) Gelmeyi Unutmayın.

${ee.e.search} **Kategoriler**
> ${ee.e.member} \`Kullanıcı Menüsü\`
> ↳ Kullanıcı Komutlarını Gösterir.
> ${ee.e.fun} \`Yetkili Menüsü\`
> ↳ Eğlence Komutlarını Gösterir.
> ${ee.e.staf} \`Yetkili Menüsü\`
> ↳ Yetkili Komutlarını Gösterir.
> ${ee.e.moderasyon} \`Moderasyon Menüsü\`
> ↳ Moderasyon Komutlarını Gösterir.

        `)
        .setColor(ee.color)
        .setImage(ee.banner)
        let menumesaj = await message.channel.send({embed: embed, menus: menu})
        function menuselection(menu) {
            switch(menu.values[0]) {
                case "kullanıcı":
                    const embed = new MessageEmbed()
                    .setAuthor(`${client.user.username} Bot - Yardım Menüsü`, client.user.avatarURL({dynamic: true}))
                    .setTitle(`Kullanıcı Yardım Menüsü`)
                    .setThumbnail(ee.logo)
                    .setDescription(`sa test`) 
                    .setColor(ee.color)
                   menu.reply.send(embed, true)
                break;
                case "yetkili":
                    const embedz = new MessageEmbed()
                    .setAuthor(`${client.user.username} Bot`, client.user.avatarURL({dynamic: true}))
                    .setTitle(`Yetkili Yardım Menüsü`)
                    .setThumbnail(ee.e.logo)
                    .setDescription(`böyle devam ettir `) 
                    .setColor(ee.color)
                   menu.reply.send(embedz, true)
                break;
            }
        }
        client.on("clickMenu", menu => {
            if(menu.message.id == menumesaj.id) {
                if(menu.clicker.id == message.author.id) {
                    menuselection(menu)
                }else{
                    menu.reply.send("Menü sahibi değilsin!", true)
                }
            }
        })
}

exports.conf = {
  aliases: [],
}
exports.help = {
  name: 'z'
}