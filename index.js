const Discord = require("discord.js");
require('dotenv').config()
const client = new Discord.Client();
const botToken = process.env.BOT_TOKEN
const prefix = "?";
const rankRoles = ['Iron 1', 'Bronze 2', 'Silver 3']
//Start the bot
client.login(botToken);

//Once bot is ready, log
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }
  const command = message.content.slice(1).toLowerCase().split(" ")[0]

  if (command === "ping") {
    ping(message);
  } else if (command === "rank") {
    changeRank(message);
  }
});

const ping = (message) => {
  message.channel.send("pong");
};

const changeRank = (message) => {
  const member = message.guild.members.cache.get(message.author.id)
  const role = message.guild.roles.cache.find((role) => {
    return role.name === message.content.slice(6)
  })
  if (role) {
    rankRoles.forEach((roleName) => {
      const realRole = message.guild.roles.cache.find((role) => {
        return role.name === roleName
      })
      member.roles.remove(realRole)
    })
    member.roles.add(role)
  } else {
    message.reply('Please list a valid rank. Example: Iron 1, Diamond 3')
  }
};
