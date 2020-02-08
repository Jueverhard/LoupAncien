const Discord = require('discord.js');
const bot = new Discord.Client();

//filtre pour les reactions au message de règles
const filter = reaction => reaction.emoji.name === ':white_check_mark:';
const idRegles = 556267176970158091;
let idRoleOmega;

//Permet de savoir lorsque le bot est opérationnel lors de son lancement
bot.on('ready', function(){
    console.log("I'm there !");
})

//Envoie une réponse pré-formatée à un message précis
bot.on('message', message => {
    if(message.content === '!ping'){
        message.reply('pong !');
    }
    else if(message.content === 'Omega') {
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
    }
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





bot.login('NTU2MjE5NTIxNDk3ODI1Mjkw.D220wQ.gETpaOdnnUIg7fMSCXxCxARs1zw');