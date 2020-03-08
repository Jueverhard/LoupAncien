module.exports = (client, member) => {
  member.send(`Salut et bienvenue ${member} ! Pense à jeter un coup d'oeil aux règles :wink:`);
  client.channels.fetch(client.LogsChanelID).then(chan => {
    chan.send(`${member.displayName} a rejoint le serveur, je lui ai envoyé un MP pour lui souhaiter la bienvenue et l'inviter à lire les règles !`)
  })
};
