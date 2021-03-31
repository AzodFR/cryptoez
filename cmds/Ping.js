module.exports = {
    name: "ping",
    alias: ["p"],
    description: "test bot",
    execute(message, args){
        message.reply('pong');
    }
}