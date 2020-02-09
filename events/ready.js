module.exports = (client) => {
  console.log("I'm there !");
  const testGuild = client.guilds.resolve("556237949214392340");
  const rulesChanelId = "676073763627859970";
  const rulesMsgId = "676085155668164679";
  const omegaRoleTest = testGuild.roles.get('556267036544729090');
  client.channels.fetch(rulesChanelId).then(chan => {
    chan.messages.fetch(rulesMsgId).then(msg => {
      const checkFilter = (reaction) => reaction.emoji.name === '✅';
      const collector = msg.createReactionCollector(checkFilter);
      collector.on('collect', r => {
        testGuild.members.fetch().then(membersCollection => {
          for (m of membersCollection.values()) {
            if (r.users.some(u => u.id === m.user.id)) {
              if (!m.roles.find(r => r === omegaRoleTest)) m.roles.add(omegaRoleTest);
            }
          }
        });
      });
      collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    })
  });
};
