import { Message } from "discord.js";
import servers from "../servers";

export default function cleanupPlayer(message: Message) {
    let server = servers[parseInt(message.guild!.id)];

    server.connection?.disconnect();
    server.subscription?.unsubscribe();
    server.connection?.destroy();

    delete servers[parseInt(message.guild!.id)];
}