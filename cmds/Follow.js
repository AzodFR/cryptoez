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
            if (!account.startsWith('$'))
            {
                if (client.followed.has(account))
                {
                    message.reply(`${account} is already followed`)
                }
                else
                {
                    var ch = client.parentGuild.channels.cache.find(ch => ch.name.startsWith(account))
                    if (!ch || ch.parentID != process.env.TWITTER_CAT)
                    {
                        guild.channels.create(account, {
                            type: 'text',
                            parent: guild.channels.cache.get(process.env.TWITTER_CAT),
                            position: 1
                        }).then(chan => {
                            client.followed.set(account, chan.id);
                        });
                    }
                    else
                    {
                        ch.setName(account)
                        client.followed.set(account, ch.id);
                    }
                    message.reply(`${account} is now followed`);
                }
            }
            else
            {
                var symbol = account.substring(1);
                var ch = client.parentGuild.channels.cache.find(ch => ch.name.startsWith(symbol))
                    if (!ch || ch.parentID != process.env.SYMBOL_CAT)
                    {
                        guild.channels.create(symbol, {
                            type: 'text',
                            parent: guild.channels.cache.get(process.env.SYMBOL_CAT),
                            position: 1
                        }).then(chan => {
                            client.symbol.set(symbol, chan.id);
                        });
                    }
                    else
                    {
                        ch.setName(symbol)
                        client.symbol.set(symbol, ch.id);
                    }
                    message.reply(`${account} is now followed`);
            }
        }
    }
}