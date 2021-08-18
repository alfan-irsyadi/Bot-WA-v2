const TES= require('./cobacoba.js')
const { Client, MessageMedia, GroupChat, Chat } = require('whatsapp-web.js');
var base64Img = require('base64-img');
var Group = new GroupChat();
var wolfram = require('./wolfram.js');
const qrcode = require('qrcode-terminal');
const WolframAlphaAPI = require('wolfram-alpha-node');
const waApi = WolframAlphaAPI("R8HRHU-P5KYRREEH2");
const js = require('./jadwal_sholat.js');
const ytdl = require('ytdl-core');
const Util = require('whatsapp-web.js/src/util/Util');
const path = require('path');
const Crypto = require('crypto');
const { tmpdir } = require('os');
const ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath('./lib/ffmpeg/bin/ffmpeg.exe')
const fa = require('fs').promises;
const fs = require('fs');
// const fitur = require('./lib/fitur/fitur1.js');
const grup = require('./lib/JSON/fitur.js')
const instagram_download = require ('@juliendu11/instagram-downloader');
const remove_bg_1 = require("remove.bg")
const lyricsFinder = require('lyrics-finder');
const {formatVideoToAudio, downloadAndSave, setRandom} = require('./lib/fitur/fungsi.js')
const googleTTS = require('google-tts-api'); 
const yts = require('yt-search')
const simple_instagram_api_1 = require("simple-instagram-api");
var converter = require('video-converter');
var wrap = require('word-wrap');
Util.setFfmpegPath('./lib/ffmpeg/bin/ffmpeg.exe');
// Path where the session data will be stored
const SESSION_FILE_PATH = './lib/session.json';
var prefix = '~!';
const menu = `
──────▄▀▄─────▄▀▄
─────▄█░░▀▀▀▀▀░░█▄
─▄▄──█░░░░░░░░░░░█──▄▄
█▄▄█─█░░▀░░┬░░▀░░█─█▄▄█
███████████████████████
█                     
█ ▄▀█ █░░ █▀▀ █▄░█    
█ █▀█ █▄▄ █▀░ █░▀█ ▄  
█                     
█ █▄▄ █▀█ ▀█▀         
█ █▄█ █▄█ ░█░         
█                                   
███████████████████████

🅼🅴🅽🆄:\n
\u25E9 *${prefix}sticker*
\u25E9 *${prefix}wolfram >> soal*
\u25E9 *${prefix}tagsemua*
\u25E9 *${prefix}hidetag*
\u25E9 *${prefix}spam >> nomor >> X*
\u25E9 *${prefix}set-nama >> nama*
\u25E9 *${prefix}set-status >> status*
\u25E9 *${prefix}lirik >> Artis >> judul*
\u25E9 *${prefix}download-yt >> link youtube*
\u25E9 *${prefix}mp3*
\u25E9 *${prefix}nobg*
\u25E9 *${prefix}menu-bicara*
\u25E9 *${prefix}info*

Maaf karena Perintahnya masih sedikit :D`;

const menuBic =
`
Menu Bicara:
______________________________________
1. *${prefix}bilang*, *${prefix}say*, atau *${prefix}katakan*:
______________________________________
>> Fungsi:
    *Melakukan bot untuk*
    *mengucapkan satu kalimat.*
>> Contoh:
    *${prefix}say* >> *kode* >> *kata*

______________________________________
2. *${prefix}baca* atau *${prefix}bacakan*
______________________________________
>> Fungsi:
    *Melakukan bot untuk mengucapkan*
    *sesuatu (>=1 kalimat).*
>> Contoh:
    *${prefix}bacakan* >> *kode* >> *kalimat*


>>Keterangan:
>>kode  :{
    *id*: Untuk *Indonesia*,
    *en*: untuk *English*,
    *ko*: Untuk *Korea*,

    untuk informasi lebih lanjut,
    klik *tautan dibawah ini*:
    https://cloud.google.com/speech-to-text/docs/languages
}
`;

const info = 
`──────▄▀▄─────▄▀▄
─────▄█░░▀▀▀▀▀░░█▄
─▄▄──█░░░░░░░░░░░█──▄▄
█▄▄█─█░░▀░░┬░░▀░░█─█▄▄█
███████████████████████
█                     
█ ▄▀█ █░░ █▀▀ █▄░█    
█ █▀█ █▄▄ █▀░ █░▀█ ▄  
█                     
█ █▄▄ █▀█ ▀█▀         
█ █▄█ █▄█ ░█░         
█                                   
███████████████████████

*Info Pembuat BOT / Bot Creator\n\n`+

