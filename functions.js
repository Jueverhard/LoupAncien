module.exports = {
	addRole: function(client, roleID, userID) {
		const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
		const role = serverDamnedWolves.roles.get(roleID);
		serverDamnedWolves.members.fetch(m => m.user.id === userID).then(m => {
			if (!m.roles.find(r => r === role)) { 
				m.roles.add(role);
				m.send(`Tu as désormais le rôle ${role.name} !`);
			}
		})
	},

	removeRole: function(client, roleID, userID) {
		const serverDamnedWolves = client.guilds.resolve(client.DamnedWolvesServerID);
		const role = serverDamnedWolves.roles.get(roleID);
		serverDamnedWolves.members.fetch(m => m.user.id === userID).then(m => {
			if (m.roles.find(r => r === role)) {
				m.roles.remove(role);
				m.send(`Tu n'as plus le rôle ${role.name} !`);
			}
		})
	}
};
