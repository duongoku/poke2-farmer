"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var axios_1 = require("axios");
var fs = require("fs");
var pokemons = JSON.parse(fs.readFileSync("./pokemon_names.json", {
    encoding: "utf8",
    flag: "r"
}))["pokemon_names"];
var headers = {
    "User-Agent": "Mozilla/5.0 Gecko/20100101 Firefox/95.0",
    Authorization: process.env.DISCORD_AUTH_1
};
function get_random_sentence(dictionary) {
    var sentence = [];
    var length = Math.floor(Math.random() * 10) + 5;
    for (var i = 0; i <= length; i++) {
        sentence.push(dictionary[Math.floor(Math.random() * dictionary.length)]);
    }
    return sentence.join(" ");
}
function send_random_sentence(channelID, count) {
    return __awaiter(this, void 0, void 0, function () {
        var dictionary, sentence;
        return __generator(this, function (_a) {
            dictionary = pokemons;
            sentence = get_random_sentence(dictionary);
            if (count == 0) {
                count = 1;
                headers["Authorization"] = process.env.DISCORD_AUTH_1;
            }
            else {
                count = 0;
                headers["Authorization"] = process.env.DISCORD_AUTH_2;
            }
            axios_1["default"].post("https://discord.com/api/v9/channels/".concat(channelID, "/messages"), {
                content: sentence,
                tts: false
            }, {
                headers: headers
            });
            setTimeout(function () {
                send_random_sentence(channelID, count);
            }, 3000);
            return [2 /*return*/];
        });
    });
}
function match_name(hint, name) {
    if (name.length != hint.length) {
        return false;
    }
    else {
        name.toLowerCase();
        hint.toLowerCase();
        for (var i = 0; i < name.length; i++) {
            if (hint[i] != "_" && name[i] != hint[i]) {
                return false;
            }
        }
    }
    return true;
}
function get_candidates(hint) {
    var candidates = [];
    for (var _i = 0, pokemons_1 = pokemons; _i < pokemons_1.length; _i++) {
        var pokemon = pokemons_1[_i];
        if (match_name(hint, pokemon)) {
            candidates.push(pokemon);
        }
    }
    return candidates;
}
function get_hint(channelID) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10000); })];
                case 1:
                    _a.sent();
                    axios_1["default"].post("https://discord.com/api/v9/channels/".concat(channelID, "/messages"), {
                        content: "-hint",
                        tts: false
                    }, {
                        headers: headers
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function answer(hint, channelID) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10000); })];
                case 1:
                    _a.sent();
                    hint = hint.slice(0, -1);
                    hint = hint.replace(/\\/g, "");
                    get_candidates(hint).forEach(function (candidate) {
                        headers["Authorization"] = process.env.DISCORD_AUTH_1;
                        axios_1["default"].post("https://discord.com/api/v9/channels/".concat(channelID, "/messages"), {
                            content: "-c ".concat(candidate),
                            tts: false
                        }, {
                            headers: {
                                "User-Agent": "Mozilla/5.0 Gecko/20100101 Firefox/95.0",
                                Authorization: process.env.DISCORD_AUTH_1
                            }
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
var client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES]
});
client.once("ready", function (c) {
    console.log("Logged in as ".concat(c.user.tag));
    send_random_sentence(process.env.SPAM_CHANNEL_ID, 0);
});
client.on("messageCreate", function (message) {
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
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        else {
            if (message.content.includes("The pokémon is")) {
                try {
                    answer(message.content.split(" ")[3], message.channel.id);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else if (message.content.includes("You caught a")) {
                console.log(message.cleanContent);
            }
        }
    }
});
client.login(process.env.DISCORD_TOKEN);
