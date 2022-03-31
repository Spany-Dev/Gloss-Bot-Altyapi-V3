const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
//require('./ginvite.js')
//require('events').EventEmitter.prototype._maxListeners = 70;
//require('events').defaultMaxListeners = 70;
const db = require("quick.db");
const moment = require("moment")
const canvas = require("canvas")
const ms2 = require('parse-ms')
require("./inlinereply.js");
const { MessageButton, button } = require("discord-buttons");
require("discord-buttons")(client);
//const button = require("discord-buttons");
const disbut = require("discord-buttons");
const prefix = "g!";
client.commands = new Discord.Collection();
const fetch = ("node-fetch");
const fs = require("fs");
      fs.readdir(`./Komutlar`, (error, f) => {
  if (error) {
    return console.error(error);
  }
  let commandes = f.filter(f => f.split(".").pop() === "js");
  if (commandes.length <= 0) {
    return console.log("Aucune commande trouvée !");
  }

   commandes.forEach(f => {
    let commande = require(`./Komutlar/${f}`);
    //console.log(`🚀 ${f} komut yüklendi!`);
    client.commands.set(commande.help.name, commande);
  });
}); 

fs.readdir("./events/", (error, f) => {
  if (error) {
    return console.error(error);
  }
    console.log(`🎉 ${f.length} event!`);

  f.forEach(f => {
    let events = require(`./events/${f}`);
    let event = f.split(".")[0];
    client.on(event, events.bind(null, client));
  });
});

client.on("message", message => {
  if (message.channel.type === "dm") return;
}); 

//OY log

/* const axios = require("axios") 
const express = require('express')
const Topgg = require('@top-gg/sdk')
  
const app = express()
const webhook = new Topgg.Webhook('spacegiveaway3008')
app.post('/dblwebhook', webhook.listener(async (vote) => {
console.log(`${vote.user} Oy verdi!`) 
const user = client.users.fetch(vote.user)
let u = client.users.cache.get(vote.user)
db.set(`voter_${vote.user}`)
const apinego = client.guilds.cache.get("752164000418234448").members.cache.get(vote.user)

    apinego.roles.add("910604475239116860") 
db.add(`toplam_oy_${vote.user}`, 1)
    
let oyver = db.fetch(`toplam_oy_${vote.user}`) 
    
const embed = new Discord.MessageEmbed()
.setColor(ayarlar.color)
.setTitle("Thank you for voting 😍")
.setDescription(`The voter: <@${vote.user}> **|** ${vote.user} 
Role he won: <@&910604475239116860>
Badge he won: \`Voter\`
His total vote: ${oyver} 
`)
const row = new Dbu.MessageActionRow() 
.addComponents(
new MessageButton() 
.setStyle("LINK") 
.setLabel("Vote Link")
.setEmoji("906536068428472320")
.setURL("https://top.gg/bot/904873550568108034/vote") 
) 
client.channels.cache.get('910604497770909758').send({embeds: [embed], components: [row]})
   
})) 

app.listen(10011) 

*/
//eklendim

client.on("guildCreate", async function(guild) {
const owner = client.users.cache.get(guild.ownerID)
const kanal = "912445367759552543" //Eklendim mesajının atılacağı kanal ID'sini giriniz.
const darkcode = new Discord.MessageEmbed()

.setTitle(`Yeni bir sunucuya eklendim`)
.setColor(ayarlar.color)
.addField(`Sunucu Adı`, guild.name)
.addField(`Sunucu Sahibi`, owner.username + "#" +owner.discriminator)
.addField(`Sunucu Üye Sayısı`, guild.memberCount)
client.channels.cache.get(kanal).send({embed: darkcode}).catch(err => console.log("Kanala mesaj atamıyorum!"))
})

//Atıldım

