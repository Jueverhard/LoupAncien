const { Client, Collection } = require("discord.js");
const tools = require("./functions.js");

const client = new Client();
const { TOKEN, PREFIX, DamnedWolvesServerID, GvGChanelID, RulesChanelID, LogsChanelID, RulesMsgID, OmegaRoleID, GvGRoleID, NoGvGRoleID, MazeChanelID, moreThanOmegaMembersID, unauthorizedMembersID, TestCommandesChanelID, TestLogsChanelID, BotID, harmlessCommands} = require("./config");

const attr_list = [
  "TOKEN",
  "PREFIX",
  "DamnedWolvesServerID",
  "GvGChanelID",
  "RulesChanelID",
  "LogsChanelID",
  "RulesMsgID",
  "OmegaRoleID",
  "GvGRoleID",
  "NoGvGRoleID",
  "MazeChanelID",
  "moreThanOmegaMembersID",
  "unauthorizedMembersID",
  "TestCommandesChanelID",
  "TestLogsChanelID",
  "BotID",
  "harmlessCommands"
];
// for(attr of attr_list){
//   client.attr = attr;
// }
client.PREFIX = PREFIX;
client.DamnedWolvesServerID = DamnedWolvesServerID;
client.RulesChanelID = RulesChanelID;
client.GvGChanelID = GvGChanelID;
client.LogsChanelID = LogsChanelID;
client.TestCommandesChanelID = TestCommandesChanelID;
client.RulesMsgID = RulesMsgID;
client.GvGQuestionMsgID = 1;
client.OmegaRoleID = OmegaRoleID;
client.GvGRoleID = GvGRoleID;
client.NoGvGRoleID = NoGvGRoleID;
client.MazeChanelID = MazeChanelID;
client.moreThanOmegaMembersID = moreThanOmegaMembersID;
client.unauthorizedMembersID = unauthorizedMembersID;
client.TestLogsChanelID = TestLogsChanelID;
client.BotID = BotID;
client.harmlessCommands = harmlessCommands;

const commands = [
  "help",           // List available commands with explanations on how to use them
  "ping",           // Reply pong then delete it (mainly used for debugging purposes)
  "react",          // Send a message and react to it
  "refresh",        // Take one argument to determine what is to be refreshed || Ex : ${PREFIX}refresh omega
  "repeat",         // Take arguments that the bot will repeat || Ex : "${PREFIX}repeat coucou c'est moi :D" => the bot will say "coucou c'est moi :D"
  "gvgquestion",    // Send an MessageEmbed to ask members whether they want to do GvG
  "gvganswer",      // Look at the right EmbedMessage to tell who want to fight and who do not
  "laby",           // Remind everyone to help in Tartarus maze
  "gvg",            // Remind the members with GvG role to attack
  "bj5",            // Reply with a link towards BJ5 validation sheet
  "sdtoday"         // List the openable secret dungeons this day
];

client.commands = new Collection();
for(cmd of commands){
  client.commands.set(cmd, require(`./commands/${cmd}`));
}

// Used to test things during development
// client.commands.set("test", require("./commands/test"));

// Let us know once the client is up and running
client.on("ready", () => require("./events/ready")(client, tools));
// Assign GvG roles on every Sunday at 10PM
client.on("ready", () => require("./events/gvgAnswerOnSundayTenPM")(client, tools));
// Send inscription message on Monday (any hour)
client.on("ready", () => require("./events/gvgQuestionOnMonday")(client));
// Do specific actions in reactions to specific messages
client.on("message", msg => require("./events/message")(client, msg));
// Welcome any new member on the server and remind him to look at the rules
client.on("guildMemberAdd", member => require("./events/guildMemberAdd")(client, member));
// Remove the reactions from this user on specific messages
client.on("guildMemberRemove", member => require("./events/guildMemberRemove")(client, member));
// Add role based on the added reaction
client.on("messageReactionAdd", (reaction, user) => require("./events/messageReactionAdd")(client, reaction, user, tools));
// Remove role based on the removed reaction
client.on("messageReactionRemove", (reaction, user) => require("./events/messageReactionRemove")(client, reaction, user, tools));


// Bot's token (required for the client to connect to Discord servers where he's been added)
client.login(TOKEN);

client.on("warn", console.warn);
client.on("error", console.error);
// client.on("debug", console.log);
