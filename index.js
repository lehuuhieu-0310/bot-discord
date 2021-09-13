const { Client, Intents, MessageEmbed } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
require('dotenv').config()

//token of discord bot
client.login(process.env.TOKEN)

client.once('ready', () => {
    console.log('ready!')
})

client.on('messageCreate', getImage)

function getImage(message) {

    const listSuzyImage = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg']
    const listIUImage = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg']

    const content = message.content

    if (content == '$image suzy') {
        const random = Math.floor(Math.random() * listSuzyImage.length)

        const imageMessageEmbed = new MessageEmbed()
            .setColor('#FF7F9D')
            .setImage(`${process.env.URL_IMAGE}/suzy/${listSuzyImage[random]}`)
            .setTimestamp()
            .setFooter('crawl in the internet')
        message.reply({ embeds: [imageMessageEmbed] })

    } else if (content == '$image IU') {
        const random = Math.floor(Math.random() * listIUImage.length)
        const imageMessageEmbed = new MessageEmbed()
            .setColor('#FF7F9D')
            .setImage(`${process.env.URL_IMAGE}/IU/${listIUImage[random]}`)
            .setTimestamp()
            .setFooter('crawl in the internet')
        message.reply({ embeds: [imageMessageEmbed] })

    } else if (content == '$help') {
        message.reply({ embeds: [helpMessageEmbed] })
    }
}

const helpMessageEmbed = new MessageEmbed()
    .setColor('#FF7F9D')
    .setAuthor('MyBot Commands', process.env.AVATAR, '')
    .setThumbnail(process.env.AVATAR)
    .addFields(
        { name: 'Image Of Suzy', value: '$image suzy', inline: true },
        { name: 'Image Of IU', value: '$image IU', inline: true },
    )
    .setTimestamp()
