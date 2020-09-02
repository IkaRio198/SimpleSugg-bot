const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const bdd_suggchannel = require('./channel.json')

client.login("") // PLACE YOUR TOKEN HERE → "<BOT TOKEN>"

client.on('ready', () => {
    client.user.setActivity(`des serveurs | ;help | Développé par IkaRio`, { type: 'WATCHING' });
        ;}
    );

    client.on("message", message => {
        if(message.content.startsWith(";help")) {
    if(message.member.hasPermission("ADMINISTRATOR")){
            message.author.send("Bienvenue sur la section help du bot SimpleSugg'bot :\n\n;channel <channel id> → Définit le salon où les suggestions apparaitront\n\n;sugg <suggestion> → Proposer une idée\n\n;confirm <suggestion> → Confirme une suggestion (:warning: Vous devez supprimer automatiquement le message des votes !)\n\n;refuse <suggestion> → Refuse une suggestion (:warning: Vous devez supprimer automatiquement le message des votes !)")
        }
	}
    })

client.on("message", message => {
    if(message.content.startsWith(";channel")) {
    message.delete()
    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.length > 10){
            sugg_channel_id = message.content.slice(9)
            bdd_suggchannel["channel_sugg"] = sugg_channel_id
            Savebdd_suggchannel_id()
            message.channel.send("Le salon <#" + sugg_channel_id + "> a été défini comme salon où les suggestions apparaitront")
        }
    }

    }
    if(message.content.startsWith(";sugg")) {
        if(bdd_suggchannel["channel_sugg"]) {
        message.delete()
        if(message.content.length > 7){
            sugg = message.content.slice(6)
            let suggEmbed = new Discord.MessageEmbed()
	.setColor('#F0EA24')
	.setTitle(`💡 NOUVELLE SUGGESTION 💡`)
    .setDescription(`Suggestion : ***${sugg}***\n\nProposée par ${message.author}`)
	.setFooter('SimpleSugg\'b\ot | Développé par IkaRio');
client.channels.cache.get(bdd_suggchannel["channel_sugg"]).send(suggEmbed)
        .then(function (message) {
            message.react('👍');
            message.react('👎')
        
    
        })

        }

    }
    }
    if(message.content.startsWith(";confirm")) {
        if(message.member.hasPermission("ADMINISTRATOR")){
        message.delete()
        if(message.content.length > 10){
            sugg_confirm = message.content.slice(9)
        client.channels.cache.get(bdd_suggchannel["channel_sugg"]).send(`La suggestion \`${sugg_confirm}\` a été retenue.`)
        }
    }
}
    if(message.content.startsWith(";refuse")) {
        if(message.member.hasPermission("ADMINISTRATOR")){
        message.delete()
        if(message.content.length > 9){
            sugg_refuse = message.content.slice(8)
        client.channels.cache.get(bdd_suggchannel["channel_sugg"]).send(`La suggestion \`${sugg_refuse}\` a été refusée.`)
        }
    }
}


})

function Savebdd_suggchannel_id() {
    fs.writeFile("./channel.json", JSON.stringify(bdd_suggchannel, null, 4), (err) => {
        if (err) message.channel.send(`Une erreur et survenue.\n${err}`)
    })
}
