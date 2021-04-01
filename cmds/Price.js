const price = require('crypto-price')
const Discord = require('discord.js')

module.exports = {
    name: "price",
    description: "Consult price of a crypto",
    execute(message, args)
    {
		let base = "USD"
		let usageembed = new Discord.MessageEmbed()
		.setTitle("Usage : c!crypto <crypto symbol> <optionnal price base>")
		.setDescription("Example : \nc!crypto ETH USD\nc!crypto BTC")
		.setTimestamp()
		.setColor("BLUE")
		if (!args[0]) return (message.channel.send(usageembed));
		if (args[1])
			base = args[1];
	
		price.getCryptoPrice(base, args[0]).then(obj => {
			let successembed = new Discord.MessageEmbed()
			.setTitle(`Actual price for ${args[0]}`)
			.setDescription(`${obj.price} ${base}`)
			.setTimestamp()
			.setColor("GREEN")
			message.channel.send(successembed)
		}).catch(err => {
			let errorembed = new Discord.MessageEmbed()
			.setDescription("Incorrect Crypto symbol or Price base.")
			.setTimestamp()
			.setColor("RED")
			message.channel.send(errorembed)
		})
	}
}