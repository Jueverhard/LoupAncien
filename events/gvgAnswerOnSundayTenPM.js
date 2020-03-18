const { MessageEmbed } = require("discord.js");
var moment = require("moment");

module.exports = (client, tools) => {
  console.log("gvgAnswerOnSundayTenPM lancé");
  setInterval(() => {   // Run the following code once every hour
    console.log(`Vérification du moment() pour savoir s'il faut gvgAnswer : ${moment()}`);
    if (moment().format('dddd H') == "Sunday 22") {
      const GvGRole = client.guilds.resolve(client.DamnedWolvesServerID).roles.get(client.GvGRoleID);
      const NoGvGRole = client.guilds.resolve(client.DamnedWolvesServerID).roles.get(client.NoGvGRoleID);
      const date1 = moment().add(7, 'days').startOf('isoweek').format('DD/MM');
      const date2 = moment().add(7, 'days').startOf('isoweek').add(5, 'days').format('DD/MM');
      const date3 = moment().add(7, 'days').startOf('isoweek').subtract(1, 'days').format('DD/MM');
      var gvgMembers = [];
      var noGvgMembers = [];

      // Remove any GvG-relative role(s) from every members before anything
      client.guilds.resolve(client.DamnedWolvesServerID).members.fetch().then(membersCollection => {
        for (m of membersCollection.values()) {
          if (m.roles.find(r => r === GvGRole)) tools.removeRole(GvGRole);
          if (m.roles.find(r => r === NoGvGRole)) tools.removeRole(NoGvGRole);
        }
      });

      client.channels.fetch(client.GvGChanelID).then(chan => {
        chan.messages.each(msg => {
          if (msg.pinned && msg.embeds.length == 1) {
            if (msg.embeds[0].footer.text === `Vous avez jusqu'au ${date3} à 22h pour répondre.`) {
              msg.reactions.resolve('✅').users.fetch().then(usersCollection => {
                client.guilds.resolve(client.DamnedWolvesServerID).members.fetch().then(membersCollection => {
                  membersCollection.each(m => {
                    if (m.user.id === client.BotID) {}
                    else if (usersCollection.some(u => u.id === m.user.id)) {
                      if (!m.roles.find(r => r === GvGRole)) m.roles.add(GvGRole);
                      gvgMembers.push(m.displayName);
                    }
                  })
                })
              })
              msg.reactions.resolve('❌').users.fetch().then(usersCollection => {
                client.guilds.resolve(client.DamnedWolvesServerID).members.fetch().then(membersCollection => {
                  membersCollection.each(m => {
                    if (m.user.id === client.BotID) {}
                    else if (usersCollection.some(u => u.id === m.user.id)) {
                      if (!m.roles.find(r => r === NoGvGRole)) m.roles.add(NoGvGRole);
                      noGvgMembers.push(m.displayName);
                    }
                  })
                })
              })
              msg.unpin();
            }
          }
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

        client.channels.fetch(client.GvGChanelID).then(chan => {
          chan.send(embed);
          chan.send(`N'oubliez pas de faire vos attaques, on vous attend en ${GvGRole} !`)
        });
      }, 5000);
    }
  }, 3600000)
};
