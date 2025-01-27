const axios = require("axios");

module.exports.config = {
  name: "vampire",
  category: "image",
  permission: 0,
  prefix: true,
  credits: "Tanvir143",
  author: "Tanvir143"
};

module.exports.run = async ({ api, event, args }) => {
  try {

    if (!event.messageReply || !event.messageReply.attachments || !event.messageReply.attachments[0]) {
      return api.sendMessage("𝘱𝘭𝘦𝘢𝘴𝘦 𝘳𝘦𝘱𝘭𝘢𝘺 𝘵𝘩𝘦 𝘪𝘮𝘢𝘨𝘦.", event.threadID, event.messageID);
    }
api.sendMessage("𝘤𝘰𝘯𝘷𝘦𝘳𝘵𝘪𝘯𝘨 𝘪𝘮𝘢𝘨𝘦 𝘵𝘰 𝘷𝘢𝘮𝘱𝘪𝘳𝘦.", event.threadID, event.messageID);

    const Tanvir143 = event.messageReply?.attachments[0]?.url;


    const tanvir = (`https://kaiz-apis.gleeze.com/api/vampire?imageUrl=${encodeURIComponent(Tanvir143)}`);


    const imageStream = await axios.get(tanvir,{
      responseType: 'stream'
    });


    api.sendMessage({
      body: "[🤍] 𝘚𝘵𝘢𝘺 𝘞𝘪𝘵𝘩 𝘛𝘢𝘯𝘷𝘪𝘳 𝘉𝘰𝘵 🥀",
      attachment: imageStream.data
    }, event.threadID, event.messageID);

  } catch (tamim) {
    api.sendMessage(`Error: ${tamim.message}`, event.threadID, event.messageID);
  }
};
