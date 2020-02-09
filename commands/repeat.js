module.exports = (client, message, args) => {
  message.channel.send(args.join(" "));
  console.log(`Le message '${message.content}' va être supprimé.`)
  message.delete({ timeout: 3000 }).then(console.log("Le message a été supprimé"));
};
