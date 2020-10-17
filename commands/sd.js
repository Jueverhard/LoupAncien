const { MessageEmbed, MessageAttachment } = require("discord.js");
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
  };
  const sd_rotation = {
    "Monday" : ["Dark"],
    "Tuesday" : ["Fire"],
    "Wednesday" : ["Water"],
    "Thursday" : ["Wind"],
    "Friday" : ["Dark", "Light", "Fire", "Water", "Wind"],
    "Saturday" : ["Dark", "Light", "Fire", "Water", "Wind"],
    "Sunday" : ["Light"]
  };
  const elements = {
    "Light" : "#ffffb3",
    "Dark" : "#800040",
    "Fire" : "#ff0000",
    "Water" : "#008ae6",
    "Wind" : "#ccff33"
  };

  const today = moment().format('dddd');      // Used to gather the today day
  // const today = "Friday";                  // Used to test whenever there are several elements
  for (element of sd_rotation[today]){
    let elementImg = "";
    try {
      // Path for the images on Windows
      elementImg = new MessageAttachment(`D:/Travaux/Perso/Loup ancien/images/${element}.png`);
    } catch {
      // Path for the images on Ubuntu
      elementImg = new MessageAttachment(`/mnt/storage/Travaux/Perso/Loup ancien/images/${element}.png`);
    }
    
    const embed = new MessageEmbed()
      .setTitle(`Voici la liste des donjons secrets ouverts aujourd'hui`)
      .addField(element, sd_list[element])
      .setColor(elements[element])
      .attachFiles(elementImg)
      .setThumbnail(`attachment://${element}.png`);
    message.channel.send(embed);
  }
  message.delete({ timeout: 1000});
};
