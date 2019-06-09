const __Discord__ = require('discord.js');
const __Client__ = new __Discord__.Client();
const safeEval = require('safe-eval');


__Client__.on('ready', () => {
    console.log('ready');
});

__Client__.on('message', __discordMessage__ => {
    if (__discordMessage__.bot) return;

    if (__discordMessage__.content.toLowerCase().startsWith('eval')) {
        code = __discordMessage__.content.slice(4);


        code = replaceThings(code, '```javascript', '');
        code = replaceThings(code, '```', '');

        try {
            __discordMessage__.channel.send('**console:** ' + safeEval(`
                    (function that(process, require){${code}})("¯\\\\_(ツ)\\_/¯",":smirk:");`));
        } catch (err) {
            __discordMessage__.channel.send('**console ERROR:** ' + err.message);
        }
        return;

    }
});

function replaceThings(string, something, forSomething) {
    if (something === forSomething) return string;

    while (string.includes(something)) {
        string = string.replace(something, forSomething);
    }
    return string;
}

function blockCode(discordMessage, reason) {
    discordMessage.channel.send(`**console ERROR:** Your code has been blocked for safety reasons: \`${reason}\` `);
}

__Client__.login(process.env.BOT_TOKEN);


process.on('exit', function (code) {
    __Client__.destroy();
    __Client__.login(process.env.BOT_TOKEN);
});

process.on('unhandledRejection', () => {
    __Client__.destroy();
    __Client__.login(process.env.BOT_TOKEN);
});


function removeSpecialCharacters(msg) {

    const foolDetector = " ¨!\"#$%&/)=?*'+-~ˇ^˘°˛`˙´˝¨¸[]{},.;:";

    for (let i of foolDetector) {
        msg = removeChar(msg, i);
    }
    return msg;
}


//replace charaters
function replaceChar(message, char, toChar) {
    if (char === toChar) return message;
    while (message.includes(char)) {
        message = message.replace(char, toChar);
    }
    return message;
}