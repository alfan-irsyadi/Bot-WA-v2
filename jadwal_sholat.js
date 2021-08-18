'use strict';
function bold(msg){
	return '*'+msg.trim()+'*';
}
let axios = require('axios').default;

const { promisify } = require('util');

const sleep = promisify(setTimeout);
let cheerio = require('cheerio');

let base_url = 'https://www.jadwalsholat.org/adzan/monthly.php?';

const fethHtml = async (kota) => {
	let {data} = await axios.get(base_url);
	var al = cheerio.load(data);
	var a = al(".inputcity").find("option").filter(function () { return al(this).text() == kota; }).val();
	// console.log(a)

  try {
    // console.log(a);
	let { data } = await axios.get(base_url+'id='+a);
	const $ = cheerio.load(data);
	var list_data = [];	
	var header = [];
	$('.table_highlight td').each(function (i){
		list_data.push($(this).text());
	})

	$('.table_header td').each(function (i){
		header.push(bold($(this).text()));
	})
	var i;
	var string = bold($('.h1_edit').text())+ "\n";
	for(i=0; i<header.length; i++){ 
		string += header[i] + "\t";
		if(i==4||i==6||i==8){
			string += "\t";
		}
		string += ": "+list_data[i] + "\n";
	}
	string += bold($('.table_copyright').find('td').text());
	return string;
  } catch {
    console.error(
      `ERROR: An error occurred while trying to fetch the URL: ${url}`
    );
  }
};

// fethHtml('Dumai').then(function(hasil){
// 	console.log(hasil);
// })

module.exports = {fethHtml};