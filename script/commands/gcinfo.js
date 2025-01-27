const fs = require("fs");
const request = require("request");

module.exports.config = {
  name: "gcinfo",
  version: "1.6.9",
  permission: 0,
  credits: "Nazrul",
  prefix: true,
  description: "View your box information",
  category: "Box",
  usages: "groupinfo",
  cooldowns: 0,
  dependencies: []
};

module.exports.run = async function({ api, event, args }) {
  let threadInfo = await api.getThreadInfo(event.threadID);
  const memLength = threadInfo.participantIDs.length;
  const gendernam = [];
  const gendernu = [];
  const nope = [];

  for (let z in threadInfo.userInfo) {
    const gioitinhone = threadInfo.userInfo[z].gender;
    const nName = threadInfo.userInfo[z].name;
    if (gioitinhone === "MALE") {
      gendernam.push(nName);
    } else if (gioitinhone === "FEMALE") {
      gendernu.push(nName);
    } else {
      nope.push(nName);
    }
  }

  const tanvir1 = gendernam.length;
  const nu = gendernu.length;
  const qtv = threadInfo.adminIDs.length;
  const sl = threadInfo.messageCount;
  const icon = threadInfo.emoji;
  const threadName = threadInfo.threadName;
  const id = threadInfo.threadID;
  const sex = threadInfo.approvalMode;
  const approvalStatus = sex ? '✅ চালু' : '❌ বন্ধ';
  
  const callback = () => 
    api.sendMessage(
      {
        body: `[💙] গ্রুপ বেসিক ইনফরমেশন \n
[🤍] গ্রুপ নাম: ${threadName}
[🤍] গ্রুপ-আইডি: ${id}
[🤍] APV MODE: ${approvalStatus}
[🤍] গ্রুপ ইমুজি: ${icon}
[🤍] গ্রুপ সদস্য: ${memLength} জন
[🤍] ছেলে: ${tanvir1} জন 🙍‍♂️
[🤍] মেয়ে: ${nu} জন 🙍‍♀️
[🤍] এডমিন: ${qtv} জন 👑
[🤍] মোট মেসেজ সংখ্যা: ${sl} টি 📝 \n
[💙] 𝘚𝘵𝘢𝘺 𝘞𝘪𝘵𝘩 𝘛𝘢𝘯𝘷𝘪𝘳 𝘉𝘰𝘵 🥀`,
        attachment: fs.createReadStream(__dirname + '/system/1.png')
      },
      event.threadID,
      () => fs.unlinkSync(__dirname + '/system/1.png'),
      event.messageID
    );
  
  return request(encodeURI(`${threadInfo.imageSrc}`))
    .pipe(fs.createWriteStream(__dirname + '/system/1.png'))
    .on('close', () => callback());
};
