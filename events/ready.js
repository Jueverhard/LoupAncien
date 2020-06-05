var moment = require("moment");

module.exports = (client, tools) => {
  console.log("I'm there !");
  client.GvGQuestionMsgID;
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  const date = moment().add(7, 'days').startOf('isoweek').subtract(1, 'days').format('DD/MM');

  tools.fetchMessage(client, client.RulesChanelID, client.RulesMsgID);

  serverDamnedWolves.roles.fetch();

  client.channels.fetch(client.GvGChanelID).then(chan => {
    chan.messages.fetchPinned().then(pinnedMessages => {
      for(msg of pinnedMessages.values()) {
        if (msg.embeds.length == 1) {
          if (msg.embeds[0].footer.text === `Vous avez jusqu'au ${date} à 22h pour répondre.`) {
            client.GvGQuestionMsgID = msg.id;
          }
        }
      }
    })
  })
  tools.fetchMessage(client, client.GvGChanelID, client.GvGQuestionMsgID);
};
