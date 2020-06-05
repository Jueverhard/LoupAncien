const { MessageEmbed } = require("discord.js");
var moment = require("moment");

module.exports = (client, message) => {
  message.delete({ timeout: 1000 });
  if (moment().format('dddd') != "Sunday") return;
  if (moment().format('H') < 22) return;

  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  const GvGRole = serverDamnedWolves.roles.cache.get(client.GvGRoleID);
  const NoGvGRole = serverDamnedWolves.roles.cache.get(client.NoGvGRoleID);
  const date1 = moment().add(7, 'days').startOf('isoweek').format('DD/MM');
  const date2 = moment().add(7, 'days').startOf('isoweek').add(5, 'days').format('DD/MM');
  var gvgMembers = [];
  var noGvgMembers = [];

  // Remove any GvG-relative role(s) from every members before anything
  serverDamnedWolves.members.fetch().then(membersCollection => {
    for (m of membersCollection.values()) {
      if (m.roles.cache.find(r => r === GvGRole)) m.roles.remove(GvGRole);
      if (m.roles.cache.find(r => r === NoGvGRole)) m.roles.remove(NoGvGRole);
    }
  });


  client.channels.fetch(client.GvGChanelID).then(chan => {
    chan.messages.fetch(client.GvGQuestionMsgID).then(msg => {
      msg.reactions.resolve('✅').users.fetch().then(usersCollection => {
        serverDamnedWolves.members.fetch().then(membersCollection => {
          for (m of membersCollection.values()) {
            if (m.user.id === client.BotID) continue;
            if (usersCollection.some(u => u.id === m.user.id)) {
              if (!m.roles.cache.find(r => r === GvGRole)) m.roles.add(GvGRole);
              gvgMembers.push(m.displayName);
            }
          }
        })
      });
      msg.reactions.resolve('❌').users.fetch().then(usersCollection => {
        serverDamnedWolves.members.fetch().then(membersCollection => {
          for (m of membersCollection.values()) {
            if (m.user.id === client.BotID) continue;
            if (usersCollection.some(u => u.id === m.user.id)) {
              if (!m.roles.find(r => r === NoGvGRole)) m.roles.add(NoGvGRole);
              noGvgMembers.push(m.displayName);
            }
          }
        })
      });
      msg.unpin();
    })
  });


  // Attend 5sec avant d'exécuter le code suivant
  // pour donner le temps aux rôles d'être accordés et à gvgMembers et noGvgMembers d'être remplis
  setTimeout(function(){
    const embed = new MessageEmbed()
      .setTitle(`Suite aux réponses des membres pour les GvG de la semaine du ${date1} au ${date2}, vos rôles ont été mis à jour`)
      .setDescription("Ceux qui souhaitent participer ont désormais le rôle GvG.\nCeux qui ne le veulent pas ou ne sont pas disponibles ont, eux, le rôle NoGvG.")
    if (gvgMembers.length > 0) embed.addField("Les loups qui ce sont inscrits et sur qui la meute compte cette semaine sont :", gvgMembers);
    if (noGvgMembers.length > 0) embed.addField("Les loups trop occupés pour faire la guerre sont : ", noGvgMembers);
    client.channels.fetch(client.LogsChanelID).then(chan => {
      chan.send(embed);
      chan.send(`Pensez à faire vos attaques sans qu'on n'ait trop à vous le rappeler svp, on vous attend en ${GvGRole} !:muscle:`)
    });
  }, 5000);
};
