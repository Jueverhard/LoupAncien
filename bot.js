const { Client, Collection } = require("discord.js");
const client = new Client({ disableEveryone: true });
const { TOKEN, PREFIX, DamnedWolvesServerID, GvGChanelID, RulesChanelID, LogsChanelID, RulesMsgID, OmegaRoleID, GvGRoleID, NoGvGRoleID} = require("./config");

client.PREFIX = PREFIX;
client.DamnedWolvesServerID = DamnedWolvesServerID;
client.RulesChanelID = RulesChanelID;
client.GvGChanelID = GvGChanelID;
client.LogsChanelID = LogsChanelID;
client.RulesMsgID = RulesMsgID;
client.OmegaRoleID = OmegaRoleID;
client.GvGRoleID = GvGRoleID;
client.NoGvGRoleID = NoGvGRoleID;


client.commands = new Collection();
client.commands.set("ping", require("./commands/ping"));
client.commands.set("react", require("./commands/react"));
client.commands.set("refresh", require("./commands/refresh"));
client.commands.set("repeat", require("./commands/repeat"));
// Send an MessageEmbed to ask members whether they want to do GvG
client.commands.set("gvgquestion", require("./commands/gvgquestion"));
// Look at the right EmbedMessage to tell who want to fight and who do not
client.commands.set("gvganswer", require("./commands/gvganswer"));

// Let us know once the client is up and running
client.on("ready", () => require("./events/ready")(client));
// Assign Omega role on rules' reading
client.on("ready", () => require("./events/assignOmegaRole")(client));
// Assign GvG roles on every Sunday at 10PM
client.on("ready", () => require("./events/assignGvGRole")(client));
// Does specific actions in reactions to specific messages
client.on("message", msg => require("./events/message")(client, msg));
// Welcome any new member on the server and remind him to look at the rules
client.on("guildMemberAdd", member => require("./events/guildMemberAdd")(client, member));



// Bot's token (required for the client to connect to Discord servers where he's been added)
client.login(TOKEN);

client.on("warn", console.warn);
client.on("error", console.error);
// client.on("debug", console.log);
