const { Telegraf } = require('telegraf');

// SUSTITUYE TU TOKEN AQUÍ
const bot = new Telegraf('8520167343:AAEFrsWdXOZfxRhwkqsQ7Cp7V_K-D7y8Q7U');

bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query;
    if (query.startsWith('LKeyboard q ')) {
        const textToQuote = query.replace('LKeyboard q ', '').trim();
        if (textToQuote.length === 0) return ctx.answerInlineQuery([]);

        return ctx.answerInlineQuery([{
            type: 'article',
            id: 'quote_' + Date.now(),
            title: 'Enviar como Cita',
            description: textToQuote,
            input_message_content: {
                message_text: `<blockquote>${textToQuote}</blockquote>`,
                parse_mode: 'HTML'
            }
        }]);
    }
});

// ESTO ELIMINA EL ERROR 403 EN EL NAVEGADOR
module.exports = async (req, res) => {
    if (req.method === 'GET') {
        return res.status(200).send('🚀 LKeyboard Bot está funcionando!');
    }

    try {
        // Maneja la petición de Telegram
        await bot.handleUpdate(req.body, res);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el bot');
    }
};