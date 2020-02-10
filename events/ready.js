var moment = require("moment");

module.exports = (client) => {
  console.log("I'm there !");
  client.channels.fetch(client.RulesChanelID).then(chan => {
    chan.messages.fetch(client.RulesMsgID).then(msg => {
      console.log("Rules message is now cached :)");
    })
  })

  const date = moment().add(7, 'days').startOf('isoweek').subtract(1, 'days').format('DD/MM');

  client.channels.fetch(client.GvGChanelID).then(chan => {
    chan.messages.fetch(msg => msg.pinned && msg.footer.text === `Vous avez jusqu'au ${date} à 22h pour répondre.`).then(msg => {
      console.log("GvG question message is now cached :)");
    })
  })
  console.log("Messages of interest are now cached !");
};
