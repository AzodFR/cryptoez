const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Discord.Client();
const {prefix} = require('./config.json')

client.commands = new Discord.Collection();
client.alias = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));


for(const file of commandFiles){
    const command = require(`./cmds/${file}`);
    client.commands.set(command.name, command);
    if(command.alias){
        command.alias.forEach(al => {
            client.alias.set(al, command);
        })
        
    } 
}


client.once('ready', () => {
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
            client.commands.get(command).execute(message, args, client, prefix);
        }else if(client.alias.has(command)){
            client.alias.get(command).execute(message, args, client, prefix);
        }
        
    }catch(error){
        console.error(error);
        message.reply("OOPS... An error occured");
    }

});

client.login(process.env.TOKEN);