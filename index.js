// Require the necessary discord.js classes
const {Client, Intents} = require('discord.js');
const {token} = require('./config.json');

// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS, 'GUILD_PRESENCES', 'GUILD_MEMBERS']});
const Discord = require('discord.js');

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

// EVENTS Available: https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584

// When a new user enters
client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.get('861456453046370314')
    if (!channel) return;

    const welcomeEmbed = new Discord.MessageEmbed()
        .setTitle(`Well hello there <@${member.user.username}>!`)
        .setDescription(`\nWelcome to our funky community \u2728 \u2728 \u2728 \nDo tell us a little bit about yourself and then make sure to hop into <#861451844856184867> and answer the Question of the day!\n
    Oh, and don't forget to checkout our upcoming events here in <#861456370012127242> \n\nHave fun :watermelon:`)
        .setColor("#f1c40f");

    channel.send({embeds: [welcomeEmbed]})
})

// Code for the slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const {commandName} = interaction;

    if (commandName === 'ping') {
        await interaction.reply('pong \u2728 :watermelon:');
    } else if (commandName === 'server') {
        await interaction.reply(`Well well well . . . you wanna know about this server huh! \n\nServer name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
});

// Login to Discord with your client's token
client.login(token);