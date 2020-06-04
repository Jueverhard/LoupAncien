module.exports = async (client, message) => {
  chan = await client.channels.fetch("542463487310430235");
  message.channel.send(`${message.author} Tu as suivi le tutoriel épinglé dans ${chan} et tu voudrais savoir si ton Baleygr à les stats requises pour faire du BJ5 en toute sérénité ? Renseigne les statistiques de ton Baleygr dans ce tableur et soit fixé tout de suite ! https://drive.google.com/file/d/1YK-0Cw8YSWSsp1I4jDwB4FW6zOXWBllE/view?usp=sharing`);
  message.delete({ timeout: 1000});
};