'ℕ𝕒𝕞𝕖 : 𝙰𝚕𝚏𝚊𝚗 𝙸𝚛𝚜𝚢𝚊𝚍𝚒.\n' +
'𝔽𝕣𝕠𝕞  : ```Riau.```\n'+
'𝔸𝕘𝕖    : ```3.425.733 mod 1712.```\n'+
'𝕚𝔾       : https://instagram.com/alfanirsyadi_\n\n'+
'```BUKAN SIAPA SIAPA```';



const ALFAN =  'BEGIN:VCARD\n' +
      'VERSION:3.0\n' +
      'N:Irsyadi\u2705;Alfan;;\n' +
      'FN:Alfan Irsyadi\u2705\n' +
      'item1.TEL;waid=6281276790748:+62 812-7679-0748\n' +
      'item1.X-ABLabel:Nomor Telepon Alfan Ganteng\n' +
      'END:VCARD';
const JOKI =  'BEGIN:VCARD\n' +
      'VERSION:3.0\n' +
      'N:Matematika\u2705;Joki;Tugas;;\n' +
      'FN:Joki Tugas Matematika\u2705\n' +
      'item1.TEL;waid=6285265411944:+62 852-6541-1944\n' +
      'item1.X-ABLabel:Nomor Telepon Joki Matematika\n' +
      'END:VCARD'

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    session: sessionData,
    // puppeteer: {
    //     executablePath: 'C:\Program Files\Google\Chrome\Application\chrome.exe',
    // }
});
let nama_pemain = [];


client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    //.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
}); 

client.on('ready', async() => {
    console.log('Client is ready!');
    var kontak = await client.getContactById('6281276790748@c.us')
    // var alfin = await alfn.getProfilePicUrl()

    // console.log(alfin)
    client.sendMessage('6285265411944-1626358271@g.us', 'Client is Ready!!!')
    // // const ur = 'https://pps.whatsapp.net/v/t61.24694-24/162753520_349051389789341_6758988584709896378_n.jpg?ccb=11-4&oh=e6031b96962f28c100131af04a5cc214&oe=60B02EC2'
    
    
    
});


// Save session values to the file upon successful auth

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

async function download(url){
	try{
		const value = await instagram_download.downloadMedia(url, 'tmp/')
		return value
		
	}
	catch(err){
		console.log(err)
	}
}

async function ytmp4(url, nama){
	try{
		await ytdl(url).pipe(fs.createWriteStream(nama));
		return 1;
	}
	catch(err){
		console.log(err);
	}
}

const logging = async (msg) => {
    var chat = msg.getChat();
    if(!chat.isGroup){
        console.log('chat.id : ${msg.body}');
    }
    else{
        console.log(chat.id+"->"+msg.getContact().pushname+" : "+msg.body);
    }
}

async function mp4ToSomething(msg, parameter, parameter2){
    if(parameter2==""||parameter2==undefined) parameter2='mp4';
     var namafile = `./tmp/${msg.timestamp}.mp4`;

     msg.reply("```Mohon Menunggu```")
     var w = fs.createWriteStream(namafile);

     ytdl(parameter).pipe(w);
     w.on('finish', async()=>{
        msg.reply('```file downloaded```');
        const yt = await MessageMedia.fromFilePath(namafile);
        if(parameter2=='mp4')
        client.sendMessage(msg.from, yt, {sendMediaAsDocument: true,quotedMessageId: msg.id._serialized});
        if(parameter2 == 'mp3'){
                        converter.setFfmpegPath('./lib/ffmpeg/bin/ffmpeg.exe', function(err) {
                if (err) throw err;
            });

            var tujuan = `./tmp/${setRandom('mp3')}`
        // convert mp4 to mp3
            converter.convert(namafile, tujuan , async function(err) {
                if (err) throw err;
                const ytmp3 = await MessageMedia.fromFilePath(tujuan);
                client.sendMessage(msg.from, ytmp3, {sendAudioAsVoice: true});
                await fs.unlink(namafile, (err)=>{
                    if (err) console.log(err);
                })
                await fs.unlink(tujuan, (err)=>{
                    if (err) console.log(err);
                })

            });

        }
    });
}



