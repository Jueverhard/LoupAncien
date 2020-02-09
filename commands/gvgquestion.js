const { MessageEmbed } = require("discord.js");
var moment = require("moment");

module.exports = (client, message) => {
  const yesAnswer = '✅';
  const noAnswer = '❌';
  const date1 = moment().add(7, 'days').startOf('isoweek').format('DD/MM');
  const date2 = moment().add(7, 'days').startOf('isoweek').add(6, 'days').format('DD/MM');
  const date3 = moment().add(7, 'days').startOf('isoweek').subtract(1, 'days').format('DD/MM');
  const embed = new MessageEmbed()
    .setTitle(`Qui veut participer aux GvG de la semaine du ${date1} au ${date2} ?`)
    .addField("Si tu es dispo et chaud pour te battre, clique sur : ", yesAnswer)
    .addField("Si non, clique sur : ", noAnswer)
    .setFooter(`Vous avez jusqu'au ${date3} à 22h pour répondre.`);

    client.channels.fetch(client.LogsChanelID).then(chan => {
      chan.send(embed).then(async msg => {
        await msg.react(yesAnswer);
        await msg.react(noAnswer);
      })
    })
};
