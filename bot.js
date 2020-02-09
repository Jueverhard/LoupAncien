const { Client, Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });
client.PREFIX = PREFIX;

// const omegaRole = client.guild.roles.get('556267036544729090');
// const white_check_mark = client.emojis.find(emoji => emoji.name === '✅');

client.commands = new Collection();
client.commands.set("ping", require("./commands/ping"));
client.commands.set("react", require("./commands/react.js"));
client.commands.set("refresh", require("./commands/refresh.js"));

// Let us know once the client is up and running
// Also assign Omega role on rules' reading
client.on("ready", () => require("./events/ready")(client));
// Does specific actions in reactions to specific messages
client.on("message", msg => require("./events/message.js")(client, msg));
// Welcome any new member on the server and remind him to look at the rules
client.on("guildMemberAdd", member => require("./events/guildMemberAdd.js")(client, member));



// Bot's token (required for the client to connect to Discord servers where he's been added)
client.login(TOKEN);

client.on("warn", console.warn);
client.on("error", console.error);
// client.on("debug", console.log);
