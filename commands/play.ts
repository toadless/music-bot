import { getVoiceConnection, joinVoiceChannel } from "@discordjs/voice";
import { voiceChannelCheck } from "../utils/checks";
import { Client, Message } from "discord.js";
import servers from "../servers";
import play from "../utils/play";

export function run(client: Client, message: Message, args: string[]) {
    if (voiceChannelCheck(message)) return;

    if (!args[1]) {
        message.channel.send("Please provide a link");
        return;
    }

    if (!servers[parseInt(message.guild!.id)]) servers[parseInt(message.guild!.id)] = {
        queue: [],
    };

    servers[parseInt(message.guild!.id)].queue.push(args[1]);

    if (!getVoiceConnection(message.guild!.id)) {
        joinVoiceChannel({
            channelId: message.member!.voice.channel!.id,
            guildId: message.guild!.id,
            adapterCreator: message.member!.voice.guild.voiceAdapterCreator,

            selfDeaf: false,
            selfMute: false,
        });

        let connection = getVoiceConnection(message.guild!.id);
        play(connection!, message);
    }
}

export const name = "play";