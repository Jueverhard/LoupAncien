module.exports = (client, message, args) => {
  message.delete({ timeout: 1000});
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  if (args.length === 0) {
    client.channels.fetch(client.MazeChanelID).then(chan => {
      chan.send("Le Labyrinthe de Tartaros est en cours, la meute a besoin de l'aide d'@everyone ! Venez vous battre pour avancer dans l'exploration du Labyrinthe :muscle: De beaux trésors nous attendent une fois le gros tas de cailloux mis en pièces :gift::christmas_tree:\n\n*Psst, tapez, mais pas n'importe où s'il-vous-plaît*");
    });
  }
  else {
    membersNames = [];
    serverDamnedWolves.members.fetch().then(membersCollection => {
      // Get all couples [displayName, id] from the Dαmned Wolvεs discord server
      for (m of membersCollection.values()) {
        membersNames.push([m.displayName, m.id]);
      }
    })
    setTimeout(function(){  // Wait 5 sec to let membersNames the time to be filled
      undefinedMembers = " "
      for (arg of args) {
        // Look for a name that includes the argument passed as parameter to the command
        name = membersNames.find(n => n[0].toLowerCase().includes(arg.toLowerCase()))
        if (name === undefined) {
          undefinedMembers += `${arg} `;
        }
        else {
          serverDamnedWolves.members.fetch(name[1]).then(m => {
            console.log(`Envoi d'un message de laby à ${m.displayName}`);
            m.send("Alors comme ça, on se fait désirer ? On fait la fine bouche sur l'utilisation des lanternes ?\nNon non non non non, ça ne va pas du tout ça ... Va donc faire un tour dans le labyrinthe de Tartaros, le reste de la meute a besoin de ton aide !");
            client.channels.fetch(client.LogsChanelID).then(chan => {
              chan.send(`J'ai envoyé un MP pour le labyrinthe à **${m.displayName}** !`)
            })
          })
        }
      }
      setTimeout(function() {
        if (undefinedMembers != " ") client.channels.fetch(client.LogsChanelID).then(chan => chan.send(`Les arguments suivants ne correspondent à aucun membre : ${undefinedMembers}`));
      }, 3000);
    }, 3000);
  }
};
