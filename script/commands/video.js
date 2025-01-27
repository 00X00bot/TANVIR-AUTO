const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
    name: "video",
    version: "1.0.0",
    permission: 0,
    credits: "owner",
    premium: false,
    description: "Send Youtube Music",
    prefix: true,
    category: "media",
    usages: `video [music title]`,
    cooldowns: 5,
    dependencies: {
        "path": "",
        "fs-extra": ""
    }
};

module.exports.run = async function({ api, event, args }) {
    const chilli = args.join(' ');
    if (!chilli) {
        return api.sendMessage('Please provide a song, for example: .video adat', event.threadID, event.messageID);
    }
    const apiUrl1 = `https://betadash-search-download.vercel.app/yt?search=${encodeURIComponent(chilli)}`;
    try {
    const response1 = await axios.get(apiUrl1);
    const data1 = response1.data;
    const yturl = data1[0].url;
    const channel = data1[0].channelName;
    
        const apiUrl = `https://yt-video-production.up.railway.app/ytdl?url=${encodeURIComponent(yturl)}`;
    
        const response = await axios.get(apiUrl);
        const maanghang = response.data;

        if (!maanghang || !maanghang.audio) {
            return api.sendMessage('𝘯𝘰 𝘴𝘰𝘯𝘨 𝘧𝘰𝘶𝘯𝘥 𝘪𝘯 𝘵𝘩𝘪𝘴 𝘬𝘦𝘺𝘸𝘰𝘳𝘥.', event.threadID, event.messageID);
        }
        const bundat = maanghang.audio;
        const fileName = `${maanghang.title}.mp4`;
        const filePath = path.join(__dirname, fileName);
        const downloadResponse = await axios({
            method: 'GET',
            url: bundat,
            responseType: 'stream',
        });
        const writer = fs.createWriteStream(filePath);
        downloadResponse.data.pipe(writer);
        writer.on('finish', async () => {
            api.sendMessage(`𝘚𝘦𝘯𝘥𝘪𝘯𝘨 𝘺𝘰𝘶𝘳 𝘷𝘪𝘥𝘦𝘰...`, event.threadID, event.messageID);
            api.sendMessage({
                attachment: fs.createReadStream(filePath)
            }, event.threadID, () => {
                fs.unlinkSync(filePath);
            }, event.messageID);
        });
        writer.on('error', () => {
            api.sendMessage('API DOWN, PLEASE TRY AGAIN LATER.', event.threadID, event.messageID);
        });
    } catch (pogi) {
        console.error('something wrong...', pogi);
        api.sendMessage('API DOWN...', event.threadID, event.messageID);
    }
};
