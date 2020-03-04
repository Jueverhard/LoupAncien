module.exports = (client, message, args) => {
  message.delete({ timeout: 1000});
  const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
  if (args.length === 0) {
    const GvGRole = serverDamnedWolves.roles.get(client.GvGRoleID);
    serverDamnedWolves.channels.fetch(client.GvGChanelID).then(chan => {
      chan.send(`Les loups participant à la ${GvGRole} qui n'ont pas encore fait leurs attaques sont attendus sur le champ de bataille ! Il reste des genoux à casser et des clavicules à briser :fire:`);
    });
  }
  else {
    membersNames = [];
    serverDamnedWolves.members.fetch().then(membersCollection => {
      for (m of membersCollection.values()) {
        membersNames.push([m.displayName, m.id]);
      }
    })
    setTimeout(function(){  // Wait 5 sec to let membersNames the time to be filled
      undefinedMembers = " "
      missingGvGRoleMembers = " "
      for (arg of args) {
        name = membersNames.find(n => n[0].toLowerCase().includes(arg.toLowerCase()))
        if (name === undefined) {
          undefinedMembers += `${arg} `
        }
        else {
          serverDamnedWolves.members.fetch(name[1]).then(m => {
            if (m._roles.some(r => r === client.GvGRoleID)) {
              console.log(`Envoi d'un message de laby à ${m.displayName}`);
              m.send("Salut jeune loup mal léché, alors comme ça on n'a pas encore fait ses attaques en Guerre de Guilde ? Tu as de la chance que je sois là pour te le rappeler, parce que les Alphas ... *brr* :fearful: :cold_face:\n...\n...\nVa pas t'amuser à répéter ce que je t'ai dit hein, je le saurais !")
            } else {
              missingGvGRoleMembers += `${m.displayName} `;
            }
          })
        }
      }
      setTimeout(function() {
        if (undefinedMembers != " ") client.channels.fetch(client.LogsChanelID).then(chan => chan.send(`Les arguments suivants ne correspondent à aucun membre : ${undefinedMembers}`));
        if (missingGvGRoleMembers != " ") client.channels.fetch(client.LogsChanelID).then(chan => chan.send(`Les membres suivants n'ont pas le rôle GVG, peut-être t'es-tu trompé de personnes à notifier :thinking: : ${missingGvGRoleMembers}`));
      }, 3000);
    }, 3000);
  }
};
