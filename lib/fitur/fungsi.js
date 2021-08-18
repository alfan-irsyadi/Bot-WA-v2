const path = require('path');
const Crypto = require('crypto');
const { tmpdir } = require('os');
const ffmpeg = require('fluent-ffmpeg');
const fa = require('fs').promises;
const fs = require('fs')
var Readable = require('stream').Readable

async function formatVideoToAudio(media) {
    let i = 0;
    console.log(i++);
    if (!media.mimetype.includes('video'))
        throw new Error('media is not a video');
console.log(i++);
    const videoType = media.mimetype.split('/')[1];
console.log(i++);
    const tempFile = `./${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp3`
    const file = fs.createWriteStream(tempFile);
console.log(i++);
    const stream = new (require('stream').Readable)();
    const buffer = Buffer.from(
        media.data.replace(`data:${media.mimetype};base64,`, ''),
        'base64'
        );
    stream.push(buffer);
    stream.push(null);
console.log(i++);
        ffmpeg(stream)
        .inputFormat(videoType)
        .toFormat('mp3')
        .on('error', function(){

        })
        .on('end', function(){

        })
        .save(tempFile);
console.log(i++);
    const data = await fa.readFile(tempFile, {encoding: 'base64'});
    // await fs.unlink(tempFile);
console.log(i++);
    return {             
        mimetype: 'audio/mpeg',
        data: data,
        filename: media.filename,
    };
}

async function downloadAndSave(media){
    const imgBuffer = Buffer.from(media.data, 'base64')
var my = `./out/${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`;
const des = `./out/${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp3`
var s = new Readable()

s.push(imgBuffer)   
s.push(null) 

var y = fs.createWriteStream(my)
s.pipe(y);
y.on('finish', function(){
    console.log('finish')
    var converter = require('video-converter');
 
converter.setFfmpegPath('./lib/ffmpeg/bin/ffmpeg.exe', function(err) {
    if (err) throw err;
});
 
// convert mp4 to mp3
converter.convert(my, des, function(err) {
    if (err) throw err;
    console.log('file saved')
});


})
// return des;
}

function setRandom(ext){
    return `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.${ext}`;
}
module.exports = {formatVideoToAudio, downloadAndSave, setRandom};