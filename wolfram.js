const WolframAlphaAPI = require('wolfram-alpha-node');
const waApi = WolframAlphaAPI("R8HRHU-P5KYRREEH2");


async function getShort(msg){
        return (await waApi.getShort(msg));
}	

module.exports = { getShort };