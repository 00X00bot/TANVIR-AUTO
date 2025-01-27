module.exports.config = {
  name: "wish",
  version: "1.0.0",
  credits: "Tanvir143",
  author: "Tanvir143",
  prefix: true,
  category: "user",
  dependencies: {
        "axios": "",
        "fs-extra": ""
  },
  cooldowns: 5
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
  let pathImg = __dirname + "/system/tanviBG.png";
  let pathAvt1 = __dirname + "/system/tanvirAvt.png";


  var id = Object.keys(event.mentions)[0] || event.senderID;
  var name = await Users.getNameUser(id);
  var ThreadInfo = await api.getThreadInfo(event.threadID);

  var background = [

    "https://i.postimg.cc/xd7z14vn/20250111-020341.jpg"
];
  var rd = background[Math.floor(Math.random() * background.length)];

  let getAvtmot = (
    await axios.get(
      `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
      { responseType: "arraybuffer" }
    )
  ).data;
  fs.writeFileSync(pathAvt1, Buffer.from(getAvtmot, "utf-8"));

  let getbackground = (
    await axios.get(`${rd}`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(getbackground, "utf-8"));

  let baseImage = await loadImage(pathImg);
  let baseAvt1 = await loadImage(pathAvt1);

  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.font = "400 31px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "start";


    const lines = await this.wrapText(ctx, name, 1160);
    ctx.fillText(lines.join('\n'), 155,750);//comment
    ctx.beginPath();


  ctx.drawImage(baseAvt1, 164, 330, 279, 280);

  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAvt1);
  return api.sendMessage({ body: `ღশুভ জন্মদিন ${name}💙࿐ \n\n🌸__আজকের এই দিনে \nসবকিছু হউক নতুন করে__💙ღ࿐\n💙ღ__সুখের স্মৃতি টুকু থাকুক কাছে,\n🌸🥹__ღদুঃখ গুলা যাক দূরে!\•.¸♡ᴴᴬᴾᴾᵞ ᴮᴵᴿᵀᴴᴰᴬᵞ ᵀᴼ ᵞᴼᵁ♡¸.•`, attachment: fs.createReadStream(pathImg) },
      event.threadID,
      () => fs.unlinkSync(pathImg),
      event.messageID);
	}
