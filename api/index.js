const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Lógica para cuando escribes @tu_bot en cualquier chat
bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query;
    if (!query) return;

    const results = [{
        type: 'article',
        id: '1',
        title: 'Clic aquí para enviar Cita Real',
        description: query,
        input_message_content: {
            message_text: `<blockquote>${query}</blockquote>`,
            parse_mode: 'HTML'
        }
    }];

    // Responder a Telegram con el resultado
    return await ctx.answerInlineQuery(results);
});

module.exports = async (req, res) => {
    try {
        if (req.method === 'POST') {
            // Procesar la actualización que envía Telegram
            await bot.handleUpdate(req.body);
            res.status(200).json({ ok: true });
        } else {
            res.status(200).send("Bot Online y listo para Modo Inline 🚀");
        }
    } catch (e) {
        console.error("Error:", e);
        res.status(500).send(e.message);
    }
};
