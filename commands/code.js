module.exports = async (client, message, args) => {
  const code = args[0].toUpperCase();
  message.channel.send(`@everyone\n${code}\nhttp://withhive.me/313/${code}`);
  message.delete({ timeout: 1000});
};
