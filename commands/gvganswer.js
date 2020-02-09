const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  const GvGRole = serverDamnedWolves.roles.get(client.GvGRoleID);
  const NoGvGRole = serverDamnedWolves.roles.get(client.NoGvGRoleID);
  const startDate = "28/01";
  const embed = new MessageEmbed()
    .setTitle(`Voici les réponses des membres pour les GvG de la semaine du ${startDate} au ${startDate}`)
    .addField(`Ceux qui souhaitent participer : ${GvGRole}`)
    .addField(`Ceux qui ne sont pas disponibles ou ne le veulent pas : ${NoGvGRole}`)
    .setFooter(`N'oubliez pas de faire vos attaques tous les ${GvGRole}`);

    client.channels.fetch(client.LogsChanelID).then(chan => {
      chan.send(embed);
    })
};
