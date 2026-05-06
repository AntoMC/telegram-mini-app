const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// --- NUEVA LÓGICA INLINE (Para cualquier chat) ---
bot.on('inline_query', async (ctx) => {
    const text = ctx.inlineQuery.query;
    if (!text) return;

    const results = [{
        type: 'article',
        id: '1',
        title: 'Convertir a Cita Real',
        description: text,
        input_message_content: {
            message_text: `<blockquote>${text}</blockquote>`,
            parse_mode: 'HTML'
        }
    }];

    return await ctx.answerInlineQuery(results);
});

// Esto es necesario para que Vercel procese los eventos del bot
module.exports = async (req, res) => {
    if (req.method === 'POST' && req.body.inline_query) {
        // Telegram envía las consultas inline aquí
        await bot.handleUpdate(req.body, res);
    } else {
        // ... (aquí iría tu código anterior de la Mini App si quieres conservarla)
        res.status(200).send("Bot funcionando con Modo Inline");
    }
};