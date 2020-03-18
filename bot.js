const { Client, Collection } = require("discord.js");
const tools = require("./functions.js");

const client = new Client();
const { TOKEN, PREFIX, DamnedWolvesServerID, GvGChanelID, RulesChanelID, LogsChanelID, RulesMsgID, OmegaRoleID, GvGRoleID, NoGvGRoleID, MazeChanelID, moreThanOmegaMembersID, unauthorizedMembersID, TestCommandesChanelID, TestLogsChanelID, BotID} = require("./config");

client.PREFIX = PREFIX;
client.DamnedWolvesServerID = DamnedWolvesServerID;
client.RulesChanelID = RulesChanelID;
client.GvGChanelID = GvGChanelID;
client.LogsChanelID = LogsChanelID;
client.TestCommandesChanelID = TestCommandesChanelID;
client.RulesMsgID = RulesMsgID;
client.OmegaRoleID = OmegaRoleID;
client.GvGRoleID = GvGRoleID;
client.NoGvGRoleID = NoGvGRoleID;
client.MazeChanelID = MazeChanelID;
client.moreThanOmegaMembersID = moreThanOmegaMembersID;
client.unauthorizedMembersID = unauthorizedMembersID;
client.TestLogsChanelID = TestLogsChanelID;
client.BotID = BotID;

client.commands = new Collection();
// Listes available commands with explanations on how to use them
client.commands.set("help", require("./commands/help"));
// Replies pong then deletes it (mainly used for debugging purposes)
client.commands.set("ping", require("./commands/ping"));
// Send a message and react to it
client.commands.set("react", require("./commands/react"));
// Takes one argument to determine what is to be refreshed (omega | gvg)
// Ex : ${PREFIX}refresh omega
client.commands.set("refresh", require("./commands/refresh"));
// Takes arguments that the bot will repeat
// Ex : "${PREFIX}repeat coucou c'est moi :D" => the bot will say "coucou c'est moi :D"
client.commands.set("repeat", require("./commands/repeat"));
// Send an MessageEmbed to ask members whether they want to do GvG
client.commands.set("gvgquestion", require("./commands/gvgquestion"));
// Look at the right EmbedMessage to tell who want to fight and who do not
client.commands.set("gvganswer", require("./commands/gvganswer"));
// Remind everyone to help in Tartarus maze
client.commands.set("laby", require("./commands/laby"));
// Remind the members with GvG role to attack
client.commands.set("gvg", require("./commands/gvg"));

// Used to test things during development
client.commands.set("test", require("./commands/test"));

// Let us know once the client is up and running
client.on("ready", () => require("./events/ready")(client, tools));
// Assign GvG roles on every Sunday at 10PM
client.on("ready", () => require("./events/gvgAnswerOnSundayTenPM")(client, tools));
// Send inscription message on Monday (any hour)
client.on("ready", () => require("./events/gvgQuestionOnMonday")(client));
// Does specific actions in reactions to specific messages
client.on("message", msg => require("./events/message")(client, msg));
// Welcome any new member on the server and remind him to look at the rules
client.on("guildMemberAdd", member => require("./events/guildMemberAdd")(client, member));
// Add role based on the added reaction
client.on("messageReactionAdd", (reaction, user) => require("./events/messageReactionAdd")(client, reaction, user, tools));
// Remove role based on the removed reaction
client.on("messageReactionRemove", (reaction, user) => require("./events/messageReactionRemove")(client, reaction, user, tools));



// Bot's token (required for the client to connect to Discord servers where he's been added)
client.login(TOKEN);

client.on("warn", console.warn);
client.on("error", console.error);
// client.on("debug", console.log);
