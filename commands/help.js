const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {

  const description = "Ce message détaille les différentes commandes reconnues par le bot et utilisables lorsque celui-ci est " +
              "connecté. Servez-vous-en avec bienveillance, ou vous ne pourrez plus vous en servir !";

  const commands = {
    "public" : [
      {
        "name" : "bj5",
        "args" : [],
        "description" : "Fournit un tableur permettant de vérifier la validité de sa team BJ5"
      },
      {
        "name" : "sd",
        "args" : [],
        "description" : "Liste les donjons secrets disponibles le jour-même"
      },
      {
        "name" : "help",
        "args" : [],
        "description" : "Liste les commandes reconnues par le bot (c\'est-à-dire envoie ce message)"
      }
    ],
    "private" : [
      {
        "name" : "refresh",
        "args" : ["omega"],
        "description" : "Met à jour les rôles Omega selon les personnes ayant réagis au message des règles"
      },
      {
        "name" : "repeat",
        "args" : ["nom_d\'un_channel", "et_là_tu_peux_dire_un_peu_ce_que_tu_veux"],
        "description" : "Fait répéter au bot, dans le channel indiqué (ou dans le channel du message si *here*) ce qui suit le nom du channel"
      },
      {
        "name" : "gvg",
        "args" : [],
        "description" : "Envoie un message dans le salon **guerre-de-guilde** pour rappeler aux membres y participant de faire leurs attaques"
      },
      {
        "name" : "gvg",
        "args" : ["un_nom", "un_autre_nom"],
        "description" : "Envoie un message privé aux membres listés pour leur rappeler de faire leurs attaques en Guerre de Guilde. Vous pouvez mettre autant de noms que vous voulez"
      },
      {
        "name" : "laby",
        "args" : [],
        "description" : "Envoie un message dans le salon **exploration-du-labyrinthe**, notifiant tous les membres et leur rappelant d'utiliser leurs lanternes dans le labyrinthe"
      },
      {
        "name" : "laby",
        "args" : ["un_nom", "un_autre_nom"],
        "description" : "Envoie un message privé aux membres listés pour leur rappeler d'utiliser leurs lanternes dans le labyrinthe. Vous pouvez mettre autant de noms que vous le voulez"
      },
      {
        "name" : "gvganswer",
        "args" : [],
        "description" : "Disponible uniquement le dimanche soir à partir de 22h, permet de mettre à jour les rôles GVG (et NoGVG) et liste les personnes souhaitant participer aux Guerre de Guilde et la semaine à venir"
      }
    ]
  }
              
  const embed = new MessageEmbed()
    .setTitle(`Commandes reconnues par Amarok`)
    .setDescription(description)
    .setFooter(`Attention, cette liste est sujette à changements et peut ne pas être à jour au moment où vous lisez ce message ! Contactez Jueverhard pour plus d'informations :)`);

  for(command of commands.public){
    let cmd = `**${client.PREFIX}${command.name}`;
    for(arg of command.args){
      cmd += ` *${arg}*`;
    }
    cmd += "**";
    embed.addField(cmd, command.description);
  }

  if (client.moreThanOmegaMembersID.some(e => e == message.author.id)) {
    for(command of commands.private){
      let cmd = `**${client.PREFIX}${command.name}`;
      for(arg of command.args){
        cmd += ` *${arg}*`;
      }
      cmd += "**";
      embed.addField(cmd, command.description);
    }
  }
  
    
  message.author.send(embed);

  message.delete({ timeout: 1000});
};