client.on("guildDelete", async function(guild) {

const owner = client.users.cache.get(guild.ownerID)
const kanal = "912445367759552543" //Atıldım mesajının atılacağı kanal ID'sini giriniz.
const darkcode = new Discord.MessageEmbed()

.setTitle(`Bir sunucudan atıldım`)
.setColor(ayarlar.color)
.addField(`Sunucu Adı`, guild.name)
.addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
.addField(`Sunucu Üye Sayısı`, guild.memberCount)
client.channels.cache.get(kanal).send({embed: darkcode}).catch(err => console.log("Kanala mesaj atamıyorum!"))
})


// AFK BAŞLANGIÇ

client.on("message", async message => {
  
  if(message.author.bot) return;
  if(!message.guild) return;
  if(message.content.includes(`${prefix}afk`)) return;
  
  if(await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.reply(`AFK Modundan Çıktınız! ${ayarlar.e.yes}`);
    message.member.setNickname(`${message.author.username}`)
  }
  
  var USER = message.mentions.users.first();
  if(!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);
  
  if(REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms2(Date.now() - süre);
    const embed = new Discord.MessageEmbed()
    .setColor(ayarlar.color)
    .setDescription(`
╔▬▬▬▬▬▬▬ ${ayarlar.e.stats} ▬▬▬▬▬▬▬▬▬
║ • ${USER} Adlı Kullanıcı AFK
║ • AFK Olma Süresi : \`${timeObj.hours} Saat ${timeObj.minutes} Dakika ${timeObj.seconds} Saniye\`
║ • AFK Olma Sebebi : \`${REASON}\`
╚▬▬▬▬▬▬▬ ${ayarlar.e.stats} ▬▬▬▬▬▬▬▬▬
`)
    message.channel.send(embed)
  }
});

// AFK BİTİŞ


//RESİMLİ HG BB
//giriş

var hosgeldinCanvas = {};
hosgeldinCanvas.create = canvas.createCanvas(1300, 730)
hosgeldinCanvas.context = hosgeldinCanvas.create.getContext("2d")
hosgeldinCanvas.context.font = "72px sans-serif"
hosgeldinCanvas.context.fillStyle = "#ffffff"
  
canvas.loadImage("https://media.discordapp.net/attachments/904444443132821595/909500951226908702/HG.png").then(async (img) => {
  hosgeldinCanvas.context.drawImage(img, 0, 0, 1300, 730)
})

client.on("guildMemberAdd", async(member) => {
  if(!db.has(`rgiris_${member.guild.id}`)) return
let kanvas = hosgeldinCanvas;
let x = 537
let y = 109
kanvas.context.beginPath()
    kanvas.context.arc(Math.floor(100 + x), Math.floor(100 + y), 100, 0, Math.PI * 2, true)
    kanvas.context.closePath()
    kanvas.context.clip()
    await canvas.loadImage(member.user.avatarURL({format: "png"})).then(img => {
        kanvas.context.drawImage(img, x, y, 200, 200)
    })
    let resim = new Discord.MessageAttachment(kanvas.create.toBuffer(), "HOSGELDIN-UMEFEK.png")
    client.channels.cache.get(db.fetch(`rgiris_${member.guild.id}`)).send({content: `${member} Sunucuya Katıldı, Hoşgeldin!`, files: [resim]})
});

//çıkış
var gorusuruzCanvas = {};
gorusuruzCanvas.create = canvas.createCanvas(1300, 730)
gorusuruzCanvas.context = gorusuruzCanvas.create.getContext("2d")
gorusuruzCanvas.context.font = "72px sans-serif"
gorusuruzCanvas.context.fillStyle = "#ffffff"

canvas.loadImage("https://media.discordapp.net/attachments/904444443132821595/909501520616243220/BB.png").then(async (img) => {
  gorusuruzCanvas.context.drawImage(img, 0, 0, 1300, 730)
})

