const execFile = require('child_process').execFile;
var Botkit = require('botkit');
var LB = require('./loadBalancer.js');

var controller = Botkit.slackbot({

    debug: false
    //include "log: false" to disable logging
    //or a "logLevel" integer from 0 to 7 to adjust logging verbosity

});

controller.spawn({

    token: process.env.ALTCODETOKEN,

}).startRTM()


controller.hears(['hi', 'hello'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {

    bot.api.users.info({
        user: message.user
    }, (error, response) => {
        username = response.user.name;
        bot.reply(message, 'Hi @' + username + '\n I am Ultra Monkey, in charge of all your Monkey Business.' +
            'Please let me know what you would like to start off with.\n' +
            'If you would like to spin up a new AWS Production Instance say "Spin"');
    });

});


controller.hears(['Spin', 'spin'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {

    bot.api.users.info({
        user: message.user
    }, (error, response) => {
        username = response.user.name;
        
    bot.reply(message, 'Spinning new production server.....');
    const deploySh = execFile('sh', ['spin.sh'], (error, stdout, stderr) => {
        if (error) {
          throw error;
        }

        var lines = stdout.toString().split("\n");
        var finaloutput = "";

        for (i = 1; i<5; i++)
        {
            finaloutput = finaloutput + lines[i] + "\n"
        }

        bot.reply(message, finaloutput);
    });
        
    });
});