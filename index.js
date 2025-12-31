js

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`✅ Bot pornit ca ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === config.welcomeChannel
  );
  if (!channel) return;

  if (config.autoRole) {
    const role = member.guild.roles.cache.find(
      r => r.name === config.autoRole
    );
    if (role) member.roles.add(role).catch(() => {});
  }

  const embed = new EmbedBuilder()
    .setColor(config.embedColor)
    .setTitle("👋 Bine ai venit!")
    .setDescription(
      `✨ ${member} a intrat pe server!\n\n` +
      `🏠 **Server:** ${member.guild.name}\n` +
      `👥 **Membri:** ${member.guild.memberCount}`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: "Bot Premium Welcome 💎" })
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

client.on("guildMemberRemove", async (member) => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === config.welcomeChannel
  );
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor("#ff4d4d")
    .setTitle("😢 La revedere!")
    .setDescription(`👋 **${member.user.tag}** a părăsit serverul.`)
    .setTimestamp();

  channel.send({ embeds: [embed] });
});

client.login(config.token);

