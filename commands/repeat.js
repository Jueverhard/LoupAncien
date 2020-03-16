module.exports = (client, message, args) => {
  chanToSend = args.shift().toLowerCase();
  if (chanToSend == "here") {
    message.channel.send(args.join(" "));
  } else {
    chanCollection = client.channels.values();
    setTimeout(function(){
      for (chan of chanCollection) {
        if (chan.name.toLowerCase().includes(chanToSend)) {
          chan.send(args.join(" "));
        }
      }
    }, 1000);
  }
  message.delete({ timeout: 1000});
};
