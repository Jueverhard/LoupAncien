module.exports = {
	// Grant the role of id roleID from the user of id userID
	addRole: function(client, userID, roleID) {
		const role = client.guilds.resolve(client.DamnedWolvesServerID).roles.get(roleID);
		client.guilds.resolve(client.DamnedWolvesServerID).members.fetch().then(membersCollection => {
			for (m of membersCollection.values()) {
				if (m.user.id === userID) {
					if (!m.roles.find(r => r === role)) {
						m.roles.add(role);
						m.send(`Tu as désormais le rôle ${role.name} ! Fais-en bon usage, et n'oublie pas les règles qui vont avec :eyes:`);
					}
				}
			}			
		})
	},

	// Remove the role of id roleID from the user of id userID
	removeRole: function(client, userID, roleID) {
		const role = client.guilds.resolve(client.DamnedWolvesServerID).roles.get(roleID);
		client.guilds.resolve(client.DamnedWolvesServerID).members.fetch().then(membersCollection => {
			for (m of membersCollection.values()) {
				if (m.user.id === userID) {
					if (m.roles.find(r => r === role)) {
						m.roles.remove(role);
						m.send(`Tu n'as plus le rôle ${role.name} !`);
					}
				}
			}		
		})
	},

	// Put the message of id messageID and in the chanel of id chanelID in cache
	fetchMessage: function(client, chanelID, messageID) {
		client.channels.fetch(chanelID).then(chan => {
			chan.messages.fetch(messageID).then(
				console.log("Message cached")
			)
		})
	}
};
