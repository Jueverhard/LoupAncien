module.exports = (client) => {
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  const GvGRole = serverDamnedWolves.roles.get(client.GvGRoleID);
  const NoGvGRole = serverDamnedWolves.roles.get(client.NoGvGRoleID);


  // Maybe use setInterval() to determine when to check for date and time ?
  // Then if it is right, look at the reactions, then send an embed message to remind the participants
  // setInterval("alert(('bip')", 10000);


  // client.channels.fetch(client.GvGChanelID).then(chan => {
  //   chan.messages.fetch(/* TODO : get the last EmbedMessage inviting to subscribe to GVG */).then(msg => {
  //     msg.reactions.resolve('✅').users.fetch().then( usersCollection => {
  //       serverDamnedWolves.members.fetch().then(membersCollection => {
  //         for (m of membersCollection.values()) {
  //           if (usersCollection.some(u => u.id === m.user.id)) {
  //             if (!m.roles.find(r => r === GvGRole)) m.roles.add(GvGRole);
  //             if (m.roles.find(r => r === NoGvGRole)) m.roles.remove(NoGvGRole);
  //           }
  //         }
  //       })
  //     })
  //     msg.reactions.resolve('❌').users.fetch().then( usersCollection => {
  //       serverDamnedWolves.members.fetch().then(membersCollection => {
  //         for (m of membersCollection.values()) {
  //           if (usersCollection.some(u => u.id === m.user.id)) {
  //             if (!m.roles.find(r => r === NoGvGRole)) m.roles.add(NoGvGRole);
  //             if (m.roles.find(r => r === GvGRole)) m.roles.remove(GvGRole);
  //           }
  //         }
  //       })
  //     })
  //   })
  // });
};
