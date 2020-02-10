module.exports = (client, reaction, user, tools) => {
	if (reaction.message.id === client.RulesChanelID) {
		tools.addRole(user.id, client.OmegaRoleID)
	} else if (reaction.message.pinned && reaction.message.footer.text === `Vous avez jusqu'au ${date3} à 22h pour répondre.`) {
		if (reaction.emoji === '✅')
			tools.addRole(user.id, client.GvGRoleID);
		else if (reaction.emoji === '❌')
			tools.addRole(user.id, client.NoGvGRoleID);
	}
};
