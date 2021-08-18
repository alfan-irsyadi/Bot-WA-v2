//fitur.js
const instagram_download = require ('@juliendu11/instagram-downloader');
const fs = require('fs')

async function download(url){
	try{
		const value = await instagram_download.downloadMedia(url, 'tmp/')
		return value
		
	}
	catch(err){
		console.log(err)
	}
}

module.exports.download = download;
// 'https://www.instagram.com/p/B_SgH6MHc2s/'
