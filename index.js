const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();
var Twitter = require('twitter');
 
var twitter = new Twitter({
  consumer_key: process.env.C_K,
  consumer_secret: process.env.C_S,
  access_token_key: process.env.A_T_K,
  access_token_secret: process.env.A_T_S
});

const client = new Discord.Client();
const prefix = process.env.PREFIX;

client.commands = new Discord.Collection();
client.alias = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

client.automate = new Discord.Collection();
const autoCMD = fs.readdirSync('./automate').filter(file => file.endsWith('.js'));

client.followed = new Discord.Collection();
client.symbol = new Discord.Collection();

client.parentGuild = new Discord.Guild();

for(const file of commandFiles){
    const command = require(`./cmds/${file}`);
    client.commands.set(command.name, command);
    if(command.alias){
        command.alias.forEach(al => {
            client.alias.set(al, command);
        })
        
    } 
}

for(const file of autoCMD){
    const command = require(`./automate/${file}`);
    client.automate.set(command.name, command);      
}


client.once('ready', () => {
    console.log("Fetching data...");
    client.parentGuild =  client.guilds.cache.get(process.env.GUILD_ID);
    client.parentGuild.channels.cache.forEach(chan => {
        if (chan.parentID === process.env.TWITTER_CAT)
        {
            let name = chan.name;
            client.followed.set(name, chan.id);
        }
        if (chan.parentID === process.env.SYMBOL_CAT)
        {
            let name = chan.name;
            client.symbol.set(name, chan.id);
        }
    })
    client.user.setActivity(`need help ? => c!help`);
    console.log("Cryptoez is ready !");
})

client.on('message', async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if(!(client.commands.has(command) || client.alias.has(command)))return;
    
    try{
        if(client.commands.has(command)){
            client.commands.get(command).execute(message, args, twitter, client, message.guild);
        }else if(client.alias.has(command)){
            client.alias.get(command).execute(message, args, twitter, client, message.guild);
        }
        
    }catch(error){
        console.error(error);
        message.reply("OOPS... An error occured");
    }

});

client.on('voiceStateUpdate', function(oldState, newState){
    var channel = oldState.guild.channels.cache.get(oldState.channelID);
	if (newState.channelID == process.env.VOICE_CREATION_ROOM)
	{
		newState.guild.channels.create(`${newState.member.user.username}'s Room`, {
				type: 'voice',
				parent: newState.channel.parent,
				position: 1
			}).then(chan => {
					newState.member.voice.setChannel(chan);
				});
	}
    else if (oldState.channelID != process.env.VOICE_CREATION_ROOM && channel.parentID == process.env.PRIVATE_CAT)
        if (channel.members.size == 0)
					oldState.channel.delete();
});

client.login(process.env.TOKEN);

setInterval(function() {
    client.followed.forEach(follow => {
        try{
            if(client.automate.has("lastFrom"))
            {
                var channel = client.parentGuild.channels.cache.get(follow)
                client.automate.get("lastFrom").execute(client.parentGuild.channels.cache.get(channel.id), [channel.name], twitter);
            }
        }catch(error){
            console.error(error);
        }
    })
    client.symbol.forEach(symbol => {
        try{
            if(client.automate.has("lastAbout"))
            {
                var channel = client.parentGuild.channels.cache.get(symbol)
                client.automate.get("lastAbout").execute(client.parentGuild.channels.cache.get(channel.id), [channel.name], twitter);
            }
        }catch(error){
            console.error(error);
        }
    })
},90000)

