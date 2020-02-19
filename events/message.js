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
  user = null;
  if (message.author.id == "283298934766436355") user = "Jueverhard"
  if (message.author.id == "140872188218703872") user = "Ancalyx"
  if (message.author.id == "245636942136475650") user = "Liveli"
  client.channels.fetch(client.LogsChanelID).then(chan => chan.send(`${user} a utilisé la commande suivante : \"${message}\"`));
  // Retire le premier élément (la commande) du tableau et la renvoie sous forme minuscule
  // ex : args = {"CmD", "lol", "mdr"} ; cmd = {} => args = {lol", "mdr"} ; cmd = "cmd"
  const command = args.shift().toLowerCase();

  // Si "command" appartient à client.commands, alors son code est appelé
  if (client.commands.has(command)) client.commands.get(command)(client, message, args);
};
