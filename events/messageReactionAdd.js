var moment = require("moment");

module.exports = (client, reaction, user, tools) => {
	const date = moment().add(7, 'days').startOf('isoweek').subtract(1, 'days').format('DD/MM');
	if (reaction.message.id === client.RulesMsgID) {
		tools.addRole(client, user.id, client.OmegaRoleID)
	};
}
