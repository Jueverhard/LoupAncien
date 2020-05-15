var moment = require("moment");

module.exports = (client, tools) => {
  console.log("I'm there !");
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);

  tools.fetchMessage(client, client.RulesChanelID, client.RulesMsgID);

  serverDamnedWolves.roles.fetch();

  client.channels.fetch(client.GvGChanelID).then(chan => {
    chan.messages.fetchPinned();
  })
};
