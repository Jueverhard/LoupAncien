const { MessageEmbed } = require("discord.js");
var moment = require("moment");

module.exports = (client, message) => {
  message.delete({ timeout: 1000 });

  if (message.author.id !== "283298934766436355") return;
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  const GvGRole = serverDamnedWolves.roles.get(client.GvGRoleID);
  const NoGvGRole = serverDamnedWolves.roles.get(client.NoGvGRoleID);
  const date1 = moment().add(7, 'days').startOf('isoweek').format('DD/MM');
  const date2 = moment().add(7, 'days').startOf('isoweek').add(5, 'days').format('DD/MM');
  const date3 = moment().add(7, 'days').startOf('isoweek').subtract(1, 'days').format('DD/MM');
  var gvgMembers = [];
  var noGvgMembers = [];

  setTimeout(function(){
    gvgMembers = gvgMembers.filter(m => m != "Loup ancien");
    noGvgMembers = noGvgMembers.filter(m => m != "Loup ancien");
    const embed = new MessageEmbed()
      .setTitle(`Suite aux réponses des membres pour les GvG de la semaine du ${date1} au ${date2}, vos rôles ont été mis à jour`)
      .setDescription("Ceux qui souhaitent participer ont désormais le rôle GvG\nCeux qui ne le veulent pas ou ne sont pas disponibles ont, eux, le rôle NoGvG")
      .addField("N'oubliez pas de faire vos attaques tous les ", GvGRole);
    if (gvgMembers.length > 0) embed.addField("GvG : ", gvgMembers);
    if (noGvgMembers.length > 0) embed.addField("NoGvG : ", noGvgMembers)

    client.channels.fetch(client.GvGChanelID).then(chan => {
      chan.send(embed);
    });
  }, 5000);

  client.channels.fetch(client.GvGChanelID).then(chan => {
    chan.messages.fetch().then(msgCollections => {
      for(msg of msgCollections.values()){
        if (msg.pinned && msg.embeds.length == 1) {
          if (msg.embeds[0].footer.text === `Vous avez jusqu'au ${date3} à 22h pour répondre.`) {
            msg.reactions.resolve('✅').users.fetch().then(usersCollection => {
              serverDamnedWolves.members.fetch().then(membersCollection => {
                for (m of membersCollection.values()) {
                  if (usersCollection.some(u => u.id === m.user.id)) {
                    if (!m.roles.find(r => r === GvGRole)) m.roles.add(GvGRole);
                    if (m.roles.find(r => r === NoGvGRole)) m.roles.remove(NoGvGRole);
                    gvgMembers.push(m.user.username);
                  }
                }
              })
            })
            msg.reactions.resolve('❌').users.fetch().then(usersCollection => {
              serverDamnedWolves.members.fetch().then(membersCollection => {
                for (m of membersCollection.values()) {
                  if (usersCollection.some(u => u.id === m.user.id)) {
                    if (!m.roles.find(r => r === NoGvGRole)) m.roles.add(NoGvGRole);
                    if (m.roles.find(r => r === GvGRole)) m.roles.remove(GvGRole);
                    noGvgMembers.push(m.user.username);
                  }
                }
              })
            })
            msg.unpin();
          }
        }
      }
    })
  });

};
