import { createAudioPlayer, createAudioResource, NoSubscriberBehavior, VoiceConnection } from "@discordjs/voice";
import { Message } from "discord.js";
import ytdl from "ytdl-core";
import servers from "../servers";
import cleanupPlayer from "./clean";

export default async function play(connection: VoiceConnection, message: Message) {
    let server = servers[parseInt(message.guild!.id)];

    if (!server.connection) server.connection = connection;

    if (!server.player) server.player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Stop,
        },
    });

    if (!server.subscription) server.connection.subscribe(server.player);

    let stream = ytdl(server.queue[0], {
        filter: "audioonly",
        highWaterMark: 1 << 25, // fixes abort ytdl error
    });

    server.player.play(createAudioResource(stream));
    server.queue.shift();

    stream.on("end", () => {
        if (server.queue[0]) play(connection, message);
        else cleanupPlayer(message);
    });

    server.stream = stream;
}