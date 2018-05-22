// const express = require('express');
// const path = require('path');
// const PORT = process.env.PORT || 5000;
// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const Bot = require('node-telegram-bot-api');
const request = require('request');

const token = "token";
const trigger = 'Burger';
const bot = new Bot(token, {polling: true});
const adminId = 0;


bot.on('message', (msg) => {
    if (msg.text.toString() === trigger) {
    bot.sendMessage(msg.chat.id, "It will cost 37grn be ready in 5 min");
    bot.sendPhoto(msg.chat.id, "https://img.tutpad.com/tut/0/43/19-burger-flat-icon700.jpg?size=%3C700x&dpr=2",{caption : "Tasty Burger"} );
} else if (msg.text.toString() === "Hot Dog") {
    bot.sendMessage(msg.chat.id, 'It will cost 25grn be ready in 5 min');
} else if (msg.text.toString() === "user") {
    bot.sendMessage(msg.chat.id, JSON.stringify(msg));
}
else if (msg.text.toString() === "forward") {
    bot.forwardMessage(adminId, msg.chat.id, msg.message_id);
    bot.sendMessage(msg.chat.id, "Відправлено");
}
else {
    const message = "Привіт " + msg.from.first_name + ", що бажаєте замовити?";
    bot.sendMessage(msg.chat.id, message, {
        reply_markup: {
            keyboard: [[trigger], ['Hot Dog']]
        }
    });
}
});
