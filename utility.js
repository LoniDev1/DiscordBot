const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const { token } = require('./config.json');

//BotID 1 :1191053796508434502 2: 1216470203307655198

const botID = "1191053796508434502"
const ServerID = "925722769721790484"
const bottoken = token

const rest = new REST().setToken(bottoken)
const slashRegister = async () => {
    try {
        await rest.put(Routes.applicationCommands(botID),{
            body: [
                new SlashCommandBuilder()
                    .setName("ping")
                    .setDescription("Einfach ein Ping Command")
                    .addStringOption(option => {
                        return option
                        .setName("text")
                        .setDescription("Bro einfach text hinterfrag es nicht")
                        .setRequired(true)
                        .setMinLength(5)
                        .setMaxLength(30)
                    }),
                new SlashCommandBuilder()
                    .setName("ban")
                    .setDescription("Bro der Name sagt doch schon alles")
                    .addUserOption( option => {
                        return option
                        .setName("target")
                        .setDescription("Ziel")
                        .setRequired(true)
                    })
                    .addStringOption(option => {
                        return option
                        .setName("reason") 
                        .setDescription("Grund")

                    }),
                new SlashCommandBuilder()
                    .setName("dm")
                    .setDescription("Sendet eine DM(Direct Message) an eine Person")
                    .addUserOption(option => {
                        return option
                        .setName("user")
                        .setDescription("ID von dem User")
                        .setRequired(true)

                    })
                    .addStringOption(option => {
                        return option
                        .setName("nachricht")
                        .setDescription("Die Nachricht die an den User gesendet werden soll")
                        .setRequired(true)
                    })
                    .addNumberOption(option => {
                        return option
                        .setName("loop")
                        .setDescription("Wie oft wird eine Nachricht gesendet")
                    }),

                new SlashCommandBuilder()
                    .setName("report")
                    .setDescription("Reporte ein Fehler")
                    .addStringOption(option => {
                        return option
                        .setName("message")
                        .setDescription("Was möchtest du Reporten ?")
                        .setRequired(true)
                    }),
                new SlashCommandBuilder()
                    .setName("beta")
                    .setDescription("Infos zu der Beta"),
                new SlashCommandBuilder()
                    .setName("inbox")
                    .setDescription("Wer hatt dich erwähnt? Hiermit siehst du es.")
                    .addSubcommand(command => command.setName('get').setDescription('Deine erwähnungs inbox.'))
                    .addSubcommand(command => command.setName('clear').setDescription('Löscht deine erwähnungs inbox.').addStringOption(option => option.setName('id').setDescription('The ID of the message to clear (type ALL to clear everything) (sorry übersetzung folgt...)').setRequired(true))),
                new SlashCommandBuilder()
                    .setName("dm-modal")
                    .setDescription("Komplizierter Aber Funktioniert"),
                new SlashCommandBuilder()
                    .setName("invite")
                    .setDescription("Lade Leute in Dein Sprach Kanal ein (oder dein Text Kanal).")
                    .addChannelOption(option => {
                        return option
                        .setName("channel")
                        .setDescription("Welcher Kanal ?")
                        .setRequired(true)
                    })
                    .addUserOption(option => {
                        return option
                        .setName("user")
                        .setDescription("Wen möchtest du Einladen.")
                        .setRequired(true)
                    })
                    .addBooleanOption(option => {
                        return option
                        .setName("spoiler")
                        .setDescription("Möchtest du die bitte clicken zum joinen Nachricht spoilern")
                    })
                    .addBooleanOption(option => {
                        return option
                        .setName("ephemeral")
                        .setDescription("Möchtest du das die Nachricht nur für dich sichtbar ist ?")
                    }),
            ]
        })
    } catch (error) {
        console.error(error)
    }

}
slashRegister();

//Da oben wenn auf allen server mach serverid und Guild bei aplication---GUILD---commands weg
