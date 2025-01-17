const { EmbedBuilder } = require("discord.js");
const { EMBED_COLORS } = require("@root/config");
const Client = require("waifu.it");
const api = new Client(process.env.WAIFU_IT_KEY);


/**
 * @type {import("@structures/Command")}
 */
module.exports = {
  name: "animefact",
  description: "get a anime fact",
  enabled: true,
  category: "ANIME",
  cooldown: 5,
  command: {
    enabled: true,
  },
  slashCommand: {
    enabled: true,
    options: [],
  },

  async messageRun(message) {
    const embed = await genFact(message.author);
    await message.safeReply({ embeds: [embed] });
  },

  async interactionRun(interaction) {
    const embed = await genFact(interaction);
    await interaction.followUp({ embeds: [embed] });
  },
};

const genFact = async (user) => {
  try {
    const data = await api.getFact();
    return new EmbedBuilder()
      .setTitle("Anime Fact:")
      .setDescription(`${data.fact}`)
      .setColor("Random")
      .setThumbnail("https://cdn.discordapp.com/attachments/847226847804260433/1129116403983724727/01ggAAAABJRU5ErkJggg.png")
      .setFooter({ text: `Requested by ${user.user.username}` });
  } catch (ex) {
    return new EmbedBuilder()
      .setColor(EMBED_COLORS.ERROR)
      .setDescription("Failed to fetch. Try again!")
      .setFooter({ text: `Requested by ${user.user.username}` });
  }
};
