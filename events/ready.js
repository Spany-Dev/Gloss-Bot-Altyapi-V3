const chalk = require('chalk');

const moment = require('moment');

const Discord = require('discord.js');

const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {

    client.user.setStatus('idle') //bura izliyor felan Gördüm sonra beyin yandı bende ya :/
 client.user.setPresence({ activity: { type: "LISTENING", name: `g!yardım | Yakında yeni altyapı!`}, status: 'idle' })
    let komutlar = client.commands.size;

  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);

  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + client.channels.cache.size + ` adet kanala, ` + client.guilds.cache.size + ` adet sunucuya ve ` + client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);

};
