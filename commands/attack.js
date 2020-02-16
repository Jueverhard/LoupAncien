module.exports = (client, message) => {
  message.delete({ timeout: 1000});
  const GvGRole = client.guilds.resolve(client.DamnedWolvesServerID).roles.get(client.GvGRoleID);
  client.channels.fetch(client.GvGChanelID).then(chan => {
    chan.send(`Les loups participant à la ${GvGRole} qui n'ont pas encore fait leurs attaques sont attendus sur le champ de bataille ! Il reste des genoux à casser et des clavicules à briser :fire:`);
  });
};
