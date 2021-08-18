//fitur.js
const fs = require('fs')
// read JSON object from file

var dir = __dirname + '/grup.json'

function cek(id, res, err){
	var json = JSON.parse(fs.readFileSync(dir));
	if(json[id]!=undefined) res();
	else err();

}

function getFitur(id, fitur){
	var json = JSON.parse(fs.readFileSync(dir));
	return json[id][fitur];
}


function tambahGrup(id, nama_grup){
	fs.readFile(dir, 'utf-8', (err, data) => {
	    if (err) {
	        throw err;
	    }

	    // parse JSON object
	    const user = JSON.parse(data.toString());
	    user[id] = {
	    	"nama" : nama_grup,
			"join_group" : "false",
			"leave_group" : "false",
			'welcome' : 'hai var_name, Selamat Datang di var_grup',
			'keluar' : 'yah si var_name keluar :(',
			"regDate" : new Date(),
			
	    }
	    // print JSON object
	    console.log(user);
	    // convert JSON object to string
		user_write = JSON.stringify(user, null, 4);

		// write JSON string to a file
		fs.writeFile(dir, user_write, (err) => {
		    if (err) {
		        throw err;
		    }
		    console.log("JSON data is saved.");
		});
	});
}

function updateFitur(nama_grup, nama_fitur, state, cb){
	// state = state.toLowerCase();
	var fitur = ['nama', 'join_group', 'leave_group', 'welcome','keluar'];
	var statY = ['ya', 'yes', 'aktif', 'true']
	var statN = ['tidak', 'no', 'tidak aktif', 'false']
	var stat = statY.concat(statN)
	if(fitur.includes(nama_fitur))
	fs.readFile(dir, 'utf-8', (err, data) => {
	    if (err) {
	        throw err;
	    }

	    // parse JSON object
	    const user = JSON.parse(data.toString());
	    if(user[nama_grup][nama_fitur] != state && (state.includes(state) || nama_fitur == 'welcome')){
	    	user[nama_grup][nama_fitur] = state
		    // print JSON object
		    console.log(user);
		    // convert JSON object to string
			user_write = JSON.stringify(user, null, 4);

			// write JSON string to a file
			fs.writeFile(dir, user_write, (err) => {
			    if (err) {
			        throw err;
			    }
			    console.log("JSON data is saved.");
			});
			cb('fitur telah di-Update')
	    }
	    else cb(`fitur ${nama_fitur} bernilai sama atau nilai ${state} tidak sesuai. Silahkan ganti`)
	});
	else cb('fitur tidak ada!!')
}

function isAdmin(chat, msg, res){
	if(chat.isGroup){
		(chat.participants).forEach((i)=>{
			// console.log(msg.author)
			// console.log(i.id._serialized)
			if(msg.author == i.id._serialized) res(i.isAdmin || '6281276790748@c.us' == msg.author)
		})
	}
}


module.exports = {isAdmin, cek, getFitur, updateFitur, tambahGrup}
// tambahGrup('alfan', '12345')
// updateFitur('alfan', 'join_group', 'aktif')
