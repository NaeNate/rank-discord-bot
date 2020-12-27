const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();
const botToken = process.env.BOT_TOKEN;
const prefix = "!";
const rankRoles = [
  "Iron 1",
  "Iron 2",
  "Iron 2",
  "Bronze 1",
  "Bronze 2",
  "Bronze 3",
  "Silver 1",
  "Silver 2",
  "Silver 3",
];
//Start the bot
client.login(botToken);

//Once bot is ready, log
client.on("ready", () => {
  console.log("Online");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }
  const command = message.content.slice(1).toLowerCase().split(" ")[0];

  if (command === "rank") {
    changeRank(message);
  }
});

const changeRank = (message) => {
  const member = message.guild.members.cache.get(message.author.id);
  const role = message.guild.roles.cache.find((role) => {
    return role.name === message.content.slice(6);
  });
  if (
    role &&
    role.name != "Admin" &&
    role.name != "Queen" &&
    role.name != "Coach" &&
    role.name != "betrayer" &&
    role.name != "luna's simp" &&
    role.name != "gamer girl" &&
    role.name != "Mod" &&
    role.name != "asshole" &&
    role.name != "Annoying" &&
    role.name != "slice" &&
    role.name != "adiadiadiadi" &&
    role.name != "Rank Bot" &&
    role.name != "Rythm" &&
    role.name != "Bots" &&
    role.name != "MEE6"
  ) {
    rankRoles.forEach((roleName) => {
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
