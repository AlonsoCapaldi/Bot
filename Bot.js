const   Discord = require('discord.js'),
        client = new Discord.Client();

client.db = require("quick.db");

const config = {
    token: "291ccb7dc9b31de57fe4b530640c605e3f2856052d2dfde84dd14aeb37891e7c",
    prefix: "v."
};

const channel_afk = "",
    channel_input = "",
    channel_voice = "",
    folder = "",
    guild_id = "";

client.login(config.token);

client.on('ready', () => {
	// do nothing
});

client.on('message', (message) => {

    if (message.author.bot || message.channel.type != "text") return;
    if (!message.content.startsWith(config.prefix)) return;
	
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();
	
    if (message.channel.id == channel_input) {
        if (command == "kick" && args.length > 0) {
            let mention = message.mentions.users.first();
            if (mention) {
                var mChannels = client.db.get(`channels_${guild_id}`);
                mChannels.forEach(function (element) {
                    if (client.channels.cache.get(element.id) != undefined && element.authorId == message.author.id 
                    && client.channels.cache.get(element.id).members.get(mention.id) != undefined 
                    && client.channels.cache.get(element.id).members.get(mention.id).voice.channel 
                    && client.channels.cache.get(element.id).members.get(mention.id).voice.channel.id == element.id 
                    && client.channels.cache.get(element.id).members.get(message.author.id).voice.channel 
                    && client.channels.cache.get(element.id).members.get(message.author.id).voice.channel.id == element.id) {
                        client.channels.cache.get(element.id).members.get(mention.id).voice
                        .setChannel(client.channels.cache.get(channel_afk));
                        message.delete({ timeout: 30000, reason: 'Reason' });
                    } else {
                        message.delete({ timeout: 1, reason: 'Reason' });
                    }
                });
                if (mChannels.length == 0) {
                    message.delete({ timeout: 1, reason: 'Reason' });
                }
            } else {
                message.delete({ timeout: 1, reason: 'Reason' });
            }
        }
        if (command == "lock") {
            var mChannels = client.db.get(`channels_${guild_id}`);
            mChannels.forEach(function (element) {
                if (client.channels.cache.get(element.id) != undefined && element.authorId == message.author.id) {
                    client.channels.cache.get(element.id).createOverwrite(guild_id, { 
                        'CREATE_INSTANT_INVITE' : false,        'VIEW_CHANNEL': true,
                        'CONNECT': false,
                        'SPEAK': true
                    });
                    message.delete({ timeout: 30000, reason: 'Reason' });
                } else {
                    message.delete({ timeout: 1, reason: 'Reason' });
                }
            });
            if (mChannels.length == 0) {
                message.delete({ timeout: 1, reason: 'Reason' });
            }
        }
        if (command == "unlock") {
            var mChannels = client.db.get(`channels_${guild_id}`);
            mChannels.forEach(function (element) {
                if (client.channels.cache.get(element.id) != undefined && element.authorId == message.author.id) {
                    client.channels.cache.get(element.id).createOverwrite(guild_id, { 
                        'CREATE_INSTANT_INVITE' : true,        'VIEW_CHANNEL': true,
                        'CONNECT': true,
                        'SPEAK': true
                    });
                    message.delete({ timeout: 30000, reason: 'Reason' });
                } else {
                    message.delete({ timeout: 1, reason: 'Reason' });
                }
            });
            if (mChannels.length == 0) {
                message.delete({ timeout: 1, reason: 'Reason' });
            }
        }
        if (command == "name" && args.length > 0) {
            var mChannels = client.db.get(`channels_${guild_id}`);
            mChannels.forEach(function (element) {
                if (client.channels.cache.get(element.id) != undefined && element.authorId == message.author.id) {
                    client.channels.cache.get(element.id).setName(args.join(" "));
                    message.delete({ timeout: 30000, reason: 'Reason' });
                } else {
                    message.delete({ timeout: 1, reason: 'Reason' });
                }
            });
            if (mChannels.length == 0) {
                message.delete({ timeout: 1, reason: 'Reason' });
            }
        }
        if (command == "limit" && args.length > 0) {
            var mChannels = client.db.get(`channels_${guild_id}`);
            mChannels.forEach(function (element) {
                if (client.channels.cache.get(element.id) != undefined && element.authorId == message.author.id) {
                    client.channels.cache.get(element.id).setUserLimit(args[0]);
                    message.delete({ timeout: 30000, reason: 'Reason' });
                } else {
                    message.delete({ timeout: 1, reason: 'Reason' });
                }
            });
            if (mChannels.length == 0) {
                message.delete({ timeout: 1, reason: 'Reason' });
            }
        }
        if (command == "allow" && args.length > 0) {
            let mention = message.mentions.users.first();
            if (mention) {
                var mChannels = client.db.get(`channels_${guild_id}`);
                mChannels.forEach(function (element) {
                    if (client.channels.cache.get(element.id) != undefined && element.authorId == message.author.id) {
                        client.channels.cache.get(element.id).createOverwrite(client.guilds.cache.get(guild_id)
                        .members.cache.get(mention.id), { 
                            'CREATE_INSTANT_INVITE' : true,        'VIEW_CHANNEL': true,
                            'CONNECT': true,
                            'SPEAK': true
                        });
                        message.delete({ timeout: 30000, reason: 'Reason' });
                    } else {
                        message.delete({ timeout: 1, reason: 'Reason' });
                    }
                });
                if (mChannels.length == 0) {
                    message.delete({ timeout: 1, reason: 'Reason' });
                }
            } else {
                message.delete({ timeout: 1, reason: 'Reason' });
            }
        }
        if (command == "deny" && args.length > 0) {
            let mention = message.mentions.users.first();
            if (mention) {
                var mChannels = client.db.get(`channels_${guild_id}`);
                mChannels.forEach(function (element) {
                    if (client.channels.cache.get(element.id) != undefined && element.authorId == message.author.id) {
                        client.channels.cache.get(element.id).createOverwrite(client.guilds.cache.get(guild_id)
                        .members.cache.get(mention.id), { 
                            'CREATE_INSTANT_INVITE' : false,        'VIEW_CHANNEL': true,
                            'CONNECT': false,
                            'SPEAK': false
                        });
                        message.delete({ timeout: 30000, reason: 'Reason' });
                    } else {
                        message.delete({ timeout: 1, reason: 'Reason' });
                    }
                });
                if (mChannels.length == 0) {
                    message.delete({ timeout: 1, reason: 'Reason' });
                }
            } else {
                message.delete({ timeout: 1, reason: 'Reason' });
            }
        }
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
	
    let newMember = newState.member;
    let oldMember = oldState.member;

    if (newMember.guild.id != guild_id || oldMember.guild.id != guild_id) return;
    if (client.db.fetch(`channels_${member.guild.id}`) === null) client.db.set(`channels_${member.guild.id}`, []);
	
	
    if (newMember.id != client.user.id && newMember.voice.channel != undefined && !newMember.user.bot) {
        if (newMember.voice.channelID == channel_voice) {
            createVoiceChannel(newMember);
        } else {
            return;
        }
    } else if (oldMember.id != client.user.id && oldMember.voice.channel == null) {
        // Проверяем общие голосовые каналы записанные на сервере
        var channels = [];
        var mChannels = client.db.get(`channels_${guild_id}`);

        mChannels.forEach(function (element) {

            var channel = client.channels.cache.get(element.id);
            if (channel != undefined) {
                if (channel.type === "voice") {
                    if (channel.members.array().length == 0) {
                        channel.delete({ timeout: 1, reason: 'Reason' });
                    
                        const mChannel = client.channels.cache.get(channel_input);
                        if (mChannel != undefined && element.messageId != undefined) {
                            mChannel.messages.fetch()
                                .then(messages => {
                                    messages.forEach((m) => {
                                        if (m.id == element.messageId) {
                                            m.delete({ timeout: 1, reason: 'Reason' });
                                        }
                                    });
                                });
                        }
                    } else {
                        channels.push(element);
                    }
                } 
            }

        });
        client.db.set(`channels_${guild_id}`, channels);
    }

});

function createVoiceChannel(newMember) {
	
    client.guilds.cache.get(newMember.guild.id).channels.create(`Чат - ${newMember.displayName}`, {
        type: 'voice',
        permissionsOverwrites: [
            {	
                type: "member",
                id: newMember.id,
                allow: 17825808
            }
        ], reason: 'Reason'
    })
    .then((channel) => {
        channel.setParent(folder);
        newMember.voice.setChannel(channel);
        const vc_channel = channel.id;
        const vc_user = newMember.user.id;
        channel.createInvite({ temporary: true, reason: 'Reason' })
            .then((invite) => {
                var text = `Голосовой чат создан. Чтобы пригласить в него используй ссылку:\r\n${invite.url}`;

                const embed = new Discord.MessageEmbed()
                    .setDescription(text);

                client.channels.cache.get(channel_input).send(newMember.user, embed)
                    .then((meg) => {
                        const vc_msg = meg.id;
                        var channel = {};
                        channel.id = vc_channel;
                        channel.messageId = vc_msg;
                        channel.authorId = vc_user; 
                        
                        client.db.push(`channels_${guild_id}`, channel);
                    });
        });
    });
}