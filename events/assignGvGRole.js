module.exports = (client) => {
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  const GvGRole = serverDamnedWolves.roles.get(client.GvGRoleID);

  client.channels.fetch(client.RulesChanelID).then(chan => {
    chan.messages.fetch(client.RulesMsgID).then(msg => {
      const checkFilter = (reaction) => reaction.emoji.name === '✅';
      const collector = msg.createReactionCollector(checkFilter);
      collector.on('collect', r => {
        serverDamnedWolves.members.fetch().then(membersCollection => {
          for (m of membersCollection.values()) {
            if (r.users.some(u => u.id === m.user.id)) {
              if (!m.roles.find(r => r === omegaRole)) m.roles.add(omegaRole);
            }
          }
        });
      });
      collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    })
  });
};
