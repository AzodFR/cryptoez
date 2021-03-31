module.exports = {
    name: "ping",
    alias: ["p"],
    description: "test bot",
    execute(message){
        message.reply('pong');
    }
}