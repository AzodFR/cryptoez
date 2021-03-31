module.exports = {
    name: "unfollow",
    description: "unfollowing an account",
    execute(message, args, twitter, client, guild) {
        if (args.length < 1 || args.length > 2 || (args.length == 2 && args[1].toLowerCase() != '--delete'))
        {
            message.reply("please provide one account (--delete for delete channel)");
            return;
        }
        var account = args[0];
        var collection;
        if (!account.startsWith('$'))
        {
            collection = client.followed;
        }
        else
        {
            collection = client.symbol;
            account = args[0].substring(1);
        }
        if (!collection.has(account))
        {
            message.reply(`${account} is not followed`);
        }
        else
        {
            if (args.length == 2)
                client.parentGuild.channels.cache.get(collection.get(account)).delete('unfollow');
            else
                client.parentGuild.channels.cache.get(collection.get(account)).setName(account + '-unfollowed');
            collection.delete(account);
            message.reply(`${args[0]} is no longer followed`);
        }
    }
}