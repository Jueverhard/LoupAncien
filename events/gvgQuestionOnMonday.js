const { MessageEmbed } = require("discord.js");
var moment = require("moment");

module.exports = (client) => {
  console.log("gvgQuestionOnMonday lancé");
  setInterval(() => {   // Run the following code once every day
    console.log(`Vérification du moment() pour savoir s'il faut gvgQuestion : ${moment()}`);
    if (moment().format('dddd') == "Monday") {
      const yesAnswer = '✅';
      const noAnswer = '❌';
      const date1 = moment().add(7, 'days').startOf('isoweek').format('DD/MM');
      const date2 = moment().add(7, 'days').startOf('isoweek').add(5, 'days').format('DD/MM');
      const date3 = moment().add(7, 'days').startOf('isoweek').subtract(1, 'days').format('DD/MM');
      const embed = new MessageEmbed()
        .setTitle(`Qui veut participer aux GvG de la semaine du ${date1} au ${date2} ?`)
        .setDescription("@everyone Comme prévu, voici le message hebdomadaire pour vous incrire aux prochaines Guerres de Guilde !")
        .addField("Si tu es dispo et prêt à te battre, clique sur : ", yesAnswer)
        .addField("Si non, clique sur : ", noAnswer)
        .setFooter(`Vous avez jusqu'au ${date3} à 22h pour répondre.`);

      client.channels.fetch(client.GvGChanelID).then(chan => {
        chan.send(embed).then(async msg => {
          await msg.react(yesAnswer);
          await msg.react(noAnswer);
          await msg.pin();
        })
      })
    }
  }, 86400000)
};
