module.exports = (client, member) => {
	// Remove the potential gvg-relative reactions of the leaving member
	client.channels.fetch(client.GvGChanelID).then(chan => {
    chan.messages.fetch(client.GvGQuestionMsgID).then(msg => {
      msg.reactions.resolve('✅').users.fetch().then(usersCollection => {
				if (usersCollection.some(u => u.id === member.user.id)) {
					msg.reactions.resolve('✅').users.remove(member.user)
				}
			});
			msg.reactions.resolve('❌').users.fetch().then(usersCollection => {
				if (usersCollection.some(u => u.id === member.user.id)) {
					msg.reactions.resolve('❌').users.remove(member.user)
				}
			});
		});
	});
	
	// Remove the rules-relative reaction of the leaving member
	client.channels.fetch(client.RulesChanelID).then(chan => {
		chan.messages.fetch(client.RulesMsgID).then(msg => {
			msg.reactions.resolve('✅').users.fetch().then(usersCollection => {
				if (usersCollection.some(u => u.id === member.user.id)) {
					msg.reactions.resolve('✅').users.remove(member.user)
				}
			});
		});
	});
};
