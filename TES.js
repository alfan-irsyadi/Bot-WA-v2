const TES= require('./cobacoba.js')
const { Client, MessageMedia, GroupChat, Chat } = require('whatsapp-web.js');

// var Group = new GroupChat();
// var wolfram = require('./wolfram.js');
// const qrcode = require('qrcode-terminal');
// const WolframAlphaAPI = require('wolfram-alpha-node');
// const waApi = WolframAlphaAPI("R8HRHU-P5KYRREEH2");
// const js = require('./jadwal_sholat.js');
// const ytdl = require('ytdl-core');
// const Util = require('whatsapp-web.js/src/util/Util');
// const Crypto = require('crypto');
// const { tmpdir } = require('os');


const ur = './alfan.jpg'
const text1 = 'M Alfan Irsyadi Hutagalung'
const text2 = '081276790748'
console.log(TES.gambar(text1, text2, ur))