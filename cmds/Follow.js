module.exports = {
    name: "follow",
    description: "create a twitter following channel of an account",
    execute(message, args, twitter, client, guild) {
        if (args.length < 1)
        {
            message.reply("please provide at least one account (without the @)");
            return;
        }
        for (let account of args)
        {
            if (client.followed.has(account))
            {
                message.reply(`${account} is already followed`)
            }
            else
            {
                guild.channels.create(account, {
                    type: 'text',
                    parent: guild.channels.cache.get(process.env.TWITTER_CAT),
                    position: 1
                }).then(chan => {
                    message.reply(`${account}'s channel created`);
                    client.followed.set(account, chan.id);
                });
            }
        }
    }
}