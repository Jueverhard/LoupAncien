const { DamnedWolvesServerID, RulesChanelId, RulesMsgId, OmegaRoleID } = require("../config");

module.exports = (client) => {
  console.log("I'm there !");
  const serverDamnedWolves = client.guilds.resolve(DamnedWolvesServerID);
  const omegaRole = serverDamnedWolves.roles.get(OmegaRoleID);

  client.channels.fetch(RulesChanelId).then(chan => {
    chan.messages.fetch(RulesMsgId).then(msg => {
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
