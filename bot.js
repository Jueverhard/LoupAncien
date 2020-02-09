const { Client } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const bot = new Client();


// Permet de stocker l'emoji :white_check_mark:
const white_check_mark = '✅';
// ID du message de test sur le Serveur de test
const idTestMessage = '675682402508603422';
// ID du message de règles sur le serveur des DamnedWolves
const idRegles = '556267176970158091';
let idRoleOmega;

const testChannelID = '556237949214392342';

//Permet de savoir lorsque le bot est opérationnel lors de son lancement
bot.on('ready', function(){
  console.log("I'm there !");
})



//Récupère la liste des membres ayant réagis avec un certain emoji
bot.on('messageUpdate', message => {
	console.log(message);
	if(reaction.message.id == idTestMessage && reaction.emoji.name === '✅') {		
		let reactionUsersPromise = reaction.users.fetch();
		reactionUsersPromise.then(function(value) {
			console.log(value);
		})

		/*for(var user in reactionUsers) {
			user
		}*/
	}
});

bot.on("guildMemberAdd", member => {
	member.send(`Salut et bienvenue ${member} ! Pense à jeter un coup d'oeil aux règles :wink:`);
});

//Envoie une réponse pré-formatée à un message précis, puis supprime la réponse et le message original
bot.on('message', msg => {
  // Ne réagis pas si l'auteur du message est un bot
  if (msg.author.bot) return;
  // Ne réagis pas si le préfixe ne se situe pas au début du message
  if (msg.content.indexOf(PREFIX) !== 0) return;

  // Récupère chaque argument dans un tableau et supprime le préfixe
  // ex : "${PREFIX}cmd lol mdr" => {"cmd", "lol", "mdr"}
  const args = msg.content.slice(PREFIX.length).trim().split(/ +/g);
  // Retire le premier élément (la commande) du tableau et la renvoie sous forme minuscule
  // ex : args = {"CmD", "lol", "mdr"} ; cmd = {} => args = {lol", "mdr"} ; cmd = "cmd"
	const cmd = args.shift().toLowerCase();
	
	if(cmd === "ping"){
		msg.reply('pong !').then(sent => {
			sent.delete({ timeout: 5000 });
			msg.delete({ timeout: 5000 });
			});
    }
    if (cmd === "react") {
        msg.react('✅');
    }


    // Create a reaction collector
    /*
    const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === 'someID'
    message.awaitReactions(filter, { time: 15000 })
        .then(collected => console.log(`Collected ${collected.size} reactions`))
        .catch(console.error);
    */


    /*else if(message.content === 'Omega') {
        let role = message.guild.roles.find('name','Omega');
        idRoleOmega = role.id;
        if(message.member.roles.find('id', idRoleOmega)){
            message.reply('Hey oh ! T\'es déjà un loup Omega, qu\'est-ce que t\'essaies de faire ?!?');
        }else{
            message.member.addRole(idRoleOmega)
                .then(console.log)
                .catch(console.error);
            message.reply('Bienvenue dans la meute jeune louveteau, te voilà un Omega ! :)');
        }
    }else if(message.content === 'Alpha'){
        message.reply('Ooooh ! En voilà un loup puissant, te voilà promu au rang d\'Alpha !'
            + '\n \n . \n .. \n ... \n .... \n ..... \n ...... \n'
            + 'Ah ah. T\'as cru la vie c\'était un kiwi ' + message.member.user.username + ' ? :smirk:');
    }*/
})

//Envoie un MP souhaitant la bienvenue à un nouveau membre du Discord
/*bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur mon serveur' + member.displayName);
    }).catch(console.error)
})*/

//Comparaison des temps de réponse du bot et de l'API
/*bot.on('message', message => {

    if (message.content === 'ping') {
        message.reply('Le **BOT** a mis: ' + `[ **${message.createdTimestamp - message.createdTimestamp}**`+ ' **Ms** ] pour repondre.\nEt l\'**API** a mis: ' + `[ **${Math.round(bot.ping)}**`+ ' **Ms** ] pour repondre');
    }
});*/




// Bot's token (required for the bot to connect to Discord servers where he's been added)
bot.login(TOKEN);