client.on("guildMemberRemove", async(member) => {
  if(!db.has(`rgiris_${member.guild.id}`)) return;
let kanvas = gorusuruzCanvas;
let x = 537
let y = 109
kanvas.context.beginPath()
    kanvas.context.arc(Math.floor(100 + x), Math.floor(100 + y), 100, 0, Math.PI * 2, true)
    kanvas.context.closePath()
    kanvas.context.clip()
    await canvas.loadImage(member.user.avatarURL({format: "png"})).then(img => {
        kanvas.context.drawImage(img, x, y, 200, 200)
    })
    let resim = new Discord.MessageAttachment(kanvas.create.toBuffer(), "GORUSURUZ-UMEFEK.png")
    client.channels.cache.get(db.fetch(`rgiris_${member.guild.id}`)).send({content: `${member} Sunucudan Ayrıldı, Görüşürüz!`, files: [resim]})
});

//GÜVENLİK
client.on('guildMemberAdd',async member => {
  let user = client.users.cache.get(member.id);
  let kanal = client.channels.cache.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://media.discordapp.net/attachments/904444443132821595/910188653458882691/312.png')
    const resim2 = await Canvas.loadImage('https://media.discordapp.net/attachments/904444443132821595/910187582380466206/31.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1


     const background = await Canvas.loadImage("https://i.hizliresim.com/qB0nlb.png");
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   if (!kanal) return
       const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'güvenlik.png');
    kanal.send(attachment)
});

//sayaç
client.on("guildMemberAdd", async member => {
  const kanal = await db.fetch(`sayaçK_${member.guild.id}`);
  if (!kanal) return;
  const sayaç = await db.fetch(`sayaçH_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayaçMHG_${member.guild.id}`)
  if (!member.guild.channels.cache.get(kanal)) return;
    if (member.guild.memberCount > sayaç) {
    db.delete(`sayaçK_${member.guild.id}`)
    db.delete(`sayaçH_${member.guild.id}`)
    db.delete(`sayaçMHG_${member.guild.id}`)
    db.delete(`sayacMBB_${member.guild.id}`)
   return client.channels.cache.get(kanal).send(`${ayarlar.e.yes} Sayaç Sıfırlandı! \`${member.guild.memberCount}\` Kişiyiz!`).catch(s => console.log(s))
  } else { 
    if (!mesaj) {
    return client.channels.cache.get(kanal).send(`${ayarlar.e.user} ${member} Adlı Kullanıcı Sunucuya Katıldı! \`${sayaç}\` Kişi Olmamıza \`${sonuç}\` Kişi Kaldı Toplam \`${member.guild.memberCount}\` Kişiyiz! ${ayarlar.e.yes}`).catch(s => console.log(s))
  } else {
    const mesaj31 = mesaj.replace("{kullanıcı}", `${member}`).replace("{sunucuadı}", `**${member.guild.name}**`).replace("{sunucuüyesayısı}", `**${member.guild.memberCount}**`).replace("{kullanıcı_adı}", `**${member.user.username}**`).replace("{kalanüye}", `**${sonuç}**`)
    return client.channels.cache.get(kanal).send(mesaj31).catch(s => console.log(s))
    
  }
  }
});
client.on("guildMemberRemove", async member => {
  const kanal = await db.fetch(`sayaçK_${member.guild.id}`);
  const sayaç = await db.fetch(`sayaçH_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayaçMBB_${member.guild.id}`);
  if (!kanal) return;
  if (!sayaç) return;
    if (member.guild.channels.cache.get(kanal)){
  if (!mesaj) {
    return client.channels.cache.get(kanal).send(`${ayarlar.e.user} ${member} Adlı Kullanıcı Sunucudan Ayrıldı. \`${sayaç}\` Kişi Olmamıza \`${sonuç}\` Kişi Kaldı Toplam \`${member.guild.memberCount}\` Kişiyiz!`).catch(s => console.log(s))
  }
  if (mesaj) {
    const mesaj31 = mesaj.replace("{kullanıcı}", `${member}`).replace("{sunucuadı}", `**${member.guild.name}**`).replace("{sunucuüyesayısı}", `**${member.guild.memberCount}**`).replace("{kullanıcı_adı}", `**${member.user.username}**`).replace("{kalanüye}", `**${sonuç}**`)
    return client.channels.cache.get(kanal).send(mesaj31).catch(s => console.log(s))
  }
     }
});
//sayaç

