const { DamnedWolvesServerID, RulesChanelId, RulesMsgId, OmegaRoleID } = require("../config");

module.exports = (client, message, args) => {
  const serverDamnedWolves = client.guilds.resolve(DamnedWolvesServerID);
  const omegaRole = serverDamnedWolves.roles.get(OmegaRoleID);

  message.delete({ timeout: 3000});

  if (args[0] === "omega") {
    client.channels.fetch(RulesChanelId).then(c => {
      c.messages.fetch(RulesMsgId).then(m => {
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

  }
};