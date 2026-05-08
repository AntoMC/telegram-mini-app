const { Telegraf } = require('telegraf');

// Sustituye con el Token que te dio el BotFather
const bot = new Telegraf('TU_TOKEN_DE_TELEGRAM');

bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query;

    // Buscamos el patrón que envía el teclado: "LKeyboard q <texto>"
    if (query.startsWith('LKeyboard q ')) {
        const textToQuote = query.replace('LKeyboard q ', '').trim();

        if (textToQuote.length === 0) return ctx.answerInlineQuery([]);

        const results = [
            {
                type: 'article',
                id: 'quote_' + Date.now(),
                title: 'Enviar como Cita',
                description: textToQuote,
                thumb_url: 'https://img.icons8.com/color/96/quote-left.png', // Icono visual
                input_message_content: {
                    // Usamos HTML para aplicar el formato de bloque de cita (blockquote)
                    message_text: `<blockquote>${escapeHtml(textToQuote)}</blockquote>`,
                    parse_mode: 'HTML'
                },
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "✍️ Escrito con LKeyboard", url: "https://t.me/LKeyboard_bot" }
                        ]
                    ]
                }
            }
        ];

        return ctx.answerInlineQuery(results, { cache_time: 1 });
    }

    // Respuesta por defecto si no hay match
    return ctx.answerInlineQuery([]);
});

// Función auxiliar para evitar errores con caracteres especiales de HTML
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

bot.launch().then(() => {
    console.log('🚀 LKeyboard Bot en marcha...');
});

// Manejo de errores básico
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));