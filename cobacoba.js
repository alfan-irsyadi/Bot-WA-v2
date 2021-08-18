const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const Crypto = require('crypto');
const width = 1280
const height = 720

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')


async function gambar(text, text1, url, cb){

    var tempFile2 = `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}`
    console.log(tempFile2)
    // fs.createWriteStream(ta, options)
    var tempFile1='ini_gambar'
    var img1 = await loadImage('./'+Math.floor(Math.random()*3)+'.jpg')
        console.log(tempFile2)
        context.drawImage(img1,0,0,1280,720)

        context.font = '30pt H74 Ocelot Piss'
        context.textAlign = 'left'
        context.textBaseline = 'bottom'
        context.fillStyle = '#fff'

    // const text = 'Muhammad Alfan Irsyadi HTG'
    context.strokeStyle = 'black'
    context.miterLimit = 2;
    context.lineJoin = 'circle';
    var textWidth = context.measureText(text).width
    var textHeight = context.measureText(text).height/2;
    console.log(`${textWidth} x ${textHeight}`)
    // context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
    // context.fillStyle = '#fff'
    // context.shadowBlur = 20;
    context.shadowColor = "rgba(0,0,0,0.3)"
    context.lineWidth = 7;
    context.strokeText(text, 550, 323)
    context.lineWidth = 1;
    context.fillText(text, 550,323)
    //------assert(, message)
    context.font = 'italic 30pt consolas'
    context.textAlign = 'left'
    context.textBaseline = 'top'
    context.fillStyle = '#fff'

    // const text1 = '+6281276790748'
    context.shadowColor = "rgba(0,0,0,0.3)"
    context.fillText(text1, 586, 392)
    //----
    // context.fillStyle = '#fff'
    // context.font = ' 30pt Times New Roman'
    // context.fillText('flaviocopes.com', 300, 530)

    context.strokeStyle = '#fff'
    context.lineWidth = 5;
    context.beginPath()
    context.lineTo(550, 360)
    context.lineTo(550 + 575, 360)
    context.shadowColor = "rgba(0,0,0,0.3)"
    context.stroke()


    // context.fillStyle = '#000'
    // context.fillRect(0, 0, width, height)

    // loadImage('https://portal.usu.ac.id/photos/190803102').then(image => {
    //   context.drawImage(image, 340, 515, 70, 70)
    //   const buffer = canvas.toBuffer('image/png')
    //   fs.writeFileSync('./test.png', buffer)
    // })
    // console.log("OPEN LOCALHOST")

    let alfin = "";

    var img2 = await loadImage(url)
      
      var a = 350/2;
      context.save();
      context.beginPath();
      context.arc(269, 360, a, 0, Math.PI * 2, true);
      context.closePath();
      context.stroke();
      context.clip();

      context.drawImage(img2, 269-a, 360-a, 350, 350);

      context.beginPath();
      context.arc(0, 0, a , 0, Math.PI * 2, true);
        // context.clip();
        context.closePath();
        context.stroke();
        context.restore();
        const buffer = canvas.toBuffer('image/png')
        const alfan = canvas.toDataURL('image/png')
        // console.log(alfan)
        alfin += (alfan.split(',')[1])

        // fs.writeFileSync('./'+tempFile2+'.png', buffer)
    return alfin;
    // const contents = fs.readFileSync('./'+tempFile2+'.png', {encoding: 'base64'});
    // console.log(contents.tostring(0,10))
    // const path = './'+tempFile2+'.png'?
    // return path?
}
// const ur = './190803102.jpg'
// (async()=>{
// const alfan = await gambar('Muhammad Alfan Irsyadi HTG', '+6285766300421', './2.jpg');
// console.log(alfan)    
// })();

module.exports = {gambar};

