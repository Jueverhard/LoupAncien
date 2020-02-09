module.exports = (client, message, args) => {
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);


  message.delete({ timeout: 3000});

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
  } else if (args[0] === "gvg") {
    const GvGRole = serverDamnedWolves.roles.get(client.GvGRoleID);
    const NoGvGRole = serverDamnedWolves.roles.get(client.NoGvGRoleID);
    
    client.channels.fetch(client.GvGChanelID).then(chan => {
      chan.messages.fetch(/* TODO : get the last EmbedMessage inviting to subscribe to GVG */).then(msg => {
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
      })
    });
  }
};