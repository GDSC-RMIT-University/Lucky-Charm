// Require the necessary discord.js classes
const {Client, Intents} = require('discord.js');
const {token} = require('./config.json');

// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS, 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGES',
        'DIRECT_MESSAGES', Intents.FLAGS.GUILD_MESSAGES]});
const Discord = require('discord.js');

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

// EVENTS Available: https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584

// Welcome message when a new user enters
client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.get('861456453046370314')
    if (!channel) return;

    const welcomeEmbed = new Discord.MessageEmbed()
        .setTitle(`Well hello there @${member.user.username}!`)
        .setDescription(`\nWelcome to our funky community \u2728 \u2728 \u2728 \nDo tell us a little bit about yourself and then make sure to hop into <#861451844856184867> and answer the Question of the day!\nOh, and don't forget to checkout our upcoming events here in <#861456370012127242> \n\nHave fun :watermelon:`)
        .setColor("#f1c40f");

    channel.send({embeds: [welcomeEmbed]})
})

// The bot going a bit nuts whenever someone says a specific word
client.on('message', message => {

    if (message.author.bot) return;

    if(message.content.includes('god')){
        message.channel.send('You called, boo? :wink:');
    } else if (message.content.includes('omg')){
        message.channel.send('Hmm? :wink:');
    } else if (message.content.includes('sad')){
        message.channel.send('You okay, boo?');
    } else if (message.content.includes('assignment')){
        message.channel.send('AARRRGGGGHHHHHHHHHHHH ASSIGNMENTS!!!!!!!!!');
    } else if (message.content.includes('cool')){
        message.channel.send('BRRRRRRRRRR :cold_face:');
    } else if (message.content.includes('lol')){
        message.channel.send(':joy: :joy: :joy:');
    } else if ( message.content === '<@!861458316734627860>' | message.content === '@420733235778158603'){
        message.channel.send('Somebody called me?');
    } else if ( message.mentions.has(client.user)){
        message.channel.send('what?');
    }
});


// Code for the slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    let role = interaction.guild.roles.cache.find(r => r.name === "Core");
    const {commandName} = interaction;

    if (commandName === 'ping') {
        await interaction.reply('pong \u2728 :watermelon:');
    } else if (commandName === 'server') {
        await interaction.reply(`Well well well . . . you wanna know about this server huh! \n\nServer name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    } else if (commandName === 'bored') {
        await interaction.reply(`Did you ever hear the tragedy of Darth Plagueis the Wise? \nI thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic, he could save others from death, but not himself :smirk:`);
    } else if (commandName === 'new') {
        await interaction.reply(`Check out our newest events here: https://gdsc.community.dev/rmit-university-melbourne/`);
    } else if (commandName === 'help') {
        await interaction.reply(`Oi, ${role} get your butt over here and help this soul!`);
    } else if (commandName === 'best') {
        await interaction.reply(`You of course, ${interaction.user.username} :kissing_heart:`);
    }

});

// Login to Discord with your client's token
client.login(token);