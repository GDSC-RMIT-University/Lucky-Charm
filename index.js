// Require the necessary discord.js classes
const {Client, Intents} = require('discord.js');
const {token, guildId} = require('./config.json');
// Link to games: https://opensourcelibs.com/lib/djs-games
const {TicTacToe} = require('djs-games');
const {ConnectFour} = require('djs-games');
const {SnakeGame} = require('djs-games');


// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGES',
        'DIRECT_MESSAGES', Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});
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

    var guild = client.guilds.cache.get(guildId);
    role = guild.roles.cache.find(r => r.name === "@everyone");

    if (message.content.includes('god')) {
        message.channel.send('You called, boo? :wink:');
    } else if (message.content.includes('omg')) {
        message.channel.send('Hmm? :wink:');
    } else if (message.content.includes('sad')) {
        message.channel.send('You okay, boo?');
    } else if (message.content.includes('assignment')) {
        message.channel.send('AARRRGGGGHHHHHHHHHHHH ASSIGNMENTS!!!!!!!!!');
    } else if (message.content.includes('cool')) {
        message.channel.send('BRRRRRRRRRR :cold_face:');
    } else if (message.content.includes('lol')) {
        message.channel.send(':joy: :joy: :joy:');
    } else if (message.content === '<@!861458316734627860>' | message.content === '@420733235778158603') {
        message.channel.send('Somebody called me?');
    } else if (message.mentions.has(client.user)) {
        message.channel.send('what?');
        // Change the sentence and link with every new event
    } else if (message.content.includes('what\'s new?')) {
        message.channel.send(`RSVP soon ${role.name} or else . . . \nhttps://gdsc.community.dev/e/mppex6/`);
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
    } else if (commandName === 'games') {

        const pickGame = new Discord.MessageEmbed()
            .setTitle("Pick a game")
            .setDescription(`\n❌ Tic Tac Toe\n\n🟡 Connect Four\n\nP.S Only the player who made the slash command needs to react to pick the game!`)
            .setColor("#c27c0e");

        const message = await interaction.reply({
            embeds: [pickGame],
            content: 'Looks like you\'re up for a challenge today! Which game would you like to play?\n',
            fetchReply: true
        })

        await message.react('❌');
        await message.react('🟡');

        const filter = (reaction, user) => {
            return !user.bot
        }

        const collector = message.createReactionCollector({filter, max: 1, time: 1000 * 100000});

        collector.on('collect', async (reaction) => {

            const replyMessage = await message.reply('To play, tag your opponent!');

            const filterReplyMessage = (message) => {
                return !message.author.bot
            }

            const replyCollector = replyMessage.channel.createMessageCollector({
                filterReplyMessage,
                max: 1,
                time: 1000 * 100000
            });

            replyCollector.on('collect', (newMessage) => {

                if (newMessage.mentions.users.first() && newMessage.mentions.users.first() !== newMessage.author) {

                    if (reaction.emoji.name === '❌') {

                        const opponent = newMessage.mentions.users.first();

                        const game = new TicTacToe({
                            message: newMessage,
                            opponent: opponent,
                            xEmoji: '❌', // The Emote for X
                            oEmoji: '⭕', // The Emote for O
                            xColor: 'PRIMARY',
                            oColor: 'PRIMARY', // The Color for O
                            embedDescription: 'GAME ON!',
                        })
                        game.start()
                    } else if (reaction.emoji.name === '🟡') {
                        const game = new ConnectFour({
                            message: newMessage,
                            player1: '🔴',
                            player2: '🟡',
                        })
                        game.start()
                    } else {
                        message.reply('You need to react properly.');
                    }
                } else if (newMessage.mentions.users.first() && newMessage.mentions.users.first() === newMessage.author) {
                    newMessage.channel.send('Oi, you can\'t pick yourself!!!!!! Restart the whoole thing again . . .');
                } else {
                    newMessage.channel.send('You\'ve gotta TAG someone, my friend. Restart the whoole thing again . . .');
                }
            });
        });
    } else if (commandName === 'best') {
        await interaction.reply(`You of course, ${interaction.user.username} :kissing_heart:`);
    }
});

// Login to Discord with your client's token
client.login(token);