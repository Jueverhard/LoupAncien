const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  message.delete({ timeout: 1000});
  let texte = "Ce message détaille les différentes commandes reconnues par le bot et utilisables lorsque celui-ci est " +
              "connecté. Servez-vous-en avec bienveillance ou vous ne pourrez plus vous en servir !\n\n" +
              '-"**!help**" : Liste les commandes reconnues par le bot (c\'est-à-dire envoie ce message) ;\n' +
              '-"**!refresh omega**" : Met à jour les rôles Omega selon les personnes ayant réagis au message des règles ;\n' +
              '-"**!repeat *nom_d\'un_channel* *et_là_tu_peux_dire_un_peu_ce_que_tu_veux***" : Fait répéter au bot, dans le ' +
              'channel indiqué (ou dans le channel du message si *here*) ce qui suit le nom du channel ;\n' +
              '-"**!gvg**" : Envoie un message dans le salon **guerre-de-guilde** pour rappeler aux membres y participant ' +
              'de faire leurs attaques ;\n' +
              '-"**!gvg *un_nom* *un_autre_nom***" : Envoie un message privé aux membres listés pour leur rappeler de ' +
              'faire leurs attaques en Guerre de Guilde. Vous pouvez mettre autant de noms que vous voulez ;\n' +
              '-"**!laby**" : Envoie un message dans le salon **exploration-du-labyrinthe**, notifiant tous les membres ' +
              'et leur rappelant d\'utiliser leurs lanternes dans le labyrinthe ;\n' +
              '-"**!laby *un_nom* *un_autre_nom***" : Envoie un message privé aux membres listés pour leur rappeler ' +
              'd\'utiliser leurs lanternes dans le labyrinthe. Vous pouvez mettre autant de noms que vous le voulez ;\n' +
              '-"**!gvganswer**" : Disponible uniquement le Dimanche soir à partir de 22h, permet de mettre à jour les rôles ' +
              'GVG (et NoGVG) et liste les personnes souhaitant participer aux Guerre de Guilde et la semaine à venir.';

  const embed = new MessageEmbed()
    .setTitle("Commandes reconnues par Amarok")
    .setDescription(texte)
    .setFooter("Attention, cette liste est sujette à changements et peut ne pas être à jour au moment où vous lisez ce message ! Contactez Jueverhard pour plus d'informations :)")
  client.channels.fetch(client.LogsChanelID).then(chan => {
    chan.send(`Salut ${message.author}, tu veux savoir ce que je sais faire ? Voici donc !`);
    chan.send(embed);
  });
};