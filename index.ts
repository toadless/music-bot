global.AbortController = require("node-abort-controller").AbortController

import "dotenv/config";
import { Client, Collection } from "discord.js";
import fs from "node:fs";

const client = new Client({
    intents: [
        "GUILD_MEMBERS",
        "GUILDS",
        "GUILD_VOICE_STATES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES"
    ],
});

(client as any).commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log("loading " + command.name);
    (client as any).commands.set(command.name, command);
}

client.on("ready", () => {
    console.log("Ready!!!");
})

client.on("message", message => {
    if (!message.guild) return;
    if (!message.content.startsWith(process.env.PREFIX!)) return;

    let args = message.content.substring(process.env.PREFIX!.length).split(" ");
    const command = (client as any).commands.get(args[0]);

    if (!command) return;
    command.run(client, message, args);
});

client.login(process.env.TOKEN);