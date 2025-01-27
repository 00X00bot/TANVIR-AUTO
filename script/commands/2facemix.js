module.exports.config = {
  name: "2face",
  version: "1.0.1",
  permssion: 2,
  credits: "123 motin",
  prefix: true,
  description: "test cmd",
  category: "image",
  usages: "test cmd",
  cooldowns: 0,
  dependencies: {
      "fs-extra": "",
      "request": ""
  }
};
module.exports.run = async ({ api, event,args }) => {  {
  const fs = require("fs-extra");
  const request = require("request");
const axios = require('axios')
const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json')
const n = apis.data.api
 const { threadID, messageID, senderID, body } = event; 

const content = args.join(" ").split("+").map(item => item = item.trim());
let emoji1 = content[0]
let emoji2 = content [1]
  try {
if (!args[0])
  return api.sendMessage("𝘶𝘴𝘦: .𝘱𝘮𝘪𝘹 𝘭𝘪𝘯𝘬1 + 𝘭𝘪𝘯𝘬2", event.threadID, event.messageID);
 var callback = () => api.sendMessage({body:`[🤍] 𝘚𝘵𝘢𝘺 𝘞𝘪𝘵𝘩 𝘛𝘢𝘯𝘷𝘪𝘳 𝘉𝘰𝘵 🥀`,attachment: fs.createReadStream(__dirname + "/system/emix.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/biden.png"),event.messageID);
 return request(encodeURI(`https://kaiz-apis.gleeze.com/api/faceswap-v2?targetUrl=${emoji2}&sourceUrl=${emoji1}`)).pipe(fs.createWriteStream(__dirname+'/system/emix.png')).on('close',() => callback()); 
} catch (err){
api.sendMessage(`error: ${err.message}`, event.threadID, event.messageID)
}   
}}
