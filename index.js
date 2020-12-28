const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();
const botToken = process.env.BOT_TOKEN;
const prefix = "!";

let rank;
let rankNum;

const ranks = [
  "Iron 1",
  "Iron 2",
  "Iron 3",
  "Bronze 1",
  "Bronze 2",
  "Bronze 3",
  "Silver 1",
  "Silver 2",
  "Silver 3",
];

client.login(botToken);
client.on("ready", () => console.log("Online"));

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "rank") {
    setRank(message, command);
  } else if (command === "rankup") {
    rankUp(message);
  } else if (command === "rankdown") {
    rankDown(message);
  }
});

const setRank = (message, command) => {
  const roleArg = message.content.slice(prefix.length + command.length + 1);

  ranks.forEach(function (role, index) {
    if (role === roleArg) {
      rank = ranks[index];
      rankNum = ranks.indexOf(rank);
    }
  });
  changeRank(message);
};

const rankUp = (message) => {
  rank = ranks[rankNum + 1];
  rankNum = ranks.indexOf(rank);
  changeRank(message, true);
};

const rankDown = (message) => {
  rank = ranks[rankNum - 1];
  rankNum = ranks.indexOf(rank);
  changeRank(message, true);
};

const changeRank = (message, optional) => {
  const member = message.guild.members.cache.get(message.author.id);

  const role = message.guild.roles.cache.find((role) => {
    return role.name === rank;
  });
  if (
    (role || optional) &&
    rank != "Admin" &&
    rank != "Queen" &&
    rank != "Coach" &&
    rank != "betrayer" &&
    rank != "luna's simp" &&
    rank != "gamer girl" &&
    rank != "Mod" &&
    rank != "asshole" &&
    rank != "Annoying" &&
    rank != "slice" &&
    rank != "adiadiadiadi" &&
    rank != "Rank Bot" &&
    rank != "Rythm" &&
    rank != "Bots" &&
    rank != "MEE6"
  ) {
    ranks.forEach((roleName) => {
      const realRole = message.guild.roles.cache.find((role) => {
        return role.name === roleName;
      });
      member.roles.remove(realRole);
    });
    member.roles.add(role);
    message.reply("Got it.");
  } else {
    message.reply("Please list a valid rank. Example: Iron 1, Bronze 2");
  }
};
