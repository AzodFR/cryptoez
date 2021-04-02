const Discord = require('discord.js')
const request = require('request')

module.exports = {
    name: "price",
    description: "Consult price of a crypto",
    execute(message, args)
    {
		let base = "USDT"
		let usageembed = new Discord.MessageEmbed()
		.setTitle("Usage : c!crypto <crypto symbol> <optionnal price base>")
		.setDescription("Example : \nc!crypto ETH USDT\nc!crypto BTC")
		.setTimestamp()
		.setColor("BLUE")
		if (!args[0]) return (message.channel.send(usageembed));
		if (args[1])
			base = args[1].toUpperCase();

		let options = {
			url: `https://api.binance.com/api/v3/ticker/price?symbol=${args[0].toUpperCase()}${base}`,
		};
		request(options, function (error, response, body) {
			let list = JSON.parse(body)
			if (!list['symbol'] || !list['price']){
				let errorembed = new Discord.MessageEmbed()
				.setDescription("Incorrect Crypto symbol or Price base.")
				.setTimestamp()
				.setColor("RED")
				return message.channel.send(errorembed);
			}
			let successembed = new Discord.MessageEmbed()
			.setTitle(`Actual price for ${args[0]}`)
			.setDescription(`${list["price"]} ${base}`)
			.setTimestamp()
			.setColor("GREEN")
			message.channel.send(successembed)
		})
	}
}