//otorol
 
client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`otorolR_${member.guild.id}`);
  let kanal = await db.fetch(`otorolK_${member.guild.id}`);
  let mesaj = await db.fetch(`otorolmesaj_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;
  if(member.user.bot) return;
  if(!member.guild.roles.cache.get(rol)){
    db.delete(`otorolmesaj_${member.guild.id}`);
    db.delete(`otorolR_${member.guild.id}`);
    if(member.guild.channels.cache.get(kanal)){
     member.guild.channels.cache.get(kanal).send(`${ayarlar.e.no} Belirlenen Rol Bulunamadı! Bu Yüzden Sıfırlandı!`)
      member.send(`${ayarlar.e.no} Oto Verilcek Rol Ve Kanal Bulunamadığı İçin Otomatik Rol Verme Sıfırlandı Yetkililere Söylemeniz Rica Edilir!`).catch(s => console.log(s))
     db.delete(`otorolK_${member.guild.id}`);
    } else {
       db.delete(`otorolK_${member.guild.id}`);
      member.send(`${ayarlar.e.no} Oto Verilcek Rol Ve Kanal Bulunamadığı İçin Otomatik Rol Verme Sıfırlandı Yetkililere Söylemeniz Rica Edilir!`).catch(s => console.log(s))
   
    }
    return;
  }
if(member.guild.roles.cache.get(rol) && member.guild.channels.cache.get(kanal)){
member.roles.add(rol);
  if (mesaj) {
    client.channels.cache.get(kanal).send(`${ayarlar.e.user} Hoşgeldin ${member} Otomatik Rol Verildi Seninle \`${member.guild.memberCount}\` kişiyiz ${ayarlar.e.yes}`).catch(s => console.log(s))
    return;
  } else {
    var mesaj2 = mesaj
      .replace(`{sunucuadı}`, `**${member.guild.name}**`)
	    .replace(`{sunucuüyesayısı}`, `**${member.guild.memberCount}**`)
      .replace(`{kullanıcı}`, `${member}`)
      .replace(`{kullanıcı_adı}`, `**${member.user.username}**`)
      .replace(`{roladı}`, `**${member.guild.roles.cache.get(rol).name}**`);
    client.channels.cache.get(kanal).send(mesaj2).catch(s => console.log(s))
    return;
  }}
});

 client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`bototorolR_${member.guild.id}`);
    let kanal = await db.fetch(`bototorolK_${member.guild.id}`);
 // let mesaj = await db.fetch(`bototorolmesaj_${member.guild.id}`);
  if (!rol) return;
   if (!kanal) return;
  if(!member.user.bot) return;
  if(!member.guild.roles.cache.get(rol)){
    db.delete(`bototorolmesaj_${member.guild.id}`);
    db.delete(`bototorolR_${member.guild.id}`);
       if(member.guild.channels.cache.get(kanal)){
     member.guild.channels.cache.get(kanal).send(`Belirlenen Rol Bulunamadı! Bu Yüzden Sıfırlandı!`)
     db.delete(`bototorolK_${member.guild.id}`);
    } else {
     db.delete(`bototorolK_${member.guild.id}`);
    } return;
  }
if(member.guild.roles.cache.get(rol) && member.guild.channels.cache.get(kanal)){
  member.roles.add(rol);
 /* if (mesaj) {
    client.channels.cache.get(kanal).send(`${ayarlar.e.user} Hoşgeldin ${member} Otomatik Rol Verildi Seninle \`${member.guild.memberCount}\` kişiyiz ${ayarlar.e.yes} [Bot]`).catch(s => console.log(s))
    return;
  } else {
    var mesaj2 = mesaj
      .replace(`{sunucuadı}`, `**${member.guild.name}**`)
	  .replace(`{sunucuüyesayısı}`, `**${member.guild.memberCount}**`)
      .replace(`{kullanıcı}`, `${member}`)
      .replace(`{kullanıcı_adı}`, `**${member.user.username}**`)
      .replace(`{roladı}`, `**${member.guild.roles.cache.get(rol).name}**`);
    client.channels.cache.get(kanal).send(mesaj2).catch(s => console.log(s))
    return;
  }*/
  }
});

