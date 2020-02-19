module.exports = (client, message, args) => {
  message.delete({ timeout: 1000});
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);

  if (args[0] === "omega") {
    const omegaRole = serverDamnedWolves.roles.get(client.OmegaRoleID);

    client.channels.fetch(client.RulesChanelID).then(c => {
      c.messages.fetch(client.RulesMsgID).then(m => {
        m.reactions.resolve('✅').users.fetch().then( usersCollection => {
          serverDamnedWolves.members.fetch().then(membersCollection => {
            for (m of membersCollection.values()) {
              if (usersCollection.some(u => u.id === m.user.id)) {
                if (!m.roles.find(r => r === omegaRole)) m.roles.add(omegaRole);
              }
            }
          })
        })
      })
    });
  }
};