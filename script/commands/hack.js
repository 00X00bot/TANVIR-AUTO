module.exports.config = {
  name: "hack", 
  permission: 0,
  author: "Tanvir143",
  credits: "Tanvir143",
  prefix: true,
  category: "pore", 
  cooldowns: 2,
  dependencies: {
        "axios": "",
        "fs-extra": ""
  }
};

module.exports.wrapText = (ctx, name, maxWidth) => {
  return new Promise(resolve => {
    if (ctx.measureText(name).width < maxWidth) return resolve([name]);
    if (ctx.measureText('W').width > maxWidth) return resolve(null);
    const words = name.split(' ');
    const lines = [];
    let line = '';
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
        else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
      else {
        lines.push(line.trim());
        line = '';
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return resolve(lines);
  });
} 

module.exports.run = async function ({ args, Users, Threads, api, event, Currencies }) {
  const { loadImage, createCanvas } = require("canvas");
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  let pathImg = __dirname + "/cache/tanvirBG.png";
  let pathAvt1 = __dirname + "/cache/tanvirAVT.png";

try{
  var id = Object.keys(event.mentions)[0] || event.senderID;
  var name = await Users.getNameUser(id);
  var ThreadInfo = await api.getThreadInfo(event.threadID);

  var tanvir143bot = [

    "https://i.imgur.com/6oTjEl7.jpeg"
];
  var rd = tanvir143bot[Math.floor(Math.random() * tanvir143bot.length)];

  let getTanvir = (
    await axios.get(
      `https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
      { responseType: "arraybuffer" }
    )
  ).data;
  fs.writeFileSync(pathAvt1, Buffer.from(getTanvir, "utf-8"));

  let gettanvir143bot = (
    await axios.get(`${rd}`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(gettanvir143bot, "utf-8"));

  let baseImage = await loadImage(pathImg);
  let baseAvt1 = await loadImage(pathAvt1);

  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.font = "400 23px Arial";
    ctx.fillStyle = "#1878F3";
    ctx.textAlign = "start";


    const lines = await this.wrapText(ctx, name, 1160);
    ctx.fillText(lines.join('\n'), 200,497);//comment
    ctx.beginPath();


  ctx.drawImage(baseAvt1, 83, 437, 100, 101);

  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvt1);
  return api.sendMessage({ body: `hacked by TanvirBot`, attachment: fs.createReadStream(pathImg) },
      event.threadID,
      () => fs.unlinkSync(pathImg),
      event.messageID);
} catch(tanvir) { 
  api.sendMessage(`${tanvit.message}`, event.threadID, event.messageID)}
}
