var moment = require("moment");

module.exports = (client, reaction, user, tools) => {
	const date = moment().add(7, 'days').startOf('isoweek').subtract(1, 'days').format('DD/MM');
	if (reaction.message.id === client.RulesMsgID) {
		tools.addRole(client, user.id, client.OmegaRoleID)
	} else if (reaction.message.pinned && reaction.message.footer === `Vous avez jusqu'au ${date} à 22h pour répondre.`) {
		if (reaction.emoji === '✅')
			tools.addRole(client, user.id, client.GvGRoleID);
		else if (reaction.emoji === '❌')
			tools.addRole(client, user.id, client.NoGvGRoleID);
	}
};
