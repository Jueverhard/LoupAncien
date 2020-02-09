module.exports = (client, message) => {
  message.reply('pong !').then(sent => {
    sent.delete({ timeout: 5000 });
    message.delete({ timeout: 5000 });
  });
};
