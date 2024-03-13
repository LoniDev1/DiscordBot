// Require the necessary discord.js classes
const { Schema , model , Client, Events, GatewayIntentBits, Embed, EmbedBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ActionRowBuilder, SlashCommandBuilder, ActivityType, DMChannel, ReactionEmoji, Message, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

var err1 = 0



// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
    client.user.setActivity('LoniDev', { type: ActivityType.Listening });
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

});






//neuer Code (Slash Command)

//alter code
client.on("interactionCreate", async (interaction) => {
    //Error Row:

    const first = new ButtonBuilder()
    .setCustomId('report')
    .setStyle(ButtonStyle.Primary)
    .setLabel('Report Error')
    .setEmoji('📝');
    const last = new ButtonBuilder()
    .setCustomId('view')
    .setStyle(ButtonStyle.Secondary)
    .setLabel('View more')
    .setDisabled()
    .setEmoji('📃');
    
    const errorrow = new ActionRowBuilder().addComponents([first, last]);


    if(interaction.isCommand()) {
        if(interaction.commandName === 'ping') {
            const textr = interaction.options.getString("text")
            interaction.reply({content: `Du hast ${textr} gesagt. Sehr einfallsreich`, ephemeral: true})
        }else if(interaction.commandName === 'ban') {
            const textr = interaction.options.getUser("target")
            const reason = interaction.options.getString("reason")

            const firstButton = new ButtonBuilder()
                .setLabel('First Button')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('first-button')
            const secondButton = new ButtonBuilder()
                .setLabel('First Button')
                .setStyle(ButtonStyle.Primary)
                .setCustomId('first-button')

            const buttonRow = new ActionRowBuilder().addComponents(firstButton, secondButton)
            if(reason == null){
                interaction.reply({content: `Möchtest du wirklich ${textr} bannen für: kein grund ?`,})
            }else {
                interaction.reply({content: `Möchtest du wirklich ${textr} bannen für: ${reason} ?`})
            }
            
        }else if(interaction.commandName === 'dm'){
            

            const userID = interaction.options.getUser("user")
            const nachricht = interaction.options.getString("nachricht")
            const username = interaction.user.globalName
            const senderid = interaction.user.id
            const sender = interaction.user
            const wie = interaction.options.getNumber("loop")
            const guild = client.guilds.cache.get('DEINE_GUILD_ID');
            if (senderid === '756581554074943649' || senderid === '925719317201444874' || senderid === '1088614416834113586'){

                const buttonRow = new ActionRowBuilder()
                .addComponents(
                 new ButtonBuilder()
                 .setCustomId('yup')
                 .setLabel('Bestätigen')
                 .setStyle(ButtonStyle.Success)
                 .setEmoji('✅'),
                 );

                const buttonRow2 = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                .setCustomId('random-button')
                .setStyle(ButtonStyle.Success)
                .setEmoji('✅')
                .setDisabled(true),
                new ButtonBuilder()
                .setCustomId('delete-button')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('🗑'),
                new ButtonBuilder()
                .setLabel('Add Bot to Server.')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.com/api/oauth2/authorize?client_id=1193534903132897362&permissions=8&scope=applications.commands%20bot'),
                )




                if(userID.id === '756581554074943649'){
                    interaction.reply({content: `Hey! du kannst dieser Person keine Nachrichten senden !!!`, ephemeral: true})

                    console.log(`${sender.globalName} wollte dich zu spammen`)
                    client.users.send('756581554074943649' ,`${sender.globalName} wollte dich zu spammen`)
                }else {
                    interaction.reply({content: `Möchtest du wirklich die Person **${userID}** zuspammen ?`, ephemeral: true, components: [buttonRow]})
                    const collector = interaction.channel.createMessageComponentCollector();

                    collector.on('collect', async i => {
                        if(i.customId == 'delete-button'){
                            interaction.deleteReply().catch(err => {
                                interaction.editReply({content: '**ERROR CODE:** 001', components: [errorrow]})
                                return err1 = err
                              });
                        }else if(i.customId == 'yup'){
                            if(wie === null){
                                client.users.send(userID, nachricht).catch(err => {
                                    interaction.editReply({content: '**ERROR CODE:** 001', components: [errorrow]})
                                        return err1 = err
                                });
                                }else if(wie > 0) {
                                   for (let i = 0; i < wie; i++) {
                                      client.users.send(userID, nachricht).catch(err => {
                                        interaction.editReply({content: '**ERROR CODE:** 001', components: [errorrow]})
                                        return err1 = err
                                      });
                                    }
                                }
        
                                interaction.editReply({content: `Die Nachricht **${nachricht}** wurde an ${userID} gesendet!`, ephemeral: true, components: [buttonRow2] }).catch(err => {
                                    interaction.editReply({content: '**ERROR CODE:** 002', components: [errorrow]})
                                    return err1 = err
                                    
                                })

                                client.users.send('756581554074943649' , `**${username}** (**ID**:** ${senderid}**, **Sender Displayname**: **${sender.displayName}**) hat die Nachricht: **${nachricht}** an **${userID.globalName}** (**ID**: **${userID.id}**, **DisplayName**: **${userID.displayName}**) gesendet! *(**${wie}** mal geschickt)*`);
                            console.log(`**${username}** (**ID**:** ${senderid}**, **Sender Displayname**: **${sender.displayName}**) hat die Nachricht: **${nachricht}** an **${userID.globalName}** (**ID**: **${userID.id}**, **DisplayName**: **${userID.displayName}**) gesendet! *(**${wie}** mal geschickt)*`);
                        }else if(i.customId == 'report'){
                            console.log(err1)
                            client.users.send('756581554074943649', `${err1}`)
                            
                        
                        }else if(i.customId == 'view'){
                            interaction.editReply({content: err1, components: [errorrow]}).catch(err => {
                                return interaction.editReply({content: `**ERROR CODE:** 003-A \n *cannot load error row*`})
                            });
                            
                        }
                        
                    })
                    
                    
                }
                
            }else {
                interaction.reply({content: `Du kannst den Befehl nicht benutzen !`})
                console.log(`${sender.globalName} (ID: ${senderid}, DisplayName: ${sender.DisplayName})hat versucht den Command /dm zu benutzen`)
                client.users.send('756581554074943649' ,`**${sender.globalName}** (**ID**: **${senderid}**, **DisplayName**: **${sender.DisplayName}**)hat versucht den Command **/dm** zu benutzen`)
            }
        
        }else if(interaction.commandName === 'report') {
            const message = interaction.options.getString("message")
            console.log(message)
            interaction.reply({content: 'Dein report wurde gesendet!', ephemeral: true})
        }else if(interaction.commandName === 'beta'){
            interaction.reply('`Comming Soon...`')
        }else if(interaction.commandName === 'dm-modal'){

            const modal = new ModalBuilder()
            .setTitle("DM Modal")
            .setCustomId('firstmodal')

            const id = new TextInputBuilder()
            .setCustomId('userid')
            .setRequired(true)
            .setLabel('Nutzer Id')
            .setStyle(TextInputStyle.Short);

            const message = new TextInputBuilder()
            .setCustomId('messageinput')
            .setRequired(true)
            .setLabel('Nachricht')
            .setStyle(TextInputStyle.Paragraph);

            const row = new ActionRowBuilder().addComponents(id)
            const row2 = new ActionRowBuilder().addComponents(message)

            modal.addComponents(row, row2)
            interaction.showModal(modal)
            
            
            
        }else if(interaction.commandName === 'invite'){
            
            const buttonRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('delete-button')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🗑'),
                new ButtonBuilder()
                    .setLabel('Add Bot to Server.')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=1193534903132897362&permissions=8&scope=applications.commands%20bot'),
            )

            const userID = interaction.options.getUser("user")
            const channel = interaction.options.getChannel("channel")
            const booleanoption = interaction.options.getBoolean("spoiler")
            const booleanoption2 = interaction.options.getBoolean("ephemeral")
            

            if (booleanoption == null){
                client.users.send(userID, `**Hallo ${userID}**. Du wurdest **von ${interaction.user}** in den **Channel** ${channel} **eingeladen**. \n\n **Clicke Hier um zu Joinen:** ${channel}`).catch(err => {
                    interaction.editReply({content: '**ERROR CODE:** 001', components: [errorrow]})
                    client.users.send(interaction.user, ({content: '**ERROR CODE:** 001', components: [errorrow]})).catch(err => {
                        interaction.editReply({content: '**ERROR CODE:** 001', components: [errorrow]})
                        return err1 = err
                      });
                    return err1 = err
                  });
            }else if(booleanoption == true){
                client.users.send(userID, `**Hallo ${userID}**. Du wurdest **von ${interaction.user}** in den **Channel** ${channel} **eingeladen**. \n\n ||**Clicke Hier um zu Joinen:** ${channel}||`).catch(err => {
                    interaction.editReply({content: '**ERROR CODE:** 001', components: [errorrow]})
                    client.users.send(interaction.user, ({content: '**ERROR CODE:** 001', components: [errorrow]})).catch(err => {
                        interaction.editReply({content: '**ERROR CODE:** 001', components: [errorrow]})
                        return err1 = err
                      });
                    return err1 = err
                  });
            }else if(booleanoption == false){
                client.users.send(userID, `**Hallo ${userID}**. Du wurdest **von ${interaction.user}** in den **Channel** ${channel} **eingeladen**. \n\n **Clicke Hier um zu Joinen:** ${channel}`).catch(err => {
                    interaction.editReply({content: '**ERROR CODE:** 001', components: [errorrow]})
                    client.users.send(interaction.user, ({content: '**ERROR CODE:** 001', components: [errorrow]})).catch(err => {
                        interaction.editReply({content: '**ERROR CODE:** 001', components: [errorrow]})
                        return err1 = err
                      });
                    return err1 = err
                  });
            }

            
            client.users.send(interaction.user, `**Du hast ${userID} ind den Channel ${channel} eingeladen.**`).catch(err => {
                interaction.editReply({content: '**ERROR CODE:** 001', components: [errorrow]})
                return err1 = err
              });

              const exampleembed = new EmbedBuilder()
              .setColor('Green')
              .setTitle(`Succesful`)
              .setDescription(`**You Succesfuly invited ${userID} **`);

            if (booleanoption2 == null){
                interaction.reply({embeds: [exampleembed], components: [buttonRow]})
            }else if(booleanoption2 == true){
                interaction.reply({embeds: [exampleembed], components: [buttonRow], ephemeral: true})
            }else if(booleanoption2 == false){
                interaction.reply({embeds: [exampleembed], components: [buttonRow]})
            }

            const collector = interaction.channel.createMessageComponentCollector();

            collector.on('collect', async i => {
                if(i.customId == 'delete-button'){
                    interaction.deleteReply().catch(err => {
                        interaction.editReply({content: '**ERROR CODE:** 001', components: [errorrow]})
                        return err1 = err
                      });
                }else if(i.customId == 'report'){
                    console.log(err1)
                    client.users.send('756581554074943649', `${err1}`)
                    
                
                }else if(i.customId == 'view'){
                    interaction.editReply({content: err1, components: [errorrow]}).catch(err => {
                        return interaction.editReply({content: `**ERROR CODE:** 003-A \n *cannot load error row*`})
                    });
                    
                }
        
            })
                    
            

        }
                
    }

})



// Log in to Discord with your client's token
client.login(token);

//Bot Token: 1: MTE5MzUzNDkwMzEzMjg5NzM2Mg.GmSVgu.l6txYGVn8ZD_Kgxfo28FKnHQSK64OB2UQArPp0 2: MTIxNjQ3MDIwMzMwNzY1NTE5OA.GlpBLx.tog0geEm308LlaDYZHPdAYmVyJlJEOo_Zz7Xnk
