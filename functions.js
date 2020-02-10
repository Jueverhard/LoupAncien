module.exports = {
	addRole: function(client, userID, roleID) {
		const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
		const role = serverDamnedWolves.roles.get(roleID);
		serverDamnedWolves.members.fetch().then(membersCollection => {
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

	removeRole: function(client, userID, roleID) {
		const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
		const role = serverDamnedWolves.roles.get(roleID);
		serverDamnedWolves.members.fetch().then(membersCollection => {
			for (m of membersCollection.values()) {
				if (m.user.id === userID) {
					if (m.roles.find(r => r === role)) {
						m.roles.remove(role);
						m.send(`Tu n'as plus le rôle ${role.name} !`);
					}
				}
			}			
		})
	}
};
