module.exports = (client) => {
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  const GvGRole = serverDamnedWolves.roles.get(client.GvGRoleID);


  // Maybe use setInterval() to determine when to check for date and time ?
  // Then if it is right, look at the reactions, then send an embed message to remind the participants
  // setInterval("alert(('bip')", 10000);


  client.channels.fetch(client.GvGChanelID).then(chan => {
    chan.messages.fetch().then(msg => {
      const checkFilter = (reaction) => reaction.emoji.name === '✅';
      const xFilter = (reaction) => reaction.emoji.name === '❌';
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
