module.exports = (client, message) => {
  client.channels.fetch(client.GvGChanelID).then(chan => {
    chan.messages.each(m => console.log(m));
  });
};
