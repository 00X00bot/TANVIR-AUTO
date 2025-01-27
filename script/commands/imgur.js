module.exports.config = {
    name: "imgur",
    permission: 0,
    credits: "Tanvir143",
    prefix: true,
    category: "test",
    cooldowns: 2,
	dependencies: {
  "axios": "",}
};

module.exports.run = async ({ api, event }) => {
const axios = global.nodemodule['axios'];
var tanvir143 = event.messageReply.attachments[0].url || args.join(" ");
const res = await axios.get(`https://kaiz-apis.gleeze.com/api/imgur?url=${encodeURIComponent(tanvir143)}`);    
var tanvir = res.data.uploaded.image;
    return api.sendMessage(`${tanvir}`, event.threadID, event.messageID);
	
}
