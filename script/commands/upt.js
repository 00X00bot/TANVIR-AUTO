const axios = require("axios")
const si = require('systeminformation');
module.exports.config = {
  name: "upt",
  creadits: " Romim",
  version: "2.0.0",
  prefix: true,
  category: "running time"
}
module.exports.run = async ({api,event}) => {
  try {
    
/*  const response = await axios.get(`https://a6-video-api.onrender.com/video/sigma`)
  const uri = response.data.data
  const a6 = await axios.get(uri,{responseType: 'stream'});
  let a6y = a6.data*/
		const upt = process.uptime();
		const sec = Math.floor(upt % 60);
		const mini = Math.floor((upt / 60) % 60);
		const h = Math.floor((upt / (60 * 60)) % 24);
		const d = Math.floor(upt / (60 * 60 * 24));
		const tanvirBot = `[🤍] ${d} দিন\n[🤍] ${h} ঘন্টা\n[🤍] ${mini} মিনিট \n[🤍] ${sec} সেকেন্ড\n`;
    const diskInfo = await si.fsSize();
        const totalDisk = (diskInfo[0].size / (1024 ** 3)).toFixed(2);
        const usedDisk = (diskInfo[0].used / (1024 ** 3)).toFixed(2);
        const freeDisk = (diskInfo[0].available / (1024 ** 3)).toFixed(2);
    const total = 
 `[🤍] STORAGE: ${totalDisk} MB\n[🤍] USED:  ${usedDisk} MB\n[🤍] FREE:  ${freeDisk} MB`;
  api.sendMessage(`💙___ BOT IS RUNNING ___💙 \n\n UPTIME:\n${tanvirBot}\n\n[🤍] 𝘚𝘵𝘢𝘺 𝘞𝘪𝘵𝘩 𝘛𝘢𝘯𝘷𝘪𝘳 𝘉𝘰𝘵 ❤️‍🩹\n`,event.threadID,event.messageID);
  } catch (tanvirTamim) {
    api.sendMessage(`${tanvirTamim.message}`,event.threadID,event.messageID)
  }
}
