const { Client, Collection } = require("discord.js");
const { TOKEN, PREFIX } = require("./config");
const client = new Client({ disableEveryone: true });
client.PREFIX = PREFIX;

// A way to store the :white_check_mark: emoji
// const white_check_mark = '✅';

client.commands = new Collection();
client.commands.set("ping", require("./commands/ping"));
client.commands.set("react", require("./commands/react.js"));

// Let us know once the client is up and running
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