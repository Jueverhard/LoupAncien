module.exports = (client) => {
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  const omegaRole = serverDamnedWolves.roles.get(client.OmegaRoleID);

  client.channels.fetch(client.RulesChanelID).then(chan => {
    chan.messages.fetch(client.RulesMsgID).then(msg => {
      const checkFilter = (reaction) => reaction.emoji.name === '✅';
      const collector = msg.createReactionCollector(checkFilter);
      // msg.awaitReactions(checkFilter, { time: 15000 })
      //   .then(collected => console.log(collected));
      collector.on('collect', r => {
        serverDamnedWolves.members.fetch().then(membersCollection => {
          for (m of membersCollection.values()) {
            if (r.users.some(u => u.id === m.user.id)) {
              if (!m.roles.find(r => r === omegaRole)) {
                m.roles.add(omegaRole);
                m.send(`Tu as désormais le rôle ${omegaRole.name} ! Fais-en bon usage, et n'oublie pas les règles que tu viens d'accepter :grin:`);
              }
            }
          }
        });
      });
      
      // TODO : Get back the omegaRole when a member removes its reaction to the rules

      // collector.on('dispose', r => {
      //   console.log("Something happened");
      //   serverDamnedWolves.members.fetch().then(membersCollection => {
      //     for (m of membersCollection.values()) {
      //       if (r.users.some(u => u.id === m.user.id)) {
      //         if (m.roles.find(r => r === omegaRole)) m.roles.remove(omegaRole);
      //       }
      //     }
      //   });
      // });

      // collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    })
  });
};