//OTOROL

//CAPSLOCK
client.on("message", async (message) => {
  if(!message.guild) return;
  if(message.author.bot) return;
  let capslock = db.fetch(`capslock_${message.guild.id}`)

  if(capslock === "aktif") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      if(message.mentions.channels.first()) return;
	  let caps = message.content.replace(" ", "").toUpperCase();
      let emoji = message.guild.emoji
      if(message.content.startsWith("https://") || message.content.startsWith("http://")) return;
      if(message.content === message.guild.emoji) return;
      if(message.content === caps) {
        let mesajj = [
          `${ayarlar.e.unlem} ${message.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın büyük harfle yazması?`,
          `${ayarlar.e.unlem} ${message.author}, Seni gidi terbiyesiz seni! Bu sunucuda Büyük Harf Engel Filtresi aktif! Bu yüzden büyük harfle yazamazsın!`,
          `${ayarlar.e.unlem} ${message.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden büyük harfle yazamazsın!`,
          `${ayarlar.e.unlem} ${message.author}, Hop! Terbiyeni koru! bu sunucuda büyük harfle yazamazsın!`
        ]
          let mesaj = Math.floor((Math.random() * mesajj.length));

          let id = makeid(10);
            function makeid(length) {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          }

            db.push(`uyarı_${message.author.id}_${message.guild.id}`, { kullanıcı: message.author.id, sebep: "Büyük Harfle Yazmak", sunucu: message.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add("günlük_capslock", +1)

            message.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(ayarlar.color)
            .setDescription(`${mesajj[mesaj]}`)
            return message.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
        }
    }
  }

  if(!capslock) return;
})

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if(!oldMessage.guild) return;
  if(oldMessage.author.bot) return;

  let capslock = db.fetch(`capslock_${oldMessage.guild.id}`)

  if(capslock === "aktif") {
    if(!oldMessage.member.hasPermission("MANAGE_MESSAGES")) {
      if(newMessage.mentions.channels.first()) return;
      let emoji = oldMessage.guild.emoji
      if(newMessage.content.startsWith("https://") || newMessage.content.startsWith("http://")) return;
      if(newMessage.content === emoji) return;
      if(newMessage.content.toUpperCase()) {
        let mesajj = [
          `${ayarlar.e.unlem} ${oldMessage.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın büyük harfle yazması?`,
          `${ayarlar.e.unlem} ${oldMessage.author}, Seni gidi terbiyesiz seni! Bu sunucuda Büyük Harf Engel Filtresi aktif! Bu yüzden büyük harfle yazamazsın!`,
          `${ayarlar.e.unlem} ${oldMessage.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden büyük harfle yazamazsın!`,
          `${ayarlar.e.unlem} ${oldMessage.author}, Hop! Terbiyeni koru! bu sunucuda büyük harfle yazamazsın!`
        ]
          let mesaj = Math.floor((Math.random() * mesajj.length));

          let id = makeid(10);
            function makeid(length) {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          }

            db.push(`uyarı_${oldMessage.author.id}_${oldMessage.guild.id}`, { kullanıcı: oldMessage.author.id, sebep: "Mesajını Düzenleyerek Büyük Harfle Yazmak", sunucu: oldMessage.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add("günlük_capslock", +1)

            newMessage.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} Bot`, oldMessage.author.avatarURL({dynamic: true}))
            .setColor(ayarlar.color)
            .setDescription(`${mesajj[mesaj]}`)
            return oldMessage.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
        } else return;
    } else return;
  }

  if(!capslock) return;
})
//capslock
//küfürengel
const kufur = [
        "siktir",
        "fuck",
        "puşt",
        "pust",
        "piç",
        "sikerim",
        "sik",
        "yarra",
        "yarrak",
        "amcık",
        "orospu",
        "orosbu",
        "orosbucocu",
        "oç",
        ".oc",
        "ibne",
        "yavşak",
        "bitch",
        "dalyarak",
        "amk",
        "awk",
        "taşak",
        "taşşak",
        "daşşak",
		"sikm",
		"sikim",
		"sikmm",
		"skim",
		"skm",
		"sg"
      ];

client.on("message", message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let küfür = db.fetch(`küfürE_${message.guild.id}`)

  if(küfür === "aktif") {
   if(message.member.hasPermission("ADMINISTRATOR")) return;
   let mesajj = [
    `${ayarlar.e.unlem} ${message.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insana küfür etmek ?`,
    `${ayarlar.e.unlem} ${message.author}, Seni gidi terbiyesiz seni! Bu sunucuda Küfür Engel Filtresi aktif! Bu yüzden küfür edemezsin!`,
    `${ayarlar.e.unlem} ${message.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden küfür edemezsin!`,
    `${ayarlar.e.unlem} ${message.author}, Hop! Terbiyeni koru! bu sunucuda küfür edemezsin!`
  ]
    let mesaj = Math.floor((Math.random() * mesajj.length));
    if(kufur.some(word => message.content.includes(word))) {
          if (!message.mentions.users.first()) {
            let id = makeid(10);
            function makeid(length) {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          }

            db.push(`uyarı_${message.author.id}_${message.guild.id}`, { kullanıcı: message.author.id, sebep: "Küfür Etmek", sunucu: message.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`küfür`, +1)
			      message.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(ayarlar.color)
            .setDescription(`${mesajj[mesaj]}`)
            return message.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
          }
      }
  }

  if(!küfür) return;
})

client.on("messageUpdate", (oldMessage, newMessage) => {
  if(oldMessage.author.bot) return;
  if(oldMessage.channel.type === "dm") return;

  let küfür = db.fetch(`küfürE_${oldMessage.guild.id}`)

  if(küfür === "aktif") {
   if(oldMessage.member.hasPermission("ADMINISTRATOR")) return;
   let mesajj = [
    `${ayarlar.e.unlem} ${oldMessage.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insana mesajını düzenleyerek küfür etmek ?`,
    `${ayarlar.e.unlem} ${oldMessage.author}, Seni gidi terbiyesiz seni! Bu sunucuda Küfür Engel Filtresi aktif! Bu yüzden küfür mesajını düzenleyerek edemezsin!`,
    `${ayarlar.e.unlem} ${oldMessage.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden mesajını düzenleyerek küfür edemezsin!`,
    `${ayarlar.e.unlem} ${oldMessage.author}, Hop! Terbiyeni koru! bu sunucuda mesajını düzenleyerek küfür edemezsin!`
  ]
    let mesaj = Math.floor((Math.random() * mesajj.length));
    if(kufur.some(word => newMessage.content.includes(word))) {
          if (!oldMessage.mentions.users.first()) {
            let id = makeid(10);
            function makeid(length) {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          }

            db.push(`uyarı_${oldMessage.author.id}_${oldMessage.guild.id}`, { kullanıcı: oldMessage.author.id, sebep: "Mesajını Düzenleyerek Küfür Etmek", sunucu: oldMessage.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`küfür`, +1)
			      newMessage.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} Bot`, oldMessage.author.avatarURL({dynamic: true}))
            .setColor(ayarlar.color)
            .setDescription(`${mesajj[mesaj]}`)
            return newMessage.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
          }
      }
  }

  if(!küfür) return;
})
//küfürengel
//linkengel
client.on("message", message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let linkk = db.fetch(`linkK_${message.guild.id}`)

  if(linkk === "aktif") {
   if(message.member.hasPermission("ADMINISTRATOR")) return;
   let link = ["https://", "http://", "http", "https", "www", "www.", ".ly", ".com", ".net", ".com.tr", ".org", ".xyz", ".istanbul", ".store", "site", ".glitch.me", ".ml", ".cf", ".tk", ".rf", ".gf", ".org.tr", ".net.tr", ".info", ".av.tr", ".gen.tr", ".k12.tr", ".bel.tr", ".info.tr", ".biz.tr", ".gov.tr", ".web.tr", ".tv.tr", ".online", ".host", ".website", ".club", ".kim", ".email", ".store", ".blog", ".tech", ".promo", ".pink", ".blue", ".cafe", ".center", ".chat", ".city", ".company", ".life", ".ltd", ".media", ".salon", ".run", ".co", ".us", ".name", ".tv", ".pro", ".mobi", ".ist", ".cc", ".biz", ".bbs.tr", ".dr.tr", ".gg", ".me"]
   /*var regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );*/
   let mesajj = [
    `${ayarlar.e.unlem} ${message.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın link atması?`,
    `${ayarlar.e.unlem} ${message.author}, Seni gidi terbiyesiz seni! Bu sunucuda Link Engel Filtresi aktif! Bu yüzden link atamazsın!`,
    `${ayarlar.e.unlem} ${message.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden link atamazsın!`,
    `${ayarlar.e.unlem} ${message.author}, Hop! Terbiyeni koru! bu sunucuda link atamazsın!`
  ]
    let mesaj = Math.floor((Math.random() * mesajj.length));
    if (link.some(word => message.content.includes(word)) === true) {
          if (!message.mentions.users.first()) {
            let id = makeid(10);
            function makeid(length) {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          }

            db.push(`uyarı_${message.author.id}_${message.guild.id}`, { kullanıcı: message.author.id, sebep: "Link Atmak", sunucu: message.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`günlük_link`, +1)
			      message.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(ayarlar.color)
            .setDescription(`${mesajj[mesaj]}`)
            return message.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
          }
      }
  }

  if(!linkk) return;
})

client.on("messageUpdate", (oldMessage, newMessage) => {
  if(oldMessage.author.bot) return;
  if(oldMessage.channel.type === "dm") return;

  let linkk = db.fetch(`linkK_${oldMessage.guild.id}`)

  if(linkk === "aktif") {
   if(oldMessage.member.hasPermission("ADMINISTRATOR")) return;
   let link = ["https://", "http://", "http", "https", "www", "www.", ".ly", ".com", ".net", ".com.tr", ".org", ".xyz", ".istanbul", ".store", "site", ".glitch.me", ".ml", ".cf", ".tk", ".rf", ".gf", ".org.tr", ".net.tr", ".info", ".av.tr", ".gen.tr", ".k12.tr", ".bel.tr", ".info.tr", ".biz.tr", ".gov.tr", ".web.tr", ".tv.tr", ".online", ".host", ".website", ".club", ".kim", ".email", ".store", ".blog", ".tech", ".promo", ".pink", ".blue", ".cafe", ".center", ".chat", ".city", ".company", ".life", ".ltd", ".media", ".salon", ".run", ".co", ".us", ".name", ".tv", ".pro", ".mobi", ".ist", ".cc", ".biz", ".bbs.tr", ".dr.tr", ".gg", ".me"]
   /*var regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );*/
   let mesajj = [
    `${ayarlar.e.unlem} ${oldMessage.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın mesajının düzenleyerek link atması?`,
    `${ayarlar.e.unlem} ${oldMessage.author}, Seni gidi terbiyesiz seni! Bu sunucuda Link Engel Filtresi aktif! Bu yüzden mesajını düzenleyerek link atamazsın!`,
    `${ayarlar.e.unlem} ${oldMessage.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden mesajını düzenleyerek link atamazsın!`,
    `${ayarlar.e.unlem} ${oldMessage.author}, Hop! Terbiyeni koru! bu sunucuda mesajını düzenleyerek link atamazsın!`
  ]
    let mesaj = Math.floor((Math.random() * mesajj.length));
    if (link.some(word => newMessage.content.includes(word)) === true) {
          if (!oldMessage.mentions.users.first()) {
            let id = makeid(10);
            function makeid(length) {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          }

            db.push(`uyarı_${oldMessage.author.id}_${oldMessage.guild.id}`, { kullanıcı: oldMessage.author.id, sebep: "Mesajını Düzenleyerek Link Atmak", sunucu: oldMessage.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`günlük_link`, +1)
			      newMessage.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} Bot`, oldMessage.author.avatarURL({dynamic: true}))
            .setColor(ayarlar.color)
            .setDescription(`${mesajj[mesaj]}`)
            return newMessage.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
          }
      }
  }

  if(!linkk) return;
})
//Link Engel

//Reklam Engel

client.on('message', async message => {
  if (!message.guild) return;
  const veri = db.fetch(`reklamK_${message.guild.id}`)
  if (!veri) return;
  if (veri === "aktif") {
      const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
      if (swearWords.some(word => message.content.includes(word))) {
          try {
              if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                let id = makeid(10);
            function makeid(length) {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          }

            db.push(`uyarı_${message.author.id}_${message.guild.id}`, { kullanıcı: message.author.id, sebep: "Reklam Yapmak", sunucu: message.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`günlük_reklam`, +1)
                let mesajj = [
                  `${ayarlar.e.unlem} ${message.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın reklam yapması?`,
                  `${ayarlar.e.unlem} ${message.author}, Seni gidi terbiyesiz seni! Bu sunucuda Reklam Engel Filtresi aktif! Bu yüzden reklam yapamazsın!`,
                  `${ayarlar.e.unlem} ${message.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden reklam yapamazsın!`,
                  `${ayarlar.e.unlem} ${message.author}, Hop! Terbiyeni koru! bu sunucuda reklam yapamazsın!`
                ]
                let mesaj = Math.floor((Math.random() * mesajj.length));
                message.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.user.username} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(ayarlar.color)
            .setDescription(`${mesajj[mesaj]}`)
           return message.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);  
                        }
          } catch(error) {
              console.log(error);
          }
      }
  }
})

client.on('messageUpdate', async (newMessage, oldMessage) => {
  if (!oldMessage.guild) return;
  const veri = db.fetch(`reklamK_${oldMessage.guild.id}`)
  if (!veri) return;
  if (veri === "aktif") {
      const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
      if (swearWords.some(word => newMessage.content.includes(word))) {
          try {
              if (!oldMessage.member.hasPermission("MANAGE_MESSAGES")) {
                let id = makeid(10);
            function makeid(length) {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          }

            db.push(`uyarı_${oldMessage.author.id}_${oldMessage.guild.id}`, { kullanıcı: oldMessage.author.id, sebep: "Mesajını Düzenleyerek Reklam Yapmak", sunucu: oldMessage.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`günlük_reklam`, +1)
                let mesajj = [
                  `${oldMessage.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın mesajını düzenleyerek reklam yapması?`,
                  `${oldMessage.author}, Seni gidi terbiyesiz seni! Bu sunucuda Mesajını Düzenleyerek Reklam Engel Filtresi aktif! Bu yüzden reklam yapamazsın!`,
                  `${oldMessage.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden mesajını düzenleyerek reklam yapamazsın!`,
                  `${oldMessage.author}, Hop! Terbiyeni koru! bu sunucuda mesajını düzenleyerek reklam yapamazsın!`
                ]
                let mesaj = Math.floor((Math.random() * mesajj.length));
                newMessage.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, oldMessage.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`${mesajj[mesaj]}`)
            .setFooter(client.ayarlar.embedFooter, oldMessage.author.avatarURL({dynamic: true}))
            return oldMessage.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);  
                        }
          } catch(error) {
              console.log(error);
          }
      }
  }
})

client.login(ayarlar.token);