async function ubah(msg, ext){
    const file23 = await msg.downloadMedia();
        const imgBuffer = Buffer.from(file23.data, 'base64')
        var my = `./out/${setRandom('mp4')}`;
        const des = `./out/${setRandom(ext)}`
        var Readable = require('stream').Readable
        var s = new Readable()

        s.push(imgBuffer)   
        s.push(null) 

        var y = fs.createWriteStream(my)
        s.pipe(y);
        y.on('finish', function(){
            console.log('finish '+ext)
            

            converter.setFfmpegPath('./lib/ffmpeg/bin/ffmpeg.exe', function(err) {
                if (err) throw err;
            });

        // convert mp4 to mp3
        if(ext == 'mp3'){
            console.log(1)
            converter.convert(my, des, async function(err) {
                if (err) throw err;
                const mp3 = await MessageMedia.fromFilePath(des);
                client.sendMessage(msg.from, mp3, {sendAudioAsVoice: true});

            });
        }

        if(ext=='webp'){
            console.log(2)
            converter.convertWEBM(my, des, async function(err){
                if (err) throw err;
                const web = await MessageMedia.fromFilePath(des);
                client.sendMessage(msg.from, web, {sendMediaAsSticker: true});                
            })
        }

        })
}
const ur = 'https://pps.whatsapp.net/v/t61.24694-24/162753520_349051389789341_6758988584709896378_n.jpg?ccb=11-4&oh=e6031b96962f28c100131af04a5cc214&oe=60B02EC2'

client.on('group_join', async(msg) => {
    var json = (JSON.parse(fs.readFileSync('./lib/JSON/grup.json')))[msg.id.remote]
    var statY = ['ya', 'yes', 'aktif', 'true']
    if(json!=undefined && statY.includes(json['join_group'])){
        var kontak = await await client.getContactById(msg.recipientIds[0])
        // // const ur = 'https://pps.whatsapp.net/v/t61.24694-24/162753520_349051389789341_6758988584709896378_n.jpg?ccb=11-4&oh=e6031b96962f28c100131af04a5cc214&oe=60B02EC2'
        var chat = await client.getChatById(msg.id.remote)
        console.log(chat)
        var foto = await kontak.getProfilePicUrl();
        var nama = kontak.pushname || "I Don't Know";
        let mention = []
            mention.push(kontak)
            var welcome = json['welcome'].replace('var_name', `@${kontak.id.user}`);
            welcome = welcome.replace('var_grup', `${chat.name}`)
            console.log(welcome)
            client.sendMessage(msg.id.remote, welcome, {mentions : mention})
    //     TES.gambar(nama, kontak.number, foto, async(base64)=>{
    //         const media = new MessageMedia('image/png', base64);
    // // console.log(base64.substring(0,20))
    //         client.sendMessage(msg.id.remote, media)
    //         let mention = []
    //         mention.push(kontak)
    //         var welcome = json['welcome'].replace('var_name', `@${kontak.id.user}`);
    //         welcome = welcome.replace('var_grup', `${chat.name}`)
    //         console.log(welcome)
    //         client.sendMessage(msg.id.remote, welcome, {mentions : mention})
    //     })
    }
    // //.log(kontak)
    // //.log(kontak.pushname)
    // //.log(kontak.number)
})

// client.on('group_leave', async(msg) => {
//     // //.log(msg)
//     const chat =  await msg.getChat();
//     // const media = MessageMedia.fromFilePath('./'+Math.floor(Math.random()*3)+'.jpg');
//     // chat.sendMessage(media);
//     chat.sendMessage('YAHHH KELUAR')
//     // //.log(msg);
//     // //.log('------------------------------------------------------');
//     // //.log(chat);
// })

