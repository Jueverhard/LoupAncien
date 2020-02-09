module.exports = (client, message, args) => {
  const testGuild = client.guilds.resolve("556237949214392340");
  const rulesChanelId = "676073763627859970";
  const rulesMsgId = "676085155668164679";
  const omegaRoleTest = testGuild.roles.get('556267036544729090');

  message.delete({ timeout: 3000});
  
  if (args[0] === "omega") {
    client.channels.fetch(rulesChanelId).then(c => {
      c.messages.fetch(rulesMsgId).then(m => {
        m.reactions.resolve('✅').users.fetch().then( usersCollection => {
          testGuild.members.fetch().then(membersCollection => {
            for (m of membersCollection.values()) {
              if (usersCollection.some(u => u.id === m.user.id)) {
                if (!m.roles.find(r => r === omegaRoleTest)) m.roles.add(omegaRoleTest);
              }
            }
          })
        })
      })
    });
  } else if (args[0] === "gvg") {

  }
};