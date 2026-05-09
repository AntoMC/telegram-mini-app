const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN); // Usa variables de entorno en Vercel

bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query;
    if (query.startsWith('LKeyboard q ')) {
        const textToQuote = query.replace('LKeyboard q ', '').trim();
        if (textToQuote.length === 0) return ctx.answerInlineQuery([]);

        return ctx.answerInlineQuery([{
            type: 'article',
            id: 'quote_' + Date.now(),
            title: 'Enviar como Cita',
            input_message_content: {
                message_text: `<blockquote>${textToQuote}</blockquote>`,
                parse_mode: 'HTML'
            }
        }]);
    }
});

// Esto es lo que Vercel necesita: un export para manejar la petición HTTP
module.exports = async (req, res) => {
    try {
        await bot.handleUpdate(req.body, res);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
};