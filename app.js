const { Client, MessageAttachment } = require('discord.js')
const client = new Client()
const axios = require('axios')
const moment = require('moment')
require('dotenv').config()

//token of discord bot
client.login(process.env.TOKEN)

client.once('ready', () => {
    console.log('ready!')
})

client.on('message', getImage)

function getImage(message) {

    const listSuzyImage = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg']
    const listIUImage = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg']

    const content = message.content

    if (content == 'image suzy') {
        const random = Math.floor(Math.random() * listSuzyImage.length)
        const attachment = new MessageAttachment(`${process.env.URL_IMAGE}/suzy/${listSuzyImage[random]}`)
        message.reply('this is images ', attachment)
    } else if (content == "image IU") {
        const random = Math.floor(Math.random() * listIUImage.length)
        const attachment = new MessageAttachment(`${process.env.URL_IMAGE}/IU/${listIUImage[random]}`)
        message.reply('this is images ', attachment)
    } else if (content == 'help') {
        const helpMessage =
            `Commands:
        'image suzy': image of suzy
        'iamge IU': image of IU
        'image CucTieuY': image of Cúc Tiểu Y`
        message.channel.send(helpMessage)
    }
}


async function tisobongda(msg) {
    if (msg.content === '!hello') {
        var userTag = msg.member.user.tag.split('#')[0]
        msg.reply(`hello anh ${userTag}`)
    } else if (msg.content === '!tiso') {
        setInterval(async () => {
            let url = process.env.REALTIME_CHANGE
            await axios
                .get(url)
                .then(async (response) => {
                    var list = response.data.changeList
                    if (list != null) {
                        for (let i = 0; i < list.length; i++) {
                            if (list[i].matchId == process.env.MATCHID) {
                                var homeScore = list[i].homeScore
                                var homeEn = list[i].homeEn
                                var awayScore = list[i].awayScore
                                var awayEn = list[i].awayEn

                                var lastMessage
                                await msg.channel.messages
                                    .fetch({ limit: 1 })
                                    .then((message) => {
                                        console.log(message.first().content)
                                        lastMessage = message.first().content.slice(7)
                                    })
                                    .catch((err) => console.log(err))

                                var hardTime = moment('23:00', 'HH:mm')
                                //time now
                                var now = moment()
                                var minutes = Math.floor(now.diff(hardTime) / 60000)

                                if (minutes < 10) {
                                    minutes = '0' + minutes
                                }

                                var output = 'Switzerland : ' + homeScore + '    -   Spain : ' + awayScore
                                console.log(lastMessage)
                                if (lastMessage != output) {
                                    return msg.channel.send(`${minutes}'    ${output}`)
                                }
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }, 10000)
    }
}
