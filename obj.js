var obj = {
  grup1: { 
  	nama: 'nama grup1', 
  	id: 'id1' },
  grup0: { 
  	nama: 'nama grup0', 
  	id: 'id0' 
  },
  grup2: { 
  	nama: 'nama grup2', 
  	id: 'id2' },
  grup3: { nama: 'nama grup3', id: 'id3' },
  grup4: { nama: 'nama grup4', id: 'id4' }
}
// function objToArr(obj, str){
// 	if(str == 'keys')
// }
var a = 0;
obj['grup'+1]['fitur'] = 'join_grup'
console.log(Object.values(obj))


function cek(obj){
	for(var i in obj){
		// console.log(Object.values(obj[i]))
	 if (obj[i].nama == 'nama grup1') {
	 	return obj[i]['fitur']
	 }
}
}

console.log(cek(obj))

