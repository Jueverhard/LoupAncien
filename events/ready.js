var moment = require("moment");

module.exports = (client, tools) => {
  console.log("I'm there !");
  const date = moment().add(7, 'days').startOf('isoweek').subtract(1, 'days').format('DD/MM');

  tools.fetchMessage(client, client.RulesChanelID, client.RulesMsgID);

  client.channels.fetch(client.GvGChanelID).then(chan => {
    chan.messages.fetch(msg => msg.pinned && msg.footer.text === `Vous avez jusqu'au ${date} à 22h pour répondre.`).then(msg => {
      console.log("GvG question message is now cached :)");
    })
  })

  for (r of client.guilds.resolve(client.DamnedWolvesServerID).roles.values()) {
    console.log(r.name);
  }
};
