const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`,
  );
  return base.data.xnil;
};

module.exports = {
  config: {
    name: "tikinfo",
    aliases: ["stalktik"],
    version: "1.0",
    author: "xnil6x",
    prefix: "true",
    category: "user",
    cooldowns: 5,
    permission: 0,
    category: "info"
  },

  run: async function({ api, event, args }) {
    const userName = args.join(' ');

    if (!userName) {
      return api.sendMessage("Please provide a TikTok username.", event.threadID);
    }

    try {
      const response = await axios.get(
        `${await baseApiUrl()}/xnil/tikstalk?uniqueid=${userName}`);

      if (!response.data || !response.data.id) {
        return api.sendMessage("User not found or invalid response.", event.threadID);
      }
      const userInfoMessage = {
        body: `💙 𝘏𝘦𝘳𝘦 𝘪𝘴 𝘵𝘪𝘬𝘵𝘰𝘬 𝘢𝘤 𝘪𝘯𝘧𝘰 💙\n\n` +
          `ID──── ${response.data.id} ─────\n` +
          `[🤍] 𝘕𝘢𝘮𝘦: ${response.data.username}\n` +
          `[🤍] 𝘜𝘴𝘦𝘳𝘯𝘢𝘮𝘦: ${response.data.nickname}\n` +
          `[🤍] 𝘚𝘪𝘨𝘯𝘢𝘵𝘶𝘳𝘦: ${response.data.signature}\n` +
          `[🤍] 𝘍𝘰𝘭𝘭𝘰𝘸𝘦𝘳𝘴: ${response.data.followerCount}\n` +
          `[🤍] 𝘍𝘰𝘭𝘭𝘰𝘸𝘪𝘯𝘨: ${response.data.followingCount}\n` +
          `[🤍] 𝘛𝘰𝘵𝘢𝘭 𝘙𝘦𝘢𝘤𝘵: ${response.data.heartCount}\n` +
          `[🤍] 𝘛𝘰𝘵𝘢𝘭 𝘝𝘪𝘥𝘦𝘰𝘴: ${response.data.videoCount}\n` +
          `[🤍] 𝘜𝘐𝘋: ${response.data.secUid}\n` +
          `\n[🤍] 𝘚𝘵𝘢𝘺 𝘞𝘪𝘵𝘩 𝘛𝘢𝘯𝘷𝘪𝘳 𝘉𝘰𝘵 🥀`,
      };

      return api.sendMessage(userInfoMessage, event.threadID);

    } catch (error) {
      console.error(error);
      return api.sendMessage(`error: ${error.message} `, event.threadID);
    }
  }
};
