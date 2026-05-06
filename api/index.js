const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Manejador Inline
bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query;
    if (!query) return;

    try {
        await ctx.answerInlineQuery([{
            type: 'article',
            id: String(Math.random()), // ID único siempre
            title: 'ENVIAR COMO CITA REAL',
            description: query,
            input_message_content: {
                message_text: `<blockquote>${query}</blockquote>`,
                parse_mode: 'HTML'
            }
        }], { cache_time: 0 }); // Evitar caché para pruebas
    } catch (e) {
        console.error("Error inline:", e);
    }
});

// Obligatorio para Webhooks en Vercel
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await bot.handleUpdate(req.body);
            res.status(200).json({ ok: true });
        } catch (err) {
            res.status(500).send(err.toString());
        }
    } else {
        res.status(200).send("Servidor Activo 🚀");
    }
};
