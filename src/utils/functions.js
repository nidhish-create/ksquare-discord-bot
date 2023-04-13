const { WebhookClient } = require("discord.js");

module.exports = (client) => {
  client.oncommandused = async (command, author, channel, guild) => {
    const cmdWH = new WebhookClient(client.config.WHid, client.config.WHtoken);
    cmdWH.send(
      `**Commmand Used: \`${command}\`\nIn Channel: \`${channel.name}\`\nIn: \`${guild.name}\`\nBy: \`${author.username}, ${author.id}\`**`
    );
  };

  client.oneventerror = async (error, evntname) => {
    const evnterrWH = new WebhookClient(
      client.config.WHid,
      client.config.WHtoken
    );
    evnterrWH.send(`<@${client.owner}>`, {
      embeds: [
        {
          title: `${evntname} Event Error`,
          timestamp: new Date(),
          description: `__**Error**__:\n${error.message}`,
        },
      ],
    });
  };

  client.oncommanderror = async (error, author, guild, channel, command) => {
    channel.send({
      embed: {
        color: client.color.red,
        description:
          "I have encountered an error. This has been reported to the developer and will be solved soon. Thank You for your co-operation.",
      },
    });
    const errWH = new WebhookClient(client.Config.WHid, client.Config.WHtoken);
    errWH.send(`<@${client.owner}>`, {
      embeds: [
        {
          title: `${command} Command Error`,
          timestamp: new Date(),
          description: `__**Error**__: ${error.message}`,
          fields: [
            {
              name: "Server",
              value: `${guild.name},\nID: ${guild.id}`,
              inline: true,
            },
            {
              name: "Author",
              value: `${author.username},\nID: ${author.id}`,
              inline: true,
            },
            {
              name: "Channel",
              value: `${channel.name},\nID: ${channel.id}`,
              inline: true,
            },
          ],
        },
      ],
    });
  };
};
