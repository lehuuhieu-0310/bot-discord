const { Client, Intents, MessageEmbed } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
const axios = require('axios').default
require('dotenv').config()

//token of discord bot
client.login(process.env.TOKEN)

client.once('ready', () => {
    console.log('ready!')
})

client.on('messageCreate', getImage)

function getImage(message) {

    const content = message.content.split(" ")

    if (content[0] == '$image') {
        const name = content[1] || []
        if (name.length == 0) return
        else {
            axios.get(`${process.env.API_IMAGE}/${name}`)
                .then((data) => {
                    const imageMessageEmbed = new MessageEmbed()
                        .setColor('#FF7F9D')
                        .setImage(data.data.image_url)
                        .setTimestamp()
                        .setFooter('crawl in the internet')
                    message.reply({ embeds: [imageMessageEmbed] })
                })
                .catch(error => message.reply('Not Found'))

        }
    } else if (content[0] == '$help') {
        message.reply({ embeds: [helpMessageEmbed] })
    }
}

const helpMessageEmbed = new MessageEmbed()
    .setColor('#FF7F9D')
    .setAuthor('MyBot Commands', `${process.env.URL_IMAGE}/suzy/2.jpg`, '')
    .setThumbnail(`${process.env.URL_IMAGE}/suzy/2.jpg`)
    .addFields(
        { name: 'Image Of Suzy', value: '$image suzy', inline: true },
        { name: 'Image Of IU', value: '$image IU', inline: true },
    )
    .setTimestamp()
