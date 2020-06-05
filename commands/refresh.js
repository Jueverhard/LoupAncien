module.exports = (client, message, args) => {
  message.delete({ timeout: 1000});
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  whatToRefresh = args.shift();
  if (whatToRefresh === "omega") {
    const omegaRole = serverDamnedWolves.roles.cache.get(client.OmegaRoleID);

    client.channels.fetch(client.RulesChanelID).then(c => {
      c.messages.fetch(client.RulesMsgID).then(m => {
        m.reactions.resolve('✅').users.fetch().then(usersCollection => {
          serverDamnedWolves.members.fetch().then(membersCollection => {
            for (m of membersCollection.values()) {
              if (usersCollection.some(u => u.id === m.user.id)) {
                if (!m.roles.cache.find(r => r === omegaRole)) m.roles.add(omegaRole);
              }
            }
          })
        })
      })
    });
  }
};