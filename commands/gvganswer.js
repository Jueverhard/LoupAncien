const { MessageEmbed } = require("discord.js");
var moment = require("moment");

module.exports = (client, message) => {
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  const GvGRole = serverDamnedWolves.roles.get(client.GvGRoleID);
  const NoGvGRole = serverDamnedWolves.roles.get(client.NoGvGRoleID);
  const date1 = moment().add(7, 'days').startOf('isoweek').format('DD/MM');
  const date2 = moment().add(7, 'days').startOf('isoweek').add(5, 'days').format('DD/MM');
  const date3 = moment().add(7, 'days').startOf('isoweek').subtract(1, 'days').format('DD/MM');

  client.channels.fetch(client.GvGChanelID).then(chan => {
    chan.messages.fetch(msg => msg.pinned && msg.footer.text === `Vous avez jusqu'au ${date3} à 22h pour répondre.`).then(msg => {
      msg.reactions.resolve('✅').users.fetch().then( usersCollection => {
        serverDamnedWolves.members.fetch().then(membersCollection => {
          for (m of membersCollection.values()) {
            if (usersCollection.some(u => u.id === m.user.id)) {
              if (!m.roles.find(r => r === GvGRole)) m.roles.add(GvGRole);
              if (m.roles.find(r => r === NoGvGRole)) m.roles.remove(NoGvGRole);
            }
          }
        })
      })
      msg.reactions.resolve('❌').users.fetch().then( usersCollection => {
        serverDamnedWolves.members.fetch().then(membersCollection => {
          for (m of membersCollection.values()) {
            if (usersCollection.some(u => u.id === m.user.id)) {
              if (!m.roles.find(r => r === NoGvGRole)) m.roles.add(NoGvGRole);
              if (m.roles.find(r => r === GvGRole)) m.roles.remove(GvGRole);
            }
          }
        })
      })
      msg.unpin();
    })
  });

  const embed = new MessageEmbed()
    .setTitle(`Voici les réponses des membres pour les GvG de la semaine du ${date1} au ${date2}`)
    .addField(`Ceux qui souhaitent participer : ${GvGRole}`)
    .addField(`Ceux qui ne sont pas disponibles ou ne le veulent pas : ${NoGvGRole}`)
    .setFooter(`N'oubliez pas de faire vos attaques tous les ${GvGRole}`);

  client.channels.fetch(client.LogsChanelID).then(chan => {
    chan.send(embed);
  });
};
