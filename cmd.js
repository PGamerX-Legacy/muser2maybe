/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
											Package imports
/////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token  = "OTA3OTAzNzEzMzU0NTg4MTkx.YYt9OQ.1Ua1Ex0Ym9JYJBFKwmjiScJoc_w";
const fs = require('fs');
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
											Command imports
/////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
const commands = [];
const commandFiles = fs.readdirSync('./scommands').filter(file => file.endsWith('.js'));
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
										Required data (CHANGE IT)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
const clientId = '907903713354588191';
const guildId = '906596605371752520';
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
											Push to Discord
/////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
for (const file of commandFiles) {
	const command = require(`./scommands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
