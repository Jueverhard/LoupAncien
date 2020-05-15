module.exports = (client, message, args) => {
  chanToSend = args.shift().toLowerCase();
  if (chanToSend == "here") {
    message.channel.send(args.join(" "));
  } else {
    for(chan of client.channels.cache.values()) {
      if (chan.name.toLowerCase().includes(chanToSend)) {
        chan.send(args.join(" "));
      }
    }
  }
  message.delete({ timeout: 1000});
};
