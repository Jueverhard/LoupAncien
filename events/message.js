module.exports = (client, message) => {
  // Ne réagis pas si l'auteur du message est un bot
  if (message.author.bot) return;
  // Ne réagis pas si le préfixe ne se situe pas au début du message
  if (message.content.indexOf(client.PREFIX) !== 0) return;
  // Ne réagis pas si l'auteur du message n'est ni Liveli, ni Ancalyx, ni Jueverhard
  if (!client.moreThanOmegaMembersID.some(e => e == message.author.id)) return;
  // Ne réagis pas si l'ID de l'auteur du message est listé dans les unauthorizedMembersID
  if (client.unauthorizedMembersID.some(e => e == message.author.id)) return;

  // Récupère chaque argument dans un tableau et supprime le préfixe
  // ex : "${PREFIX}cmd lol mdr" => {"cmd", "lol", "mdr"}
  const args = message.content.slice(client.PREFIX.length).trim().split(/ +/g);

  // Prend note de la commande dans le salon "logs" si elle n'a pas été faite dans le salon "test-commandes"
  if (message.channel.id != client.TestCommandesChanelID && message.channel.id != client.TestLogsChanelID) {
    client.channels.fetch(client.LogsChanelID).then(chan => chan.send(`${message.author.username} a utilisé la commande **${message}** dans le salon **${message.channel.name}**`));
  }
  
  // Retire le premier élément (la commande) du tableau et la renvoie sous forme minuscule
  // ex : args = {"CmD", "lol", "mdr"} ; cmd = {} => args = {lol", "mdr"} ; cmd = "cmd"
  const command = args.shift().toLowerCase();

  // Si "command" appartient à client.commands, alors son code est appelé
  if (client.commands.has(command)) client.commands.get(command)(client, message, args);
};
