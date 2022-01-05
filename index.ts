import { Client, Intents } from "discord.js";
import axios from "axios";
import * as fs from "fs";

require("dotenv").config();

const pokemons = JSON.parse(
    fs.readFileSync("./pokemon_names.json", {
        encoding: "utf8",
        flag: "r",
    })
)["pokemon_names"];

const headers = {
    "User-Agent": "Mozilla/5.0 Gecko/20100101 Firefox/95.0",
    Authorization: process.env.DISCORD_AUTH_1,
};

function get_random_sentence(dictionary: string[]) {
    const sentence = [];
    const length = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i <= length; i++) {
        sentence.push(
            dictionary[Math.floor(Math.random() * dictionary.length)]
        );
    }
    return sentence.join(" ");
}

async function send_random_sentence(channelID: string, count: number) {
    const dictionary = pokemons;
    const sentence = get_random_sentence(dictionary);
    if (count == 0) {
        count = 1;
        headers["Authorization"] = process.env.DISCORD_AUTH_1;
    } else {
        count = 0;
        headers["Authorization"] = process.env.DISCORD_AUTH_2;
    }
    axios.post(
        `https://discord.com/api/v9/channels/${channelID}/messages`,
        {
            content: sentence,
            tts: false,
        },
        {
            headers: headers,
        }
    );
    setTimeout(() => {
        send_random_sentence(channelID, count);
    }, 2000);
}

function match_name(hint: string, name: string) {
    if (name.length != hint.length) {
        return false;
    } else {
        name.toLowerCase();
        hint.toLowerCase();
        for (let i = 0; i < name.length; i++) {
            if (hint[i] != "_" && name[i] != hint[i]) {
                return false;
            }
        }
    }
    return true;
}

function get_candidates(hint: string) {
    const candidates = [];
    for (const pokemon of pokemons) {
        if (match_name(hint, pokemon)) {
            candidates.push(pokemon);
        }
    }
    return candidates;
}

async function get_hint(channelID: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    axios.post(
        `https://discord.com/api/v9/channels/${channelID}/messages`,
        {
            content: "-hint",
            tts: false,
        },
        {
            headers: headers,
        }
    );
}

async function answer(hint: string, channelID: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    hint = hint.slice(0, -1);
    hint = hint.replace(/\\/g, "");
    get_candidates(hint).forEach((candidate) => {
        headers["Authorization"] = process.env.DISCORD_AUTH_1;
        axios.post(
            `https://discord.com/api/v9/channels/${channelID}/messages`,
            {
                content: `-c ${candidate}`,
                tts: false,
            },
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 Gecko/20100101 Firefox/95.0",
                    Authorization: process.env.DISCORD_AUTH_1,
                },
            }
        );
    });
}

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", (c) => {
    console.log(`Logged in as ${c.user.tag}`);
    send_random_sentence(process.env.SPAM_CHANNEL_ID, 0);
});

client.on("messageCreate", (message) => {
    // Poke2 id is 716390085896962058
    if (message.author.id === "716390085896962058") {
        // message.reply("Received your message!");
        if (message.content === "") {
            if (message.embeds.length == 0) {
                return;
            }
            if (message.embeds[0].title.includes("appeared")) {
                console.log(message.embeds[0].title);
                console.log("Catching . . .");
                try {
                    get_hint(message.channel.id);
                } catch (e) {
                    console.log(e);
                }
            }
        } else {
            if (message.content.includes("The pokémon is")) {
                try {
                    answer(message.content.split(" ")[3], message.channel.id);
                } catch (e) {
                    console.log(e);
                }
            } else if (message.content.includes("You caught a")) {
                console.log(message.cleanContent);
            }
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
