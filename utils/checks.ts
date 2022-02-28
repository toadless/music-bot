import { Message } from "discord.js";

export function voiceChannelCheck(message: Message) {
    if (!message.member?.voice.channel) {
        message.channel.send("You must be in a voice channel.");
        return true;
    }

    return false;
}