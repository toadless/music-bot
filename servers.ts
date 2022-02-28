import { AudioPlayer, PlayerSubscription, VoiceConnection } from "@discordjs/voice";
import { Readable } from "stream";

export type Server = {
    queue: string[],

    player?: AudioPlayer,
    subscription?: PlayerSubscription,
    connection?: VoiceConnection,

    stream?: Readable,
}

let servers = {} as [string: Server]

export default servers;