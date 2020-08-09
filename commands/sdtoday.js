const { MessageEmbed } = require("discord.js");
var moment = require("moment");

module.exports = (client, message) => {
  const sd_list = {
    "Light" : [
      "Bearman",
      "Cerbère",
      "Cow Girl",
      "Diablotin",
      "Fée",
      "Harpu",
      "Howl",
      "Inugami",
      "L'ours de guerre",
      "Lutin",
      "Salamander",
      "Vagabond",
      "Viking",
      "Yéti"
    ],
    "Dark" : [
      "Bearman",
      "Cerbère",
      "Diablotin",
      "Fée",
      "Garuda",
      "Harpu",
      "Howl",
      "Inugami",
      "L'ours de guerre",
      "Lutin",
      "Salamander",
      "Vagabond",
      "Viking",
      "Yéti"
    ],
    "Fire" : [
      "Archer magique",
      "Bearman",
      "Chasseur de bêtes",
      "Diablotin",
      "Fée",
      "Garuda",
      "Griffon",
      "Harpie",
      "Harpu",
      "Howl",
      "Lutin",
      "Serpent",
      "Vagabond",
      "Viking",
      "Yéti"
    ],
    "Water" : [
      "Archer magique",
      "Bearman",
      "Cerbère",
      "Diablotin",
      "Faucheuse",
      "Garuda",
      "Golem",
      "Griffon",
      "Harpie",
      "Inferno",
      "Loup-garou",
      "Lutin",
      "Salamander",
      "Serpent",
      "Vagabond",
      "Viking",
    ],
    "Wind" : [
      "Archer magique",
      "Bearman",
      "Cerbère",
      "Diablotin",
      "Fée",
      "Golem",
      "Harpu",
      "Homme-lézard",
      "Howl",
      "Inferno",
      "L'ours de guerre",
      "Loup-garou",
      "Lutin",
      "Viking",
      "Yéti"
    ],
  }

  const sd_rotation = {
    "Monday" : ["Dark"],
    "Tuesday" : ["Fire"],
    "Wednesday" : ["Water"],
    "Thursday" : ["Wind"],
    "Friday" : ["Dark", "Light", "Fire", "Water", "Wind"],
    "Saturday" : ["Dark", "Light", "Fire", "Water", "Wind"],
    "Sunday" : ["Light"]
  }

  const today = moment().format('dddd');
  const embed = new MessageEmbed()
    .setTitle("Voici la liste des donjons secrets ouverts aujourd'hui");
  for (element of sd_rotation[today]){
    embed.addField(element, sd_list[element]);
  }

  message.channel.send(embed);
  message.delete({ timeout: 1000});
};
