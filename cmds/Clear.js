module.exports = {
    name: "clear",
    description: "clear x messages",
    execute(message, args)
    {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
        {
            message.reply("missing permissions !");
            message.delete({timeout: 0});
            return;
        }
        var amount;
        if (isNaN(args[0]) || parseInt(args[0]) <= 0){ 
            message.reply('only numbers pleases !')
            message.delete({timeout: 0});
            return;
        }
        if (parseInt(args[0]) > 99) {
            message.reply('you can only delete 99 message for each command !')
            message.delete({timeout: 0});
            return;
        } else {
            amount = parseInt(args[0]);
        }
        message.channel.bulkDelete(amount + 1, true);
        if (amount > 1) message.reply(`\`${amount}\` messages had been deleted`);
        else message.reply(`\`${amount}\` message has been deleted`);
    }
}