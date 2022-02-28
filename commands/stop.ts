import { getVoiceConnection } from "@discordjs/voice";
import { Client, Message } from "discord.js";
import servers from "../servers";
import cleanupPlayer from "../utils/clean";

export function run(client: Client, message: Message, args: string[]) {
    let connection = getVoiceConnection(message.guild!.id);
    let server = servers[parseInt(message.guild!.id)];

    if (!server || !connection) {
        message.channel.send("No audio connection.");
        return;
    }

    cleanupPlayer(message);
}

export const name = "stop";