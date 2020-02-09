module.exports = (client, message) => {
  // Ne réagis pas si l'auteur du message est un bot
  if (message.author.bot) return;
  // Ne réagis pas si le préfixe ne se situe pas au début du message
  if (message.content.indexOf(client.PREFIX) !== 0) return;

  // Récupère chaque argument dans un tableau et supprime le préfixe
  // ex : "${PREFIX}cmd lol mdr" => {"cmd", "lol", "mdr"}
  const args = message.content.slice(client.PREFIX.length).trim().split(/ +/g);
  // Retire le premier élément (la commande) du tableau et la renvoie sous forme minuscule
  // ex : args = {"CmD", "lol", "mdr"} ; cmd = {} => args = {lol", "mdr"} ; cmd = "cmd"
  const command = args.shift().toLowerCase();

  // Si "command" appartient à client.commands, alors son code est appelé
  if (client.commands.has(command)) client.commands.get(command)(client, message, args);
};