client.on('message', async (msg) => { 
	if(msg.isStatus) return;
    // //.log(msg)
    const algan =await msg.from;
        //.log(algan)
        var obrolan = await msg.getChat();
        var kontak = await msg.getContact();
        if(obrolan.isGroup == false){
            console.log(kontak.pushname + " : " + msg.body);
        }    
        else{
            console.log(obrolan.name+"->"+ kontak.pushname+" : "+msg.body)
        }
        pesan = msg.body.split(" >> ");
        var keyword = pesan[0].toLowerCase();
        var parameter = pesan[1];
        var parameter2 = pesan[2];
        var parameter3 = pesan[3];
        var cht = keyword.split("~!")
        if(msg.body.substring(0,2)=="~!")
            switch(cht[1]){
                case "tagsemua":
                let i = 1;

                let text = "*Tag Semua Anggota Grup*\n";
                let mentions = [];

                for(let participant of obrolan.participants) {
                    const contact = await client.getContactById(participant.id._serialized);
                // //.log('========================================')
                // //.log(contact)
                // //.log(participant)
                // //.log(chat.participants)
                // //.log('========================================')
                mentions.push(contact);
                text += i+`. @${participant.id.user}\n`;
                i++;
            }

            obrolan.sendMessage(text, { mentions });
            break;
            case "hidetag":


 
            var user = await client.getContactById(msg.author);
            let sebut = [user];

            for(let participant of obrolan.participants) {
                const contact = await client.getContactById(participant.id._serialized);
                // //.log('========================================')
                // //.log(contact)
                // //.log(participant)
                // //.log(chat.participants)
                // //.log('========================================')
                sebut.push(contact);
                
            }
            obrolan.sendMessage("Dari @"+user.id.user+": "+parameter+"\n```HIDETAG SEMUA ANGGOTA GRUP```", { mentions : sebut });
            break;
            case "spam":
            var user1 = await client.getContactById(msg.mentionedIds);
            var teks = '';
            var sebut2= [];
            if(parameter2 <= 1000){
                for(let con = 0; con < parameter2; con++){
                    teks += `@${user1.id.user}\n`;
                    sebut2.push(user1)
                }

                obrolan.sendMessage(teks, {mentions : sebut2})
            }
            else{
                msg.reply("```Jangan >1000 juga dong, Bambank```")
            }

            break;

            case "ping":
            msg.reply('pong');
            break;
            case "wolfram":
            var wolfram = await waApi.getSimple(pesan[1], function (err){
                if(err){
                    msg.reply(err);
                    throw err;
                }
            });
            var filepath = base64Img.imgSync(wolfram, '', '2')
            const media = MessageMedia.fromFilePath('./2.gif')
            obrolan.sendMessage(media)
            break;
            case "jadwal-sholat":
            js.fethHtml(parameter).then(function(output){
                msg.reply(output);
            })
            break;
            case "stiker":
            case "sticker":
            var author = parameter || 'bot AlfAN iRsyadi';
            var name = parameter2 || "Follow: @alfanirsyadi_";
            if(msg.hasQuotedMsg){
                    msg = await msg.getQuotedMessage();
                }
            if(msg.hasMedia){

                try{
                    if(msg.type=='video'){
                        ubah(msg, 'webp')
                    }
                    else{
                        const file = await msg.downloadMedia();
                        client.sendMessage(msg.from, file, {sendMediaAsSticker: true,stickerAuthor: author, stickerName: name}, function(err){
                            if(err) throw err;
                        });
                    }
                }
                catch(err){
                    msg.reply(err)
                }   
            }
            else {
                msg.reply("```Mohon kirim Gambarnya```")
            }  
            break;
            case "media":
            let cht = await msg.getChat();
            var file = ytdl(parameter).pipe();
            // client.sendMessage(msg.from, file, {sendMediaAsDocument: true});
            var string = "TYPE: "+msg.type+", MIMITYPE: "+(msg.mimetype);
            //.log(string);
            break;
            case "set-nama":
            client.setDisplayName(parameter);
            msg.reply("Display Name telah diubah. :)");
            break;a
            case "set-status":
            client.setStatus(parameter);
            msg.reply("Status telah diperbarui. :D");
            break;
            case "fitur":
            grup.isAdmin(obrolan, msg, (res)=>{
                if(res){
                    grup.cek(msg.from, 
                        async()=>{
                            var fitur = parameter;
                            grup.updateFitur(msg.from, fitur, parameter2, (res)=>{
                                msg.reply(res);
                            })
                        },
                        ()=>{
                            msg.reply('Grup Belum terdaftar');
                        }
                    )
                }
                else{
                    msg.reply("anda tidak memiliki akses")
                }
            });
            break;
            case 'member':

            break;
            case "balas":
            let mention = [];
            var obrolan = await msg.getChat();
            var contak = await msg.getContact();
            msg.reply(parameter);
            mention.push(contak)
            obrolan.sendMessage(`@${contak.id.user}`, {mentions : [contak]})
            break;
            case "debugging": 
            switch(parameter){
                case "msg":
                console.log(msg)
                break;
                case "obrolan":
                console.log(obrolan)
                break;
                case "kontak":
                console.log(kontak)
                break
                case "client.getChat":
                const temp = await client.getChatById(msg.from)
                console.log(temp)
                break
                case "random":
                    // const ur = 'https://pps.whatsapp.net/v/t61.24694-24/162753520_349051389789341_6758988584709896378_n.jpg?ccb=11-4&oh=e6031b96962f28c100131af04a5cc214&oe=60B02EC2'
                    let myPromise = new Promise(function(res, err){
                        var file = TES.gambar('alfan', '081276790748', './190803102.jpg')
                        res(file)
                    })
                    myPromise.then(function(val){
                        const media = MessageMedia.fromFilePath(val);
                        obrolan.sendMessage(media)
                        fs.unlink(val)
                    }, function(error){
                        console.log("ERROR")
                    }) 
                    break;
                }
                break;
                case 'download':
                const kontak = await msg.getContact();
                kontak.getProfilePicUrl().then(function(link){
                //.log(link)
            })
            //.log('------------------------')
            kontak.getProfilePicUrl(async(link) => {
                //.log(link)
            })
            break;
            case 'daftar-grup':
            const chat123 = await msg.getChat();
            grup.cek(msg.from, 
                ()=>{
                    msg.reply('grup telah terdaftar')
                },
                ()=>{
                    grup.tambahGrup(msg.from, chat123.name)
                    msg.reply('grup berhasil didaftar')
                }
            )
            break;
            case 'nobg':
            if(msg.hasMedia){
                var base64img = await msg.downloadMedia();
                var outputFile = "./out/"+msg.from+"-"+msg.timestamp+".png";
                
                // const file = await MessageMedia.fromFilePath(outputFile)
                msg.reply("MOHON MENUNGGU")
                // console.log(bes64)

                // await fs.unlink(outputFile)
                await remove_bg_1.removeBackgroundFromImageBase64({
                    base64img: base64img.data,
                    apiKey: "eNtWDPSEEoD6ikTzkj6sn5L1",
                    size: "regular",
                    type: "auto",
                    outputFile: outputFile
                }).then(async(res) =>{
                    msg.reply("SEDANG PROSES")
                    let buffer = Buffer.from(res.base64img, 'base64')
                    fs.writeFileSync(outputFile, buffer, (err) => {
                        if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
                    })

                    const media_ig = await MessageMedia.fromFilePath(outputFile);
                    fs.unlinkSync(outputFile)       
                    await client.sendMessage(msg.from, media_ig, {sendMediaAsDocument: true,quotedMessageId: msg.id._serialized});


                }).catch(function (errors) {
                    console.log(JSON.stringify(errors));
                    return '1'
                });


            }
            else{
                msg.reply("Mohon Lampirkan Gambarnya :)");
            }
            break;

        // case 'download-ig':
        // 	msg.reply('mohon tunggu sebentar...')
        // 	let arr = parameter.split('/');
        // 	console.log(arr)
        // 	const n = arr.length;
        // 	console.log(n)
        // 	if(arr[n-1] == "?utm_medium=copy_link"){
        // 		arr.pop();
        // 		console.log(arr);
        // 		parameter = arr.join('/');
        // 		console.log(parameter)

        // 	}
        // 	const media1 = await download(parameter)
		// 	const media_ig = await MessageMedia.fromFilePath(media1.file);
		// 	client.sendMessage(msg.from, media_ig, {sendMediaAsDocument: true,quotedMessageId: msg.id._serialized});
		// 	// obrolan.sendMessage(media_ig)
		// 	// await fs.unlink(media1.file, function(args) {
		// 	// 	// body
		// 	// })
		// 	// await fs.unlink(media1.thumbnail, function(args) {
		// 	// 	// body
		// 	// })			
		// 	break;
     case 'download-yt':
     await mp4ToSomething(msg, parameter, parameter2)
     break;

        //cari-yt >> judul >> 1 >> 
     case 'cari-yt':
     var r = await yts(parameter);
     if(parameter2 == undefined){
        parameter2 = 1;
     }
     else if(parameter2.toLowerCase()=='tampilkan'){
        const videos = r.videos.slice(0, 10)
        var out = '';

    videos.forEach( function ( v,i ) {
        const views = String( v.views ).padStart(10, ' ')
        const pilihan =   '---8<--------[ ```Video - '+ (i+1)+ '``` ]----------------\n'
                        + `*Judul*    :\n${wrap(v.title, {indent: '    ', newline: '\n'})}\n`
                        + `*Thumbnail*:\n${v.thumbnail}\n`
                        + `*Link*     :\n${v.url}\n`
                        + `*${ v.views }* viewers | Durasi: *(${ v.timestamp})*\n\n`;
        out += pilihan;
    } )
    msg.reply(out);
    break;
    }
     else if(!(Number.isInteger(parseInt(parameter2,10)) && 0< parseInt(parameter2,10))){
        msg.reply('```Masukan input yang valid```');
        break;
    }

    const vid = r.videos[parameter2-1];
    await mp4ToSomething(msg, vid.url, parameter3);
     break;


    case 'mp3':
    if(msg.hasMedia){
        const file23 = await msg.downloadMedia();
        const imgBuffer = Buffer.from(file23.data, 'base64')
        var my = `./out/${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`;
        const des = `./out/${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp3`
        var Readable = require('stream').Readable
        var s = new Readable()

        s.push(imgBuffer)   
        s.push(null) 

        var y = fs.createWriteStream(my)
        s.pipe(y);
        y.on('finish', function(){
            console.log('finish')
            

            converter.setFfmpegPath('./lib/ffmpeg/bin/ffmpeg.exe', function(err) {
                if (err) throw err;
            });

        // convert mp4 to mp3
            converter.convert(my, des, async function(err) {
                if (err) throw err;
                const mp3 = await MessageMedia.fromFilePath(des);
                client.sendMessage(msg.from, mp3, {sendAudioAsVoice: true});

            });


        })
    }
    else{
        msg.reply("```Mohon kirim Videonya```");
    }
    break;
    case 'cek':
    if(msg.hasQuotedMsg){
        msg = await msg.getQuotedMessage();
        console.log(msg.type)
        
        console.log()
        console.log(msg.links)
        console.log('--------')
        console.log(msg)
    }
    break;
            case 'katakan':
            case 'say':
            case 'bilang':
            googleTTS
            .getAudioBase64(parameter2, {
                lang: parameter,
                slow: false,
                host: 'https://translate.google.com',
                timeout: 10000,
            })
            .then(async function(res){
                const say = new MessageMedia('audio/mpeg', res);
                client.sendMessage(msg.from, say, {sendAudioAsVoice: true});

              }) // base64 text
            .catch(console.error);
            break;
            case 'baca':
            case 'bacakan':
                googleTTS
                .getAllAudioBase64(parameter2, {
                    lang: parameter,
                    slow: false,
                    host: 'https://translate.google.com',
                    timeout: 10000,
                    splitPunct: ',.?',
                })
                .then(async function(res){
                    const say1 = new MessageMedia('audio/mpeg', res[0].base64);
                    client.sendMessage(msg.from, say1, {sendAudioAsVoice: true});

                        }) // base64 text
                .catch(console.error);
            break;
            case "menu":
                msg.reply(menu); 
            break;
            case 'menu-bicara':
                    msg.reply(menuBic)
            break;
            case "lirik":
                let lyrics = await lyricsFinder(parameter, parameter2) || "Not Found!";
                msg.reply(lyrics)
            break;
            case 'info':
                client.sendMessage(msg.from,ALFAN, {parseVCards: true})
                client.sendMessage(msg.from,info, {linkPreview: true})
            break;
            case 'joki-mtk':
                client.sendMessage(msg.from,JOKI, {parseVCards: true})
                client.sendMessage(msg.from,'```\u25E9 Silahkan hubungi nomor tersebut \u25E9```', {linkPreview: true})
            break;
            case 'ubah':
                ubah(msg, parameter)
            break;
            // v1.1.1
            // case 'download-ig':
            // var code = (prameter.split('/p/')[1]).split('/')[0]
            // simple_instagram_api_1["default"].get(code).then(function (result) {
            //     result.children.forEach(function (i){ 

            //         download(code).pipe
            //     });
            // });
            // break;
            default:
                msg.reply("```Maaf perintah tidak ditemukan!!!```");
            break;
        }
    });
client.initialize();
