module.exports = (client, message) => {
  message.delete({ timeout: 1000});
  client.channels.fetch(client.MazeChanelID).then(chan => {
    chan.send("Le Labyrinthe de Tartaros est en cours, la meute a besoin de l'aide d'@everyone ! Venez vous battre pour avancer dans l'exploration du Labyrinthe :muscle: De beaux trésors nous attendent une fois le gros tas de cailloux mis en pièces :christmas_tree:");
  });
};
