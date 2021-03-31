const Discord = require('discord.js');
module.exports = {
    name: "help",
    alias: ["h", "?"],
    description: "Display all the commands list",
    execute(message, args, twitter, client){

        var embed = new Discord.MessageEmbed()
                    .setTitle("List of commands")
                    .setAuthor(client.user.username, client.user.avatarURL())
                    .setDescription('-----------------')
                    .setColor("BLUE")
                    .setURL("https://github.com/AzodFR/cryptoez/");
        client.commands.forEach(cmd => {
            var name = process.env.PREFIX+cmd.name;
            if(cmd.alias){
                name += " (or ";
                cmd.alias.forEach(al => {
                    name+= process.env.PREFIX+al+" | ";
                })
                name = name.slice(0,name.length-3);
                name += ")";
                
            } 
            var desc = cmd.description;
            embed.addField(name,desc,false);
        });
            
        message.channel.send(embed);
        
    